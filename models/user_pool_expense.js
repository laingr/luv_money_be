"use strict";

const db = require("../db");

exports.newUserExpense = async (expense) => {
  try {
    const insertUserPoolExpense = `INSERT INTO 
    "user_pool_expense"(pool_expense_id, statement_id, user_id, name, date, amount) VALUES ($1, $2, $3, $4, $5, $6)`;
    const userPoolExpenseValues = [
      expense.pool_expense_id, expense.statement_id, expense.user_id, expense.name, expense.date, expense.amount
    ];
    await db.query(insertUserPoolExpense, userPoolExpenseValues);
    console.log("Added expense");
  } catch (e) {
    console.log(e, "Error adding new expense");
  }
};

exports.balancedUserExpense = async (expense, adjustments) => {
  try {
    const updateExpenseQuery = `UPDATE "user_pool_expense" SET user_adjusted = $1 WHERE pool_expense_id = $2 AND user_id = $3 AND name = $4 AND date = $5 AND amount = $6`;
    const updateExpenseValues = [adjustments, expense.pool_expense_id, expense.user_id, expense.name, expense.date, expense.amount];
    await db.query(updateExpenseQuery, updateExpenseValues);
    console.log("Expense updated");
  } catch (e) {
    console.log(e, "Error updating expense");
  }
};
