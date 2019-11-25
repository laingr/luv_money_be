"use strict";

const auth = require("./authcontroller");
const models = require("../models");

///------USERS------///

exports.createUser = auth.createUser;

///------POOLS------///

exports.newPool = async (req, res) => {
  try {
    const pool = ({ user_id, name, frequency, due_date } = req.body);
    console.log(pool);

    await models.pool.newPool(pool);
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
    // something
  } catch (e) {
    console.log(e, "Error making something");
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
