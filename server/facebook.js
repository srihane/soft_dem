require("dotenv").config();
const fs = require("fs");

// Scraping
const puppeteer = require("puppeteer");

const express = require("express");
const app = express();

let http = require("http");
let https = require("https");
/*
Les certificats utilisés sont ceux de CERTBOT
*/

const https_options = {
  key: fs.readFileSync(process.env.PATH_SSL_KEY),
  cert: fs.readFileSync(process.env.PATH_SSL_CERT),
  //requestCert: false,
  rejectUnauthorized: false,
};
const server = https.createServer(https_options, app);

getUserComment("https://fb.watch/fYic-WmIYY/");

app.post("/facebook_comment", (req, res) => {
  //res.send(req.body);
});

// HTTPS
server.listen(process.env.SERVER_PORT_FACEBOOK, () =>
  console.log(`Listening on port ${process.env.SERVER_PORT}!`)
);

// HTTP
/*
app.listen(process.env.SERVER_PORT_FACEBOOK, () =>
  console.log(`Listening on port ${process.env.SERVER_PORT}!`)
);
*/

async function test(link) {
  const response = await fetch(link);
  const body = await response.text();

  console.log(body);
}

async function getUserComment(link) {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // Défini la taille de la page
  await page.setViewport({ width: 1680, height: 920 });

  // Connexion à la page du lien
  await page.goto(link, { waitUntil: "networkidle2" }); // waitUntil = attend le chargement complet de la page

  await page.click(
    '[aria-label="Autoriser les cookies essentiels et optionnels"]'
  );

  const title_h2 = await page.$("h2");
  console.log(title_h2);

  //await page.click('[data-visualcompletion="css-img"]');

  //await page.screenshot({ path: "example.png" });

  //await page.waitForTimeout(10000);
  //await browser.close();
}
