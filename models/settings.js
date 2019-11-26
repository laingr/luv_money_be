"use strict";

const db = require("../db");

exports.updateSettings = async (user, pool) => {
  try {
    const updateFrequencey = `UPDATE "pool" SET frequency = $1, due_date = $2 WHERE id = $3`;
    const frequencyValue = [ 
      pool.frequency, pool.due_date, pool.id
    ];
    await db.query(updateFrequencey, frequencyValue);
    console.log("Updated Settings");
  } catch (e) {
    console.log(e, "Error updating the settings");
  }
};

exports.getSettings = async (user,pool) => {
  try {
    const getAllSettings = `SELECT id, frequency, due_date from "pool"`;
    const settings = await db.query(getAllSettings);
    return settings

  } catch (e) {
    console.log(e, "Error getting all pools");
  }
}