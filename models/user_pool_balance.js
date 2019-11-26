"use strict";

const db = require("../db");

exports.balance = async (expense) => {
  try {

    //------Get Pool Rule------//
    const queryExpense = `SELECT rule FROM "pool_expense" where id = $1`;
    const expenseValues = [expense.pool_id];
    const rules = await db.query(queryExpense, expenseValues);
    const appliedRules = rules.rows[0].rule;
    
    //------Get Previous Balances------//
    const prevBalances = `SELECT balances FROM "user_pool_balance" where pool_id = $1 ORDER BY date DESC limit 1`;
    const balanceValues = [expense.pool_id];
    const prevUserBalances = await db.query(prevBalances, balanceValues);
    const balances = prevUserBalances.rows[0].balances;
    
    //------Map Added Expense to New Rule------//
    const adjustments = appliedRules.map(el => el[1]*expense.amount*.01);
    const newBalances = [];

    //------Match Balance with Rule and Update Balance------//
    for (let i=0;i<appliedRules.length;i++){
      for (let y=0;y<balances.length;y++){
        if (appliedRules[i][0] === balances[y][0]) {
          let newBal = parseFloat(balances[i][1])+parseFloat(adjustments[y]);
          newBalances.push([appliedRules[i][0],newBal]);
        }
      }
    };
    //------Update User Pool Balances Table with New Balances------//
    const balanceStatement = `INSERT INTO "user_pool_balance"(pool_id, updated_by_user, date, balances) VALUES ($1, $2, CURRENT_TIMESTAMP, $3)`;
    const newBalanceValues = [expense.pool_id, expense.user_id,newBalances];
    const updatedBalances = await db.query(balanceStatement, newBalanceValues);
    console.log("balances updated to pool with", newBalances);
  } catch (e) {
    console.log(e, "Error adding new pool");
  }
};
