"use strict";

const db = require("../db");
const build = require("./build");
const user = require("./user");
const pool = require("./pool");
const expense = require("./expense");

// build.drop();
// build.build1();
// build.build2();
// build.build3();
// build.build4();

module.exports = {
  db,
  build,
  user,
  pool,
  expense
};
