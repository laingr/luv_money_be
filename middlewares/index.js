const admin = require("../firebase");

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authtoken &&
    req.headers.authtoken.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authtoken.split(" ")[1];
  } else {
    req.authToken = null;
  }
  next();
};

const checkIfAuthenticated = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const authToken = req.authToken;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    }
  });
};

module.exports = { checkIfAuthenticated };
