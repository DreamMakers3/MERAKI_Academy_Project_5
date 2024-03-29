const { pool } = require("../models/db");

const authorization = (string) => {
  return function (req, res, next) {
    const role_id = req.token.role;
    const placeholders = [role_id, string];
    const query = `SELECT * FROM role_permissions RP INNER JOIN permissions P ON RP.permission_id = P.permission_id WHERE RP.role_id = ($1) AND P.permission = ($2)`;

    pool
      .query(query, placeholders)
      .then((result) => {
        if (result.rows.length) {
          next();
        } else {
          throw Error;
        }
      })
      .catch((err) => {
        res.status(400).json({
          message: "unauthorized",
          err: err.message,
        });
      });
  };
};

module.exports = authorization;
