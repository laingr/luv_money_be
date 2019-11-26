"use strict";

const db = require("../db");

exports.newPool = async (pool) => {
  try {
    const insertPool = `INSERT INTO "pool"(name, frequency, due_date, created_on) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`;
    const poolValues = [
      pool.name, pool.frequency, pool.due_date
    ];
    await db.query(insertPool, poolValues);
    console.log("Added pool");
  } catch (e) {
    console.log(e, "Error adding new pool");
  }
};

exports.getPools = async (data) => {
  try {
    const getAllPoolsQuery = `SELECT * from "pool" WHERE (SELECT id FROM "user" where id = ) AND pool_id = $2`;
    const getAllPoolsValues = [data.user_id, data.pool_id];
    const pool = await db.query(getAllPools);
    return pool.rows

  } catch (e) {
    console.log(e, "Error getting all pools");
  }
}