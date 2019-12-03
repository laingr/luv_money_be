"use strict";

const { Pool } = require("pg");
const db = new Pool({
  user: "jameslaing",
  host: "localhost",
  database: "luv_money",
  password: "",
  port: 5432
});

module.exports = db;
