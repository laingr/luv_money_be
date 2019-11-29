"use strict";

const db = require("../db");

exports.newRule = async (payload) => {
  try {
    const array = '{' + Object.entries(payload[0].rule).map(arr => `{${arr[0]},${arr[1]}}`).join() + '}'
    const insertRule = `INSERT INTO "pool_expense"(pool_id, name, rule) VALUES ($1, $2, $3)`;
    const ruleValues = [
      payload[0].pool_id, payload[0].name, array
    ];
    console.log(array);
    await db.query(insertRule, ruleValues);
    console.log("Added pool rule");
  } catch (e) {
    console.log(e, "Error adding new pool rule");
  }
};
