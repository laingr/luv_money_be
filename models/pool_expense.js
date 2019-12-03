"use strict";

const db = require("../db");

exports.newRule = async (payload) => {
  try {
    const array = '{' + Object.entries(payload[0].rule).map(arr => `{${arr[0]},${arr[1]}}`).join() + '}'
    const insertRule = `INSERT INTO "pool_expense"(pool_id, name, rule) VALUES ($1, $2, $3)`;
    const ruleValues = [
      payload[0].pool_id, payload[0].name, array
    ];
    await db.query(insertRule, ruleValues);
    console.log("Added pool rule");
  } catch (e) {
    console.log(e, "Error adding new pool rule");
  }
};

exports.updateRule = async (payload) => {
  try {
    let updateType = '';
    let array = [];
    if (payload[0].name !== '') updateType += 'name';
    if (payload[0].amounts !== {}) {
      updateType += 'rule';
      array = '{' + Object.entries(payload[0].amounts).map(arr => `{${arr[0]},${arr[1]}}`).join() + '}'
    }
    if (updateType === ""){
      return ("No update required");
    } else if (updateType ==="name") {
      console.log('Name changed');
      const updateName = `UPDATE "pool_expense" SET name = ($2) WHERE id = ($1)`;
      const ruleValues = [payload[0].id, payload[0].name];  
      return await db.query(updateName, ruleValues);
    } else if (updateType === 'rule') {
      const updateRule = `UPDATE "pool_expense" SET rule = ($2) WHERE id = ($1)`;
      const ruleValues = [payload[0].id, array];  
      console.log('Rule changed to', payload, updateRule, ruleValues);
      return await db.query(updateRule, ruleValues);
    } else if (updateType === 'namerule') {
      const updateNameRule = `UPDATE "pool_expense" SET name = ($2), rule = ($3) WHERE id = ($1)`;
      const ruleValues = [
        payload[0].id, payload[0].name, array||[]
      ];  
      console.log('Name and rule changed');
      return await db.query(updateNameRule, ruleValues);
        }
  } catch (e) {
    console.log(e, "Error adding new pool rule");
  }
};

exports.getRule = async (payload) => {
  try {
    const getRule = `SELECT * from "pool_expense" WHERE id = $1 LIMIT 1`;
    const ruleValues = [
      payload.rule_id
    ];
    const ruleInfo = await db.query(getRule, ruleValues);
    console.log("Fetched pool rule");
    return ruleInfo.rows[0];
  } catch (e) {
    console.log(e, "Error fetching pool rule");
  }
};
