"use strict";

const db = require("../db");
const build = require("./build");
const pool = require("./pool");
const user = require("./user");

// build.drop();
// build.build1();
// build.build2();
// build.build3();
// build.build4();

exports.getMessage = () => {
  let prom = new Promise((resolve, reject) => {
    db.query("SELECT * FROM messages ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
  return prom;
};

exports.savePost = message => {
  let prom = new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO messages (content, authorid, timestamp) VALUES ($1, $2, current_timestamp)",
      [message.content, message.authorId],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
  return prom;
};
