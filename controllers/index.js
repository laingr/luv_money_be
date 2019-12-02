"use strict";

const auth = require("./authcontroller");
const statements = require("./statements");
const models = require("../models");
const db = require("../db");



///------USERS------///

exports.createUser = auth.createUser;

///------POOLS------///

exports.newPool = async (req, res) => {
  try {
    await models.pool.newPool(req.body);
    res.status(201);
    res.send();
  } catch (e) {
    console.log(e, "Error making pool");
  }
};

exports.getPools = async (req, res) => {
  try {
    const pool = await models.pool.getPools(req.query);
    res.status(200);
    res.json(pool);
  } catch (e) {
    console.log(e, "Error making something");
  }
};

exports.getBE = async (req, res) => {
  try {
    const BE = await models.pool.getBE(req.query);
    res.status(200);
    res.json(BE);
  } catch (e) {
    console.log(e, "Error making something");
  }
};

///------EXPENSES------///

exports.newExpense = async (req, res) => {
  try {
    await models.user_pool_expense.newUserExpense(req.body.payload);
    const adjustments = await models.user_pool_balance.balance(req.body.payload);
    await models.user_pool_expense.balancedUserExpense(req.body.payload, adjustments);
    res.status(201);
    res.json();
  } catch (e) {
    console.log(e, "Error creating new Expense");
  }
};

///------SETTINGS------///

exports.updateSettings = async (req, res) => {
  try {
    await models.settings.updateSettings(req.body);
    res.status(201);
    res.send();  } catch (e) {
    console.log(e, "Error updating Settings");
  }
};

exports.getSettings = async (req, res) => {
  try {
    const settings = await models.settings.getSettings();
    res.status(201);
    res.json(settings);  } catch (e) {
    console.log(e, "Error getting the Settings");
  }
};

///------PAYMENT------///

exports.newPayment = async (req, res) => {
  try {
    // something
  } catch (e) {
    console.log(e, "Error making something");
  }
};

///------RULE------///

exports.newRule = async (req, res) => {
  try {
    const rule = await models.pool_expense.newRule([req.body.payload]);
    res.json(rule);
  } catch (e) {
    console.log(e, "Error making something");
  }
};

exports.editRule = async (req, res) => {
  try {
    const rule = await models.pool_expense.updateRule([req.body.payload]);
    res.json(rule);
  } catch (e) {
    console.log(e, "Error making something");
  }
};

///------STATEMENT------///

exports.getPopUp = async (req,res) => {
  if(req.query.type === 'rule') {
    getRule(req,res)
  } else {
    console.log('statement');
    getStatement(req,res)
  }
}

const getStatement = async (req, res) => {
  try {
    const statement = await models.user_pool_statement.getStatement(req.query);
    res.json(statement);
  } catch (e) {
    console.log(e, "Error making something");
  }
};

const getRule = async (req, res) => {
  try {
    const rule = await models.pool_expense.getRule(req.query);
    res.json(rule);
  } catch (e) {
    console.log(e, "Error making something");
  }
};
