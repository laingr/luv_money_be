"use strict";

exports.newUser = async user => {
  try {
    const insertUser = `INSERT INTO "user"(${user.name}, ${user.email}, created_on) VALUES ($1, $2, CURRENT_TIMESTAMP)`;
    const userValues = ["james", "jamessss@james.com"];
    await db.query(insertUser, userValues);
  } catch (e) {}
};
