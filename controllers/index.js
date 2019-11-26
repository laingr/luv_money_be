"use strict";

const auth = require("./authcontroller");
const models = require("../models");
const db = require("../db");


///------USERS------///

exports.createUser = auth.createUser;

exports.getUsers = async (req, res) => {
  try {
    const user = await models.user.getUsers();
    res.status(201);
    res.json(user);
  } catch (e) {
    console.log(e, "Error making something");
  }
};

///------POOLS------///

exports.newPool = async (req, res) => {
  console.log(req.body);
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
    const pool = await models.pool.getPools();
    res.status(201);
    res.json(pool);
  } catch (e) {
    console.log(e, "Error making something");
  }
};

///------EXPENSES------///

exports.newExpense = async (req, res) => {
  try {
    await models.user_pool_expense.newUserExpense(req.body.user_id, req.body)
    
    res.status(201);
    res.send();
  } catch (e) {
    console.log(e, "Error creating new Expense");
  }
};

///------SETTINGS------///

exports.updateSettings = async (req, res) => {
  try {
    await models.settings.updateSettings(req.body.user_id, req.body);
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
