"use strict";

const dotenv = require("dotenv").config();
const db = require("./db");
const models = require("./models");

const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;

const router = require("./router.js");
const controllers = require("./controllers");

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

(async () => {
  await db.connect();
  app.listen(port, () => console.log(`🤩 Listening on port ${port}`));
})();
