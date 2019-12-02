"use strict";

const db = require("../db");

exports.drop = async () => {
  await db.query(`DROP TABLE IF EXISTS "user_pool_balance"`, []);
  console.log("dropped user_pool_balance");

  await db.query(`DROP TABLE IF EXISTS "user_pool_statement"`, []);
  console.log("dropped user_pool_statement");

  await db.query(`DROP TABLE IF EXISTS "user_pool_expense"`, []);
  console.log("dropped user_pool_expense");
  
  await db.query(`DROP TABLE IF EXISTS "pool_expense"`, []);
  console.log("dropped pool_expense");
  
  await db.query(`DROP TABLE IF EXISTS "user_pool"`, []);
  console.log("dropped user_pool");

  await db.query(`DROP TABLE IF EXISTS "user"`, []);
  console.log("dropped user");

  await db.query(`DROP TABLE IF EXISTS "pool"`, []); 
  console.log("dropped pool");
  
  await db.query(`DROP TABLE IF EXISTS "user_pool_statement_history"`, []); 
  console.log("dropped user_pool_statement_history");
  

};

exports.build = async () => {
  await db.query(
    `CREATE TABLE "user"(
      id SERIAL PRIMARY KEY,
      uid VARCHAR(100) NOT NULL,
      name VARCHAR(50) NOT NULL,
      email VARCHAR(355) UNIQUE NOT NULL,
      photoURL VARCHAR(100),
      created_on TIMESTAMP NOT NULL)`,
    []);
  console.log("created user");

  await db.query(
    `CREATE TABLE "pool"(
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      frequency VARCHAR(50) NOT NULL,
      current_statement INTEGER NOT NULL,
      next_statement_date TIMESTAMP NOT NULL,
      grace_period VARCHAR(20) NOT NULL,
      due_date TIMESTAMP NOT NULL,
      created_on TIMESTAMP NOT NULL)`,
    []);
  console.log("created pool");

  await db.query(
    `CREATE TABLE "user_pool"(
      user_id INTEGER,
      pool_id INTEGER,
      PRIMARY KEY (user_id, pool_id))`,
    []);
  console.log("created user_pool");
  
  await db.query(
    `CREATE TABLE "pool_expense"(
    id SERIAL PRIMARY KEY,
    pool_id INTEGER REFERENCES pool(id),
    name VARCHAR(50) NOT NULL,
    rule INTEGER ARRAY)`,
    []);
  console.log("created pool_expense");

  await db.query(
    `CREATE TABLE "user_pool_balance"(
    pool_id INTEGER NOT NULL,
    updated_by_user INTEGER NOT NULL,
    date TIMESTAMP NOT NULL,
    PRIMARY KEY (pool_id, date),
    balances DECIMAL(8,2) ARRAY)`,
    []);
  console.log("created user_pool_balance");

  await db.query(
    `CREATE TABLE "user_pool_statement"(
    id SERIAL NOT NULL,
    pool_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    status VARCHAR NOT NULL,
    statement_date TIMESTAMP NOT NULL,
    due_date TIMESTAMP NOT NULL,
    paid_date TIMESTAMP,
    PRIMARY KEY (id, pool_id, statement_date),
    amount DECIMAL(8,2))`,
    []);
  console.log("created user_pool_statement");

  await db.query(
    `CREATE TABLE "user_pool_statement_history"(
    id SERIAL NOT NULL PRIMARY KEY,
    statement_id INTEGER NOT NULL)`,
    []);
  console.log("created user_pool_statement_history");

  await db.query(
    `CREATE TABLE "user_pool_expense"(
    id SERIAL PRIMARY KEY,
    pool_expense_id INTEGER REFERENCES pool_expense(id),
    statement_id INTEGER,
    user_id INTEGER,
    name VARCHAR(50),
    date TIMESTAMP,
    amount SMALLINT,
    user_adjusted DECIMAL(8,2) ARRAY)`,
    []);
  console.log("created user_pool_expense");
};

