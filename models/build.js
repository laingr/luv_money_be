"use strict";

const db = require("../db");
const moment = require("moment");

exports.drop = () => {
  db.query(`DROP TABLE IF EXISTS "user"`, [], (err, res) => {
    if (err) {
      return err;
    }
    console.log("dropped user");
  });
  db.query(`DROP TABLE IF EXISTS "pool"`, [], (err, res) => {
    if (err) {
      return err;
    }
    console.log("dropped pool");
  });
  db.query(`DROP TABLE IF EXISTS "user_pool"`, [], (err, res) => {
    if (err) {
      return err;
    }
    console.log("dropped user_pool");
  });
  db.query(`DROP TABLE IF EXISTS "pool_expense"`, [], (err, res) => {
    if (err) {
      return err;
    }
    console.log("dropped pool_expense");
  });
  db.query(`DROP TABLE IF EXISTS "user_pool_expense"`, [], (err, res) => {
    if (err) {
      return err;
    }
    console.log("dropped user_pool_expense");
  });
  db.query(`DROP TABLE IF EXISTS "user_pool_balance"`, [], (err, res) => {
    if (err) {
      return err;
    }
    console.log("dropped user_pool_balance");
  });
};

exports.build1 = () => {
  db.query(
    `CREATE TABLE "user"(
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      email VARCHAR(355) UNIQUE NOT NULL,
      photoURL VARCHAR(100),
      created_on TIMESTAMP NOT NULL)`,
    [],
    (err, res) => {
      if (err) {
        return err;
      }
      console.log("created user");
    }
  );
  db.query(
    `CREATE TABLE "pool"(
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      frequency VARCHAR(50) NOT NULL,
      due_date TIMESTAMP NOT NULL,
      created_on TIMESTAMP NOT NULL)`,
    [],
    (err, res) => {
      if (err) {
        return err;
      }
      console.log("created pool");
    }
  );
};

exports.build2 = () => {
  db.query(
    `CREATE TABLE "user_pool"(
      user_id INTEGER,
      pool_id INTEGER,
      PRIMARY KEY (user_id, pool_id))`,
    [],
    (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log("created user_pool");
    }
  );
  db.query(
    `CREATE TABLE "pool_expense"(
      id SERIAL PRIMARY KEY,
      pool_id INTEGER REFERENCES pool(id),
      name VARCHAR(50) NOT NULL,
      rule INTEGER ARRAY)`,
    [],
    (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log("created pool_expense");
    }
  );
  db.query(
    `CREATE TABLE "user_pool_balance"(
      pool_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      date TIMESTAMP NOT NULL,
      PRIMARY KEY (pool_id, user_id, date),
      balances DECIMAL(2) ARRAY)`,
    [],
    (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log("created user_pool_balance");
    }
  );
};

exports.build3 = async () => {
  // won't let reference to User_id to user table
  await db.query(
    `CREATE TABLE "user_pool_expense"(
      id SERIAL PRIMARY KEY,
      pool_expense_id INTEGER REFERENCES pool_expense(id),
      user_id INTEGER,
      name VARCHAR(50),
      date TIMESTAMP,
      amount SMALLINT)`,
    [],
    (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log("created user_pool_expense");
    }
  );
};

exports.build4 = async () => {
  const insertUser = `INSERT INTO "user"(name, email, photoURL, created_on) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`;
  const userValues = [
    "james",
    "jamessss@james.com",
    "https://picsum.photos/200"
  ];
  const insertPool = `INSERT INTO "pool"(name, frequency, due_date, created_on) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`;
  const poolValues = ["james pool", "Monthly", "12-12-12 12:12:12"];
  const insertUserPool = `INSERT INTO "user_pool"(user_id, pool_id) VALUES ($1, $2)`;
  const userPoolValues = ["1", "1"];
  const insertPool_expense = `INSERT INTO "pool_expense"(pool_id, name, rule) VALUES ($1, $2, $3)`;
  const pool_expenseValues = ["1", "Groceries", "{{1,45},{2,55}}"];
  const insertUserPool_balance = `INSERT INTO "user_pool_balance"(pool_id, user_id, date, balances) VALUES ($1, $2, CURRENT_TIMESTAMP, $3)`;
  const userPool_balanceValues = ["1", "2", "{{1,150},{2,-125}}"];
  const insertUser_pool_expense = `INSERT INTO "user_pool_expense"(pool_expense_id, user_id, name, date, amount) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4)`;
  const user_pool_expenseValues = ["1", "2", "Chiptole Run", "15"];
  try {
    await db.query(insertUser, userValues);
    await db.query(insertPool, poolValues);
    await db.query(insertUserPool, userPoolValues);
    await db.query(insertPool_expense, pool_expenseValues);
    await db.query(insertUserPool_balance, userPool_balanceValues);
    await db.query(insertUser_pool_expense, user_pool_expenseValues);
  } catch (e) {
    console.log(e);
  }
};
