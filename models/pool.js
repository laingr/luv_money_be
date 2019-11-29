"use strict";

const db = require("../db");

exports.newPool = async (pool) => {
  try {
    const insertPool = `INSERT INTO "pool"(name, frequency, due_date, created_on) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`;
    const poolValues = [
      pool.name, pool.frequency, pool.due_date
    ];
    await db.query(insertPool, poolValues);
    console.log("Added pool");
  } catch (e) {
    console.log(e, "Error adding new pool");
  }
};

exports.getPools = async (data) => {
  try {
    //----------Get User Pool Info----------//
    const getUserPoolsQuery = `SELECT u.id, pool_id from "user_pool" up JOIN "user" u ON up.user_id = u.id WHERE u.uid = $1 ORDER BY 1 DESC LIMIT 1`;
    const getUserPoolsValues = [data.uid];
    const user_pool = await db.query(getUserPoolsQuery, getUserPoolsValues);
    const poolId = user_pool.rows[0].pool_id;
    const userId = user_pool.rows[0].id;
    
    //----------Get User Info----------//
    const getUserQuery = `
      SELECT u.id, u.name, u.photourl 
      FROM "user" u 
      JOIN "user_pool" up ON u.id = up.user_id 
      WHERE up.pool_id = $1`;
    const getUserValues = [poolId];
    const users = await db.query(getUserQuery, getUserValues);
    const userInfo = users.rows;

    //----------Get Pool Settings Info----------//
    const getPoolSettingsQuery = `
      SELECT *
      FROM "pool"
      WHERE id = $1`;
    const getPoolSettingsValues = [poolId];
    const poolSettings = await db.query(getPoolSettingsQuery, getPoolSettingsValues);
    const poolSettingsInfo = poolSettings.rows;

    //----------Get Pool Rule Settings Info----------//
    const getPoolRuleSettingsQuery = `
      SELECT *
      FROM "pool_expense"
      WHERE pool_id = $1`;
    const getPoolRuleSettingsValues = [poolId];
    const poolRuleSettings = await db.query(getPoolRuleSettingsQuery, getPoolRuleSettingsValues);
    const poolRuleSettingsInfo = poolRuleSettings.rows;

    //----------Get Balances----------//
    const getUserBalancesQuery = `SELECT balances FROM "user_pool_balance" WHERE pool_id = $1 ORDER BY date DESC LIMIT 1`;
    const getUserBalancesValues = [poolId];
    const balances = await db.query(getUserBalancesQuery, getUserBalancesValues);
    const balanceInfo = balances.rows[0].balances;

    //----------Get Recent Statement----------//
    const getUserStatementQuery = `SELECT id, user_id, pool_id, statement_date, due_date, paid_date, amount FROM "user_pool_statement" WHERE pool_id = $1 and user_id = $2 ORDER BY statement_date DESC`;
    const getUserStatementValues = [poolId, userId];
    const statement = await db.query(getUserStatementQuery, getUserStatementValues);
    const statementInfo = statement.rows;

    //----------Get Pool Info----------//
    const getPoolQuery = `
    SELECT pe.name as category, upe.name as expense, upe.user_id, upe.date, upe.amount, upe.user_adjusted
    FROM "pool_expense" pe 
    JOIN "user_pool_expense" upe on pe.id = upe.pool_expense_id
    WHERE pe.pool_id = $1`;
    const getPoolValues = [poolId];
    const pool = await db.query(getPoolQuery, getPoolValues);
    const poolInfo = pool.rows;

    const dataSet = {
      userInfo,
      balanceInfo,
      statementInfo,
      poolInfo,
      poolSettingsInfo,
      poolRuleSettingsInfo
    };
    return dataSet;

  } catch (e) {
    console.log(e, "Error getting all pools");
  }
}
