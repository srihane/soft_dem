const http = require("http");
const express = require("express");

const app = express();
const port = 3001;

app.get("/", (req, res) => res.send("Hello World!"));

app.post("/upload_file", (req, res) => {
  console.log(req);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
