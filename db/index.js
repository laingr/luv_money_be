"use strict";

const { Pool } = require("pg");
const db = new Pool({
  user: "voliverio",
  host: "localhost",
  database: "luv_money",
  password: "password",
  port: 5432
});

module.exports = db;
