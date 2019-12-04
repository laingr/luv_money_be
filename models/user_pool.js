"use strict";

const db = require("../db");

exports.userPool = async (ids) => {
  try {
    const insertUserPool = `INSERT INTO "user_pool"(user_id, pool_id) VALUES ($1, $2)`;
    const userPoolValues = [
      ids.payload.user_id, ids.payload.pool_id
    ];
    await db.query(insertUserPool, userPoolValues);
    console.log("Added user pool");
  } catch (e) {
    console.log(e, "Error adding new user pool");
  }
};