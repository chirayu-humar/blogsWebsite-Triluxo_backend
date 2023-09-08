const jwt = require("jsonwebtoken");

const authentication = async function (req, res, next) {
    let jwtToken;
    const authHeader = req.headers["authorization"];
    if (authHeader !== undefined) {
      jwtToken = authHeader.split(" ")[1];
    }
    if (jwtToken === undefined) {
      res.status(401);
      const responseObject = {
        status_code: 401,
        error_msg: "Invalid JWT Token"
      }
      res.json(responseObject);
    } else {
      jwt.verify(jwtToken, "secret_key", async (error, payload) => {
        if (error) {
          res.status(401);
          const responseObject = {
            status_code: 401,
            error_msg: "Invalid JWT Token"
          }
          res.json(responseObject);
        } else {
          req.payload = payload;
          next();
        }
      });
    }
};

module.exports = {authentication};