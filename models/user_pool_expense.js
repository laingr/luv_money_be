"use strict";

const db = require("../db");

exports.newUserExpense = async (user, expense) => {
  try {
    const insertUserPoolExpense = `INSERT INTO 
    "user_pool_expense"(pool_expense_id, user_id, name, date, amount) VALUES ($1, $2, $3, $4,$5)`;
    const userPoolExpenseValues = [
      expense.pool_expense_id, expense.user_id, expense.name, expense.date, expense.amount
    ];
    await db.query(insertUserPoolExpense, userPoolExpenseValues);
    console.log("Added expense");
  } catch (e) {
    console.log(e, "Error adding new expense");
  }
};
