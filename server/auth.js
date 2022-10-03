require("dotenv").config();
const express = require("express");
const app = express();
//const port = 2001;

/*
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
*/

app.use(express.json());

const cors = require("cors");
app.use(cors());

// // MYSQL
const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

db.connect((err) => {
  if (err) throw err; // If error to connect db

  app.get("/hello", (req, res) => {
    res.send("Hello api");
  });

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

  app.listen(process.env.SERVER_PORT_AUTH, () =>
    console.log(`App on port ${process.env.SERVER_PORT_AUTH}!`)
  );
}); // DB MYSQL CONNECT

/* ----------------------------------------------FUNCTIONS */
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
