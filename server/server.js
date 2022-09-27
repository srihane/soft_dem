//Multer : pour gérer les requêtes HTTP avec envoie de fichier
const http = require("http");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const express = require("express");

const app = express();
const port = 3001;

const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

const fileUpload = require("express-fileupload");
/* MIDDLEWARE */
const filesPayloadsExists = require("./middleware/filesPayloadExists");
const fileExtLimiter = require("./middleware/fileExtLimiter");
const fileSizeLimiter = require("./middleware/fileSizeLimiter");

app.get("/", (req, res) => res.send("Hello World!"));

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
