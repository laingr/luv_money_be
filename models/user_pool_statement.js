"use strict";

const db = require("../db");

exports.newUser = async user => {
  try {
    const insertUser = `INSERT INTO "user"(name, email, created_on) VALUES ($1, $2, CURRENT_TIMESTAMP)`;
    const userValues = [`${user.firstName + " " + user.lastName}`, user.email];
    await db.query(insertUser, userValues);
  } catch (e) {
    console.log(e, "Error adding new user");
  }
};

exports.getStatement = async (data) => {
  try {
    const statementQuery = 
    `SELECT ups.*, upe.*, u.photourl 
    from "user_pool_statement" ups
    JOIN "user_pool_expense" upe on ups.id=upe.statement_id
    JOIN "user" u on ups.user_id = u.id
    WHERE ups.id = $1`;
    const statementValues = [data.statement_id]
    const statements = await db.query(statementQuery, statementValues);
    return statements.rows;
  } catch (e) {
    console.log(e, "Error getting statement");
  }
}

exports.getStatementDetails = async (data) => {
  try {
    const statementQuery = 
    `SELECT * 
    from "user_pool_statement"
    WHERE id = $1`;
    const statementValues = [data.statement_id]
    const statements = await db.query(statementQuery, statementValues);
    return statements.rows;

  } catch (e) {
    console.log(e, "Error getting statement");
  }
}
