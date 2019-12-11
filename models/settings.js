"use strict";

const db = require("../db");

exports.updateSettings = async (pool) => {
  try {
    const updateFrequencey = `UPDATE "pool" SET frequency = $1, due_date = $2 WHERE id = $3`;
    const frequencyValue = [ 
      pool.frequency, pool.due_date, pool.id
    ];
    await db.query(updateFrequencey, frequencyValue);
  } catch (e) {
    console.log(e, "Error updating the settings");
  }
};

exports.getSettings = async (pool) => {
  try {
    const getAllSettings = `SELECT id, frequency, due_date FROM "pool" WHERE id = $1`;
    const getAllSettingsValues = [pool.id];
    const settings = await db.query(getAllSettings, getAllSettingsValues);
    return settings

  } catch (e) {
    console.log(e, "Error getting all pools");
  }
}