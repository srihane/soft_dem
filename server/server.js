//Multer : pour gérer les requêtes HTTP avec envoie de fichier
const http = require("http");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.SERVER_PORT;

const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

const cors = require("cors");
//app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cors({ credentials: true, origin: "https://demasoft.studyneo.com" }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

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

db.connect((err) => {
  if (err) throw err; // If error to connect db

  app.get("/hello", (req, res) => res.send("Hello World!"));

  // // // ------------------------- SIGNUP ------------------------------- // // //
  app.post("/signup", (req, res) => {
    console.log(req.body);
    const data = req.body;

    // Check if Email already exist
    const SQL_verifyMail = `SELECT user_mail 
    FROM user
    WHERE user_mail="${data.user_mail}"`;

    db_request(SQL_verifyMail).then((db_request_res) => {
      console.log(db_request_res.length);

      if (db_request_res.length == 0) {
        // Email doesn't exist so we create the user on DATABASE
        const SQL = `INSERT INTO user (user_nom, user_prenom, user_mail, user_password)
        VALUES("${data.user_nom}", "${data.user_prenom}", "${data.user_mail}", "${data.user_password}")`;
        db_request(SQL).then((res1) => {
          console.log(res1);
          res.send({ status: 200, msg: "Creation du compte OK" });
        });
      } else {
        // Email lready Exist ERROR message
        res.send({ status: 400, msg: "L'email est déjà utilisé" });
      }
    });

    //res.send("OK");
  });
  // // // ------------------------- SIGNUP ------------------------------- // // //

  // // // ------------------------- SIGNIN ------------------------------- // // //
  app.post("/signin", (req, res) => {
    console.log(req.body);
    const data = req.body;
    // Check if Email already exist
    const SQL = `SELECT * 
    FROM user
    WHERE user_mail="${data.user_mail}"`;

    db_request(SQL).then((db_request_res) => {
      console.log(db_request_res.length);
      if (db_request_res.length === 0) {
        res.send({ status: 400, msg: "L'Email n'existe pas" });
      } else {
        // Test password
        console.log(db_request_res[0].user_password);
        if (data.user_password == db_request_res[0].user_password) {
          res.send({
            status: 200,
            msg: "Connexion réussi",
            user_data: db_request_res[0],
          });
        }
      }
    });
  });

  // // // ------------------------- SIGNIN ------------------------------- // // //

  app.post(
    "/upload_file",
    fileUpload({ createParentPath: true }),
    filesPayloadsExists,
    fileExtLimiter([".png", ".jpg", "jpeg", ".pdf"]),
    fileSizeLimiter,
    (req, res) => {
      const files = req.files;
      console.log(files);
      console.log(files["myfile"].name);
      //console.log(req.body);

      // PATH TO FOLDERS STORAGE
      const nameFolder =
        "/uploads/videos/" +
        Date.now() +
        "_" +
        req.body.dossier_reference +
        "/";

      const uploadFolder =
        __dirname +
        "/uploads/videos/" +
        Date.now() +
        "_" +
        files["myfile"].name +
        "/";

      const isExistFolder = fs.existsSync(uploadFolder);
      //console.log(uploadFolder);
      //console.log(isExistFolder);

      if (isExistFolder == false) {
        fs.mkdir(uploadFolder, { recursive: true }, (err) => {
          if (err) throw err;
        });
      }

      const filepath = path.join(
        uploadFolder,
        Date.now() + "_" + files["myfile"].name
      );

      //console.log(files);
      files["myfile"].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: "error", msg: err });
      });
    }
  );

  app.listen(port, () => console.log(`Server on port ${port}!`));
}); // DB MYSQL CONNECT

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
