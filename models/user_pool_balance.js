"use strict";

const db = require("../db");

exports.balance = async (expense) => {
  try {
    //------Get Pool Rule------//
    const queryExpense = `
      SELECT pool_id, rule 
      FROM "pool_expense" pe 
      JOIN "pool" p on pe.pool_id = p.id
      where pe.id = $1`;
    const expenseValues = [expense.pool_expense_id];
    const rules = await db.query(queryExpense, expenseValues);
    const pool_id = rules.rows[0].pool_id;
    const appliedRules = rules.rows[0].rule;
    console.log('applied rules',appliedRules);
    
    //------Get Previous Balances------//
    const prevBalances = `SELECT balances FROM "user_pool_balance" where pool_id = $1 ORDER BY date DESC limit 1`;
    const balanceValues = [pool_id];
    const prevUserBalances = await db.query(prevBalances, balanceValues);
    let balances = [];
    if (prevUserBalances.rows.length === 0){ //for new groups - todo update when invited
      console.log('HITTING');
      const users = `SELECT user_id FROM "user_pool" where pool_id = $1`;
      const initialBalanceValues = [pool_id];
      const usersToCreateBalance = await db.query(users, initialBalanceValues);
      const initialBalances = usersToCreateBalance.rows;
      let array = [];
      initialBalances.map(el=>array.push([el.user_id, 0]));
      balances = array;
    } else {
      balances = prevUserBalances.rows[0].balances
    };
    
    // if (balances.length < appliedRules.length) { //todo need to validate new members after first expense
    //   console.log('LENGTH ISSUE');
    //   // balances.push()
    // }
    
    //------Map Added Expense to New Rule------//
    const adjustments = appliedRules.map(el => el[1]*expense.amount*.01);
    const newBalances = [];
    const adjustedExpense = [];

    //------Match Balance with Rule and Update Balance------//
    for (let i=0;i<appliedRules.length;i++){
      for (let y=0;y<balances.length;y++){
        if (appliedRules[i][0] === balances[y][0]) {
          let newBal = parseFloat(balances[y][1])+parseFloat(adjustments[i]);
          if (balances[y][0]===expense.user_id) newBal-=parseFloat(expense.amount);
          newBalances.push([balances[y][0],newBal]);
          adjustedExpense.push([balances[y][0],parseFloat(adjustments[i])]);
        }
      }
    };
    //------Update User Pool Balances Table with New Balances------//
    const balanceStatement = `INSERT INTO "user_pool_balance"(pool_id, updated_by_user, date, balances) VALUES ($1, $2, CURRENT_TIMESTAMP, $3)`;
    const newBalanceValues = [pool_id, expense.user_id, newBalances];
    const updatedBalances = await db.query(balanceStatement, newBalanceValues);
    return adjustedExpense;
  } catch (e) {
    console.log(e, "Error adding new pool");
  }
};