exports.populate = async () => {
  //---INSERT DUMMY DATA---//
  const insertUser = `INSERT INTO "user"(uid, name, email, photoURL, created_on) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)`;
  const insertPool = `INSERT INTO "pool"(name, frequency, current_statement, next_statement_date, due_date, grace_period, created_on) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)`;
  const insertUserPool = `INSERT INTO "user_pool"(user_id, pool_id) VALUES ($1, $2)`;
  const insertPool_expense = `INSERT INTO "pool_expense"(pool_id, name, rule) VALUES ($1, $2, $3)`;
  const insertUserPool_balance = `INSERT INTO "user_pool_balance"(pool_id, updated_by_user, date, balances) VALUES ($1, $2, CURRENT_TIMESTAMP, $3)`;
  const insertUser_pool_statement = `INSERT INTO "user_pool_statement"(pool_id, user_id, status, statement_date, due_date, paid_date, amount) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + interval'7 days', NULL, $4)`;
  const insertUser_pool_expense = `INSERT INTO "user_pool_expense"(pool_expense_id, user_id, statement_id, name, date, amount) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5)`;

  const userValues1 = [
    "y4Ac7s3VPddxkAnUOo5HA977d7x1",
    "james",
    "jamessss@james.com",
    "https://picsum.photos/200"
  ];
  const userValues2 = [
    "y4Ac7s3VPddxkAnUOo5HA977d7x2",
    "briana",
    "briana@b.com",
    "https://picsum.photos/200"
  ];
  const userValues3 = [
    "y4Ac7s3VPddxkAnUOo5HA977d7x4",
    "vincent",
    "v@jump.com",
    "https://picsum.photos/200"
  ];
  const userValues4 = [
    "y4Ac7s3VPddxkAnUOo5HA977d7x6",
    "anu",
    "a@talk.com",
    "https://picsum.photos/200"
  ];
  const poolValues1 = ['LuvMoney Pool', "Monthly", "1", "12-15-19 12:00:00", "12-20-19 12:00:00", "5 Days"];
  const userPoolValues1 = ["1", "1"];
  const userPoolValues2 = ["2", "1"];
  const userPoolValues3 = ["3", "1"];
  const userPoolValues4 = ["4", "1"];
  const pool_expenseValues1 = ["1", "Groceries", "{{1,25},{2,25},{3,25},{4,25}}"];
  const pool_expenseValues2 = ["1", "Netflix", "{{1,50},{2,50},{3,0},{4,0}}"];
  const pool_expenseValues3 = ["1", "Gas", "{{1,10},{2,10},{3,30},{4,50}}"];
  const user_pool_expenseValues1 = ["1", "3", "1", "Vincent Grocery Run", "40"];
  const user_pool_expenseValues2 = ["2", "1", "1", "James Netflix Binging", "20"];
  const user_pool_expenseValues3 = ["3", "4", "1", "Anu loves Gas", "100"];
  const userPool_balanceValues1 = ["1", "1", "{{1,-10},{2,-30},{3,0},{4,40}}"];
  const user_pool_statementValues1 = ["1", "1", "1", "-10"];
  const user_pool_statementValues2 = ["1", "1", "2", "-30"];
  const user_pool_statementValues3 = ["1", "1", "3", "0"];
  const user_pool_statementValues4 = ["1", "1", "4", "40"];

  try {
    await db.query(insertUser, userValues1);
    await db.query(insertUser, userValues2);
    await db.query(insertUser, userValues3);
    await db.query(insertUser, userValues4);
    await db.query(insertPool, poolValues1);
    await db.query(insertUserPool, userPoolValues1);
    await db.query(insertUserPool, userPoolValues2);
    await db.query(insertUserPool, userPoolValues3);
    await db.query(insertUserPool, userPoolValues4);
    await db.query(insertPool_expense, pool_expenseValues1);
    await db.query(insertPool_expense, pool_expenseValues2);
    await db.query(insertPool_expense, pool_expenseValues3);
    await db.query(insertUserPool_balance, userPool_balanceValues1);
    await db.query(insertUser_pool_statement, user_pool_statementValues1);
    await db.query(insertUser_pool_statement, user_pool_statementValues2);
    await db.query(insertUser_pool_statement, user_pool_statementValues3);
    await db.query(insertUser_pool_statement, user_pool_statementValues4);
    await db.query(insertUser_pool_expense, user_pool_expenseValues1);
    await db.query(insertUser_pool_expense, user_pool_expenseValues2);
    await db.query(insertUser_pool_expense, user_pool_expenseValues3);
  } catch (e) {
    console.log(e);
  };
}
