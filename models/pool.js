"use strict";

const db = require("../db");

exports.newPool = async (pool) => {
  try {
    const insertPool = `INSERT INTO "pool"(admin_id, name, frequency, current_statement, next_statement_date, due_date, grace_period, created_on) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP) RETURNING*`;
    const poolValues = [
      pool.payload.admin_id, pool.payload.name, pool.payload.frequency, pool.payload.current_statement, pool.payload.next_statement_date, pool.payload.due_date, pool.payload.grace_period
    ];
    const poolId = await db.query(insertPool, poolValues);
    const initialStatementQuery = `INSERT INTO "user_pool_statement"(pool_id, user_id, status, statement_date, due_date, paid_date, amount) VALUES ($1, $2, $3, CURRENT_TIMESTAMP + interval'30 days', CURRENT_TIMESTAMP + interval'35 days', NULL, $4)`;
    const initialStatementValues = [poolId.id, poolId.admin_id, 2, 0];
    await db.query(initialStatementQuery,initialStatementValues);
  } catch (e) {
    console.log(e, "Error adding new pool");
  }
};

exports.getPool = async (data) => {
  try {
    //----------Get single Pool----------//
    const getUserPoolsQuery = `SELECT id from "pool" WHERE admin_id = $1`;
    const getUserPoolsValues = [data.admin_id];
    const pool_id = await db.query(getUserPoolsQuery, getUserPoolsValues);
    return pool_id.rows[0].id;
  } catch (e) {
    console.log(e, "Error getting a pool");
  }
}
exports.getPools = async (data) => {
  try {
    //----------Get User Pool Info----------//
    const getUserPoolsQuery = `SELECT u.id, pool_id from "user_pool" up JOIN "user" u ON up.user_id = u.id WHERE u.uid = $1 ORDER BY 2 ASC LIMIT 1`;
    const getUserPoolsValues = [data.uid];
    const user_pool = await db.query(getUserPoolsQuery, getUserPoolsValues);
    const poolId = user_pool.rows[0].pool_id;
    const userId = user_pool.rows[0].id;
    
    //----------Get THIS User Info----------//
    const getThisUserQuery = `
      SELECT u.uid, u.id, u.name, u.photourl 
      FROM "user" u 
      WHERE u.id = $1`;
    const getThisUserValues = [userId];
    const thisUser = await db.query(getThisUserQuery, getThisUserValues);
    const thisUserInfo = thisUser.rows;

    //----------Get ALL User Info----------//

    const getUserQuery = `
      SELECT u.uid, u.id, u.name, u.photourl 
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
      WHERE pool_id = $1
      AND id > 11`; //for eliminating payment options from dropdown
    const getPoolRuleSettingsValues = [poolId];
    const poolRuleSettings = await db.query(getPoolRuleSettingsQuery, getPoolRuleSettingsValues);
    const poolRuleSettingsInfo = poolRuleSettings.rows;

    //----------Get Balances----------//
    const getUserBalancesQuery = `SELECT balances FROM "user_pool_balance" WHERE pool_id = $1 ORDER BY date DESC LIMIT 1`;
    const getUserBalancesValues = [poolId];
    const balances = await db.query(getUserBalancesQuery, getUserBalancesValues);
    const balanceInfo = balances.rows[0] ? balances.rows[0].balances: [];

    //----------Get Recent Statement----------//
    const getUserStatementQuery = `SELECT id, user_id, pool_id, status, statement_date, due_date, paid_date, amount FROM "user_pool_statement" WHERE user_id = $1 and pool_id = $2 ORDER BY statement_date DESC`;
    const getUserStatementValues = [userId, poolId];
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

    // //---------Get Message Info----------//
    const dataSet = {
      thisUserInfo,
      userInfo,
      balanceInfo,
      statementInfo,
      poolInfo,
      poolSettingsInfo,
      poolRuleSettingsInfo,
    };
    return dataSet;

  } catch (e) {
    console.log(e, "Error getting all pools");
  }
}

exports.getBE = async (data) => {
    try {
      //----------Get User Pool Info----------//
      const getUserPoolsQuery = `SELECT u.id, pool_id from "user_pool" up JOIN "user" u ON up.user_id = u.id WHERE u.uid = $1 ORDER BY 2 ASC LIMIT 1`;
      const getUserPoolsValues = [data.uid];
      const user_pool = await db.query(getUserPoolsQuery, getUserPoolsValues);
      const poolId = user_pool.rows[0].pool_id;
      const userId = user_pool.rows[0].id;
      
      //----------Get THIS User Info----------//
      const getThisUserQuery = `
        SELECT u.uid, u.id, u.name, u.photourl 
        FROM "user" u 
        WHERE u.id = $1`;
      const getThisUserValues = [userId];
      const thisUser = await db.query(getThisUserQuery, getThisUserValues);
      const thisUserInfo = thisUser.rows;
  
      //----------Get ALL User Info----------//
      const getUserQuery = `
        SELECT u.uid, u.id, u.name, u.photourl 
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
        WHERE pool_id = $1
        AND id > 11`;
      const getPoolRuleSettingsValues = [poolId];
      const poolRuleSettings = await db.query(getPoolRuleSettingsQuery, getPoolRuleSettingsValues);
      const poolRuleSettingsInfo = poolRuleSettings.rows;
  
      //----------Get Balances----------//
      const getUserBalancesQuery = `SELECT balances FROM "user_pool_balance" WHERE pool_id = $1 ORDER BY date DESC LIMIT 1`;
      const getUserBalancesValues = [poolId];
      const balances = await db.query(getUserBalancesQuery, getUserBalancesValues);
      const balanceInfo = balances.rows[0] ? balances.rows[0].balances: [];
  
      //----------Get Recent Statement----------//
      const getUserStatementQuery = `SELECT id, user_id, pool_id, status, statement_date, due_date, paid_date, amount FROM "user_pool_statement" WHERE user_id = $1 and pool_id = $2 ORDER BY statement_date DESC`;
      const getUserStatementValues = [userId, poolId];
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
      balanceInfo,
      poolInfo
    };
    return dataSet;

  } catch (e) {
    console.log(e, "Error getting all pools");
  }
}
