"use strict";

const auth = require("./authcontroller");
const models = require("../models");

///------USERS------///

exports.createUser = auth.createUser;

///------POOLS------///

exports.newPool = async (req, res) => {
  try {
    await models.pool.newPool(req.body.user_id, req.body);
    res.status(201);
    res.send();
  } catch (e) {
    console.log(e, "Error making pool");
  }
};

exports.getPools = async (req, res) => {
  try {
    // something
  } catch (e) {
    console.log(e, "Error making something");
  }
};

///------EXPENSES------///

exports.newExpense = async (req, res) => {
  try {
    await models.user_pool_expense.newUserExpense(req.body);
    await models.user_pool_balance.balance(req.body);
    res.status(201);
    res.send(req.body);
  } catch (e) {
    console.log(e, "Error creating new Expense");
  }
};

///------SETTINGS------///

exports.updateSettings = async (req, res) => {
  try {
    // something
  } catch (e) {
    console.log(e, "Error making something");
  }
};

exports.getSettings = async (req, res) => {
  try {
    // something
  } catch (e) {
    console.log(e, "Error making something");
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
