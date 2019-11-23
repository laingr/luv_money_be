"use strict";

const dotenv = require("dotenv").config();

const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 3000;

const router = require("./router.js");
const db = require("./models");
const controllers = require("./controllers");

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

(async () => {
  await db.sequelize.sync({ force: true });
  app.listen(port, () => console.log(`🤩 Listening on port ${port}`));
})();
