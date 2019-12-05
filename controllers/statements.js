"use strict";

const auth = require("./authcontroller");
const models = require("../models");
const db = require("../db");

  //Status
  //1 = READY TO GO (Grace Period Starts)
  //2 = COUNTDOWN TO NEXT STATEMENT (After Due Date and Settled)
  //3 = SETTLED (During Grace After Pay) - TRIGGERED VIA PAY
  //4 = LATE (After Grace Without Pay)
  //5 = HISTORY

exports.runStatements = async () => {
  const newStatementQuery = 
  `INSERT INTO "pool_statements"()
  VALUES()`;
  const newStatementValues = [];

  

}


exports.newGracePeriodUpdates = async () => {
  const statements = await newStatements();

  const newStatementQuery = 
  `INSERT INTO "user_pool_statement"(id, pool_id, user_id, status, statement_date, due_date, paid_date, amount) VALUES (DEFAULT, $1, $2, $3, CURRENT_TIMESTAMP + interval '30 days', CURRENT_TIMESTAMP + interval '35 days', NULL, NULL) RETURNING*`;

  const addNextQuery = 
  `UPDATE "pool" SET next_statement = $1 WHERE id = $2`;
  
  //creates new statements upcoming period and adds them to next statement in pools
  statements.map(async(el)=>{
    const statementValues = [el.pool_id, el.user_id, 2]
    const createNewStatements = await db.query(newStatementQuery, statementValues);
    const addNextValues = [createNewStatements.rows[0].id, el.pool_id];
    const addNextStatements = await db.query(addNextQuery, addNextValues);
  });

  const updateStatementQuery = `UPDATE "user_pool_statement" SET status = 1 WHERE id = $1`;

  //updates the new statement to record to for expenses through status
  statements.map((el)=> {
    const statementValues = [el.id]
    const updateStatements = db.query(updateStatementQuery, statementValues);
  });
  return statements;
}

//only applies for people who paid during the grace period
exports.countdownUpdates = async () => {
  const statements = await statementForCountdown();

  const updateStatementQuery = `UPDATE "user_pool_statement" SET status = 2 WHERE id = $1`;

  const removeNextQuery = 
  `UPDATE "pool" SET current_statement = COALESCE(next_statement), next_statement = NULL WHERE id = $1`;


  statements.map((el)=> {
    const statementValues = [el.id]
    const updateStatements = db.query(updateStatementQuery, statementValues);
  });

  statements.map((el)=> {
    const statementValues = [el.pool_id]
    const updateStatements = db.query(removeNextQuery, statementValues);
  });
  return statements;
}

//only applies for people who DIDNT pay during the grace period
exports.overdueUpdates = async () => {
  const statements = await statementForOverdue();

  const updateStatementQuery = `UPDATE "user_pool_statement" SET status = 4 WHERE id = $1`;

  statements.map((el)=> {
    const statementValues = [el.id]
    const updateStatements = db.query(updateStatementQuery, statementValues);
  });
  return statements;
}

const newStatements = async () => {
  try {
    const statementQuery = 
    `SELECT ups.*
    FROM "user_pool_statement" ups
    WHERE ups.statement_date < CURRENT_TIMESTAMP + interval'1 days'
    AND status = $1`;
    const statementValues = [2] //only looks  up status 2
    const statementSwitch = await db.query(statementQuery, statementValues);
    return statementSwitch.rows;
  } catch (e) {
    console.log(e, "Error getting new statements for update");
  }
}

const statementForCountdown = async () => {
  try {
    const statementQuery = 
    `SELECT ups.*
    FROM "user_pool_statement" ups
    where paid_date IS NULL
    and due_date > CURRENT_TIMESTAMP`;
    const statementValues = [];
    const statementSwitch = await db.query(statementQuery, statementValues);
    return statementSwitch.rows;
  } catch (e) {
    console.log(e, "Error getting statements for countdown update");
  }
}

const statementForOverdue = async () => {
  try {
    const statementQuery = 
    `SELECT ups.*
    FROM "user_pool_statement" ups
    where paid_date IS NOT NULL
    and due_date < CURRENT_TIMESTAMP`;
    const statementValues = []
    const statementSwitch = await db.query(statementQuery, statementValues);
    return statementSwitch.rows;
  } catch (e) {
    console.log(e, "Error getting statements for overdue");
  }
}


