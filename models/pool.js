"use strict";

const db = require("../db");

exports.newPool = async (user, pool) => {
  try {
    const insertPool = `INSERT INTO "pool"(name, frequency, due_date, created_on) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`;
    const poolValues = [
      `${pool.name}, ${pool.frequency}, ${pool.due_date}, CURRENT_TIMESTAMP`
    ];
    await db.query(insertPool, poolValues);
    console.log("Added pool");
  } catch (e) {
    console.log(e, "Error adding new pool");
  }
};
