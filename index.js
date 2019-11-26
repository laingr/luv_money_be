"use strict";

const dotenv = require("dotenv").config();
const firebase = require("./firebase");

const db = require("./db");
const models = require("./models");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3001;

const router = require("./router.js");
const controllers = require("./controllers");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(router);

(async () => {
  await db.connect();
  app.listen(port, () => console.log(`🤩 Listening on port ${port}`));
})();
