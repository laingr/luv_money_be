"use strict";

const db = require("../db");

exports.newPayment = async (payload) => {
  //---get original balance---//
  const getBalances = await db.query(`SELECT balances from user_pool_balance WHERE pool_id = $1`); //poolid is hardcoded
  try {

  //---update the Balance---//
    const updatedUserBalance = getBalances.rows.map((users) => {
      const { balances } = users;
      console.log(users)
      console.log(balances, 'balances')
      const changedBalances =balances.filter((user)=>{
        console.log('payload', payload, 'payload',user, 'user', user[0], 'user[0]')
        if (user[0] === payload.updated_by_user) {
          const updatedAmount = user[1]+parseFloat(payload.payment)
          return user[1] = [payload.updated_by_user,updatedAmount]
        } else {
          return user
        }
      })
      return changedBalances
    })
    console.log(changedBalances, 'outside')
  //---insert Updated Balance into user_pool_balance table----//
    const insertUpdatedBalance = `UPDATE "user_pool_balance" SET balances = $1`;
    const balanceValues = (updatedUserBalance) ;
    await db.query(insertUpdatedBalance, balanceValues);
    console.log("Added pool payment");
  //---add payment into user_pool_statement table----//
    const statementAddedPayment = `INSERT INTO "user_pool_statement" (pool_id, user_id, statement_date, due_date, paid_date, amount, status) VALUES ($1, $2, $3, $4, $5, $6, $7) `
    const statementAddedPaymentValues = [payload.pool_id, payload.updated_by_user,new Date, new Date, new Date, payload.payment, payload.status]
    await db.query(statementAddedPayment, statementAddedPaymentValues)
    console.log('added Statement Stamp')
  } catch (e) {
    console.log(e, "Error adding new pool payment");
  }
};
