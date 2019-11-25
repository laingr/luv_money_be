const admin = require("firebase-admin");

const serviceAccount = require("./luv_money_fb_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://luv-money.firebaseio.com"
});

module.exports = admin;
