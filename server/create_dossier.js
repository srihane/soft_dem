//Multer : pour gérer les requêtes HTTP avec envoie de fichier
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const express = require("express");
const app = express();

// // MYSQL
const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const fileUpload = require("express-fileupload");

/* MIDDLEWARE */
const filesPayloadsExists = require("./middleware/filesPayloadExists");
const fileExtLimiter = require("./middleware/fileExtLimiter");
const fileSizeLimiter = require("./middleware/fileSizeLimiter");

const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

db.connect((err) => {
  if (err) throw err; // If error to connect db

  app.get("/get_spool_clotures", (req, res) => {
    getData().then((result) => {
      res.json(result);
    });
  });

  /*
INSERT INTO dossiers (dossiers_reference, dossiers_date_dossier, dossiers_description, dossiers_files_path, spool_idspool, clotures_idclotures, company_idcompany)
VALUE ("1234", "2022-09-16 09:53:24", "This a little description", "/upload/124657454_azerty", "1", "1", "1")
*/

  app.post(
    "/create_dossier",
    fileUpload({ createParentPath: true }),
    filesPayloadsExists,
    fileExtLimiter([".png", ".jpg", "jpeg", ".pdf"]),
    fileSizeLimiter,
    (req, res) => {
      const files = req.files;
      console.log(req.body);

      // PATH TO FOLDERS STORAGE
      const nameFolder =
        "/uploads/create_dossier/" +
        Date.now() +
        "_" +
        req.body.dossier_reference +
        "/";

      const uploadFolder =
        __dirname +
        "/uploads/create_dossier/" +
        Date.now() +
        "_" +
        req.body.dossier_reference +
        "/";

      const isExistFolder = fs.existsSync(uploadFolder);
      console.log(uploadFolder);
      console.log(isExistFolder);

      if (isExistFolder == false) {
        fs.mkdir(uploadFolder, { recursive: true }, (err) => {
          if (err) throw err;
        });
      }

      Object.keys(files).forEach((key) => {
        const filepath = path.join(
          uploadFolder,
          Date.now() + "_" + files[key].name
        );

        files[key].mv(filepath, (err) => {
          if (err) return res.status(500).json({ status: "error", msg: err });
        });
      });

      // ADD DATABASE INFORMATION
      /*
      {
        userid: '1',
        idcompany: '1',
        dossier_reference: '123456',
        dossier_date: '2022-09-21T13:13',
        dossier_description: 'Test description',
        dossier_spool: '1',
        dossier_cloture: '2'
      }
      */
      /*
INSERT INTO dossiers (dossiers_reference, dossiers_date_dossier, dossiers_description, dossiers_files_path, spool_idspool, clotures_idclotures, users_iduser, users_profils_idprofils, users_company_idcompany)
      VALUE ("1234", "2022-09-16 09:53:24", "This a little description", "/upload/124657454_azerty", 1, 1, 1, 1, 1)
      */

      const myData = {
        dossier_reference: req.body.dossier_reference,
        dossier_date: req.body.dossier_date,
        dossier_description: req.body.dossier_description,
        dossier_files_path: nameFolder,
        dossier_spool: req.body.dossier_spool,
        dossier_cloture: req.body.dossier_cloture,
        userid: req.body.userid,
        idprofils: req.body.idprofils,
        idcompany: req.body.idcompany,
      };

      let newDate = new Date(req.body.dossier_date);
      console.log(dateFormatDB(newDate));

      let sql_addDossier = `INSERT INTO dossiers (dossiers_reference, dossiers_date_dossier, dossiers_description, dossiers_files_path, spool_idspool, clotures_idclotures, users_iduser, users_profils_idprofils, users_company_idcompany) 
      VALUE ("${myData.dossier_reference}", "${dateFormatDB(newDate)}", "${
        myData.dossier_description
      }", "${myData.dossier_files_path}", ${myData.dossier_spool}, ${
        myData.dossier_cloture
      }, ${myData.userid}, ${myData.idprofils}, ${myData.idcompany})`;

      db_request(sql_addDossier).then((responseSQL) => {
        console.log(responseSQL);
        return res.json({ status: 200, msg: "Files uploaded" });
      });
    }
  );

  app.listen(process.env.SERVER_PORT_UPLOAD_DOSSIERS, () =>
    console.log(
      `App listening on port ${process.env.SERVER_PORT_UPLOAD_DOSSIERS}!`
    )
  );
}); // DB MYSQL CONNECT

async function getData() {
  const response = {
    spool: "",
    clotures: "",
  };

  response.spool = await getSpool();
  response.clotures = await getClotures();

  return response;
}

function getSpool() {
  return new Promise((resolve) => {
    let sql1 = `SELECT * FROM spool WHERE spool_visible = 1`;
    db_request(sql1).then((res1) => {
      //response.spool = res1;
      resolve(res1);
    });
  });
}

function getClotures() {
  return new Promise((resolve) => {
    let sql2 = `SELECT * FROM clotures WHERE cloture_visible = 1`;
    db_request(sql2).then((res2) => {
      //response.spool = res1;
      resolve(res2);
    });
  });
}

// Returns true or false in case it was successful
function checkFileType(file) {
  const type = file.type.split("/").pop();
  const validTypes = ["jpg", "png", "jpeg", "gif", "pdf"];
  if (validTypes.indexOf(type) == -1) {
    console.log("the file type is invalid");
    return false;
  }
  return true;
}

// FUNCTION CHECK IF FOLDERS EXIST OR CREATE IT
async function checkCreateUploadsFolder(uploadsFolder) {
  try {
    await fs.statAsync(uploadsFolder);
  } catch (err) {
    if (err && err.code == "ENOENT") {
      try {
        await fs.mkdirAsync(uploadsFolder);
      } catch (e) {
        console.error("Error creating the uploads folder");
        return false;
      }
    } else {
      console.log("Error reading the uploads folder");
      return false;
    }
  }
  return true;
}

async function add_dossier(data) {
  let get_user_Data = `SELECT *
      FROM users
      `;

  let db_res = await db_request(get_user_Data);
}

// BASIC function of request server
function db_request(sql) {
  return new Promise((res) => {
    // Database connexion
    db.query(sql, function (err, result) {
      if (err) throw err;
      //console.log(result);
      res(result);
    });
  });
}

function dateFormatDB(date) {
  //"2022-09-16 09:53:24"

  let newDate = new Date(date);
  let month = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  function addZero(val) {
    if (val < 10) {
      return `0${val}`;
    } else {
      return val;
    }
  }

  //"2022-09-16 09:53:24"

  return (
    newDate.getFullYear() +
    "-" +
    month[newDate.getMonth()] +
    "-" +
    newDate.getDate() +
    " " +
    addZero(newDate.getHours()) +
    ":" +
    addZero(newDate.getMinutes()) +
    ":" +
    addZero(newDate.getSeconds())
  );
}
