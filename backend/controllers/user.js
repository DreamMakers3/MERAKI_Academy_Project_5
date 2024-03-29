const { pool } = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const {
    firstName,
    lastName,
    jobName,
    country,
    email,
    password,
    about,
    CV,
    phoneNumber,
    skills,
    education,
    field_id,
    role_id,
  } = req.body;

  const lowCaseFN = firstName.toLowerCase();
  const lowCaseLN = lastName.toLowerCase();

  const encryptedPassword = await bcrypt.hash(password, 7); //salt = 7
  const query = `INSERT INTO users (firstName,
        lastName,
        lowCaseFN,
        lowCaseLN,
        jobName,
        country,
        email,
        password,
        about,
        CV,
        phoneNumber,
        skills,
        education,
        field_id,
        role_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *`;
  const placeholders = [
    firstName,
    lastName,
    lowCaseFN,
    lowCaseLN,
    jobName,
    country,
    email.toLowerCase(),
    encryptedPassword,
    about,
    CV,
    phoneNumber,
    skills,
    education,
    field_id,
    role_id,
  ];
  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Account created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "The email already exists",
        err: err.message,
      });
    });
};

/* ============================================= */

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  const query = `SELECT * FROM users WHERE email=$1`;
  const placeholders = [email];
  pool
    .query(query, placeholders)
    .then((result) => {
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              user_id: result.rows[0].user_id,
              country: result.rows[0].country,
              role: result.rows[0].role_id,
              CV: result.rows[0].CV,
              phoneNumber: result.rows[0].phoneNumber,
              jobName: result.rows[0].jobName,
              field_id: result.rows[0].field_id,
            };
            const options = { expiresIn: "2d" };
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);
            if (token) {
              return res.status(200).json({
                token: token,
                success: true,
                message: `Valid login credentials`,
                user_id: result.rows[0].user_id,
              });
            } else {
              throw Error;
            }
          } else {
            res.status(403).json({
              success: false,
              message: `Wrong email or password`,
            });
          }
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message: "Wrong email or password",
        err: err.message,
      });
    });
};

/* ============================================= */

const getAllUsersByField = (req, res) => {
  const field_id = req.token.field_id;
  const user_id = req.token.user_id;
  const query = `SELECT user_id,firstName,lastName, profileImage, jobName FROM users WHERE field_id=$1 AND NOT user_id=$2;`;
  const placeholders = [field_id, user_id];

  pool
    .query(query, placeholders)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The users with Field: ${field_id}`,
          result: result.rows,
        });
      } else {
        throw new Error(`No users on Field: ${field_id}`);
      }
    })
    .catch((err) => {
      console.log("err", err);

      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

/* ============================================= */

const createNewFollow = (req, res) => {
  const { followed_user_id } = req.body;
  console.log("req.token", req.token);
  const following_user_id = req.token.user_id;
  const query = `INSERT INTO follows (followed_user_id,following_user_id) VALUES ($1,$2) RETURNING* ;`;
  const placeholders = [followed_user_id, following_user_id];
  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Followed successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

/* ============================================= */

const unFollow = (req, res) => {
  const { followed_user_id } = req.params;
  const following_user_id = req.token.user_id;

  const placeholders = [following_user_id, followed_user_id];
  const query = `DELETE FROM follows WHERE following_user_id=$1 AND followed_user_id=$2 RETURNING*;
    `;
  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: `follows with following_user_id: ${following_user_id} and followed_user_id:${followed_user_id} deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

/* ============================================= */

const getAllFollowersByUserId = (req, res) => {
  const id = req.params.id;
  const query = `SELECT users.firstName, users.lastName, users.user_id , users.profileimage, users.role_id
  FROM follows
   INNER JOIN users
  ON users.user_id=follows.followed_user_id
    WHERE follows.following_user_id=$1 ;`;
  const placeholders = [id];

  pool
    .query(query, placeholders)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The follows for user with id = ${id}`,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting follows");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

/* ============================================= */
const getUserById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT firstName,lastName,email,CV, profileImage,coverImage,jobName,country,about,skills,experience,education, role_id, user_id, field_id FROM users WHERE user_id=$1`;
  const placeholders = [id];

  pool
    .query(query, placeholders)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The User with id: ${id}`,
          result: result.rows[0],
        });
      } else {
        throw new Error("Error happened while getting user");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

/* ============================================= */

const getUsersByInstitustion = (req, res) => {
  const id = req.params.id;
  const query = `SELECT users.firstName,users.lastName,users.email FROM users LEFT JOIN institution_user
  ON institution_user.institution_id=users.user_id 
  WHERE institution_user.institution_user_id=$1`;
  const placeholders = [id];

  pool
    .query(query, placeholders)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The user  with institution-id: ${id}`,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting user");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

/* ============================================= */

const createNewInstitutionUser = (req, res) => {
  const user_id = req.token.user_id;
  const {
    institution_id,
    workDiscription,
    InstitutionName,
    startDate,
    endDate,
  } = req.body;
  const placeholders = [
    institution_id,
    user_id,
    workDiscription,
    InstitutionName,
    startDate,
    endDate,
  ];
  const query = `INSERT INTO institution_user (institution_id, user_id, workDiscription, InstitutionName,startDate,
    endDate) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;

  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Experience Added successfully`,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

/* ================================================ */

const getUserExperiences = (req, res) => {
  const user_id = req.params.user_id;
  const placeholders = [user_id];
  const query = `SELECT * FROM institution_user WHERE user_id=$1`;

  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `All Experiences`,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

/* ================================================= */
const updateUserInfo = (req, res) => {
  const user_id = req.token.user_id;
  const {
    firstName,
    lastName,
    jobName,
    country,
    profileImage,
    coverImage,
    about,
    phoneNumber,
    skills,
  } = req.body;
  const placeholders = [
    user_id,
    firstName || null,
    lastName || null,
    jobName || null,
    country || null,
    profileImage || null,
    coverImage || null,
    about || null,
    phoneNumber || null,
    skills || null,
  ];
  const query = `UPDATE users SET firstName=COALESCE($2,firstName),lastName=COALESCE($3,lastName),jobName=COALESCE($4,jobName),country=COALESCE($5,country),profileImage=COALESCE($6,profileImage),coverImage=COALESCE($7,coverImage),about=COALESCE($8,about),phoneNumber=COALESCE($9,phoneNumber),skills=COALESCE($10,skills) WHERE user_id=$1 RETURNING *`;

  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `updated`,
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

/* ==================================================== */
/*  for search >>
const values = [fname.toLowerCase() + "%"];
  const query = `SELECT * FROM  providers INNER JOIN categories ON providers.category_id = categories.category_id WHERE fname LIKE $1 OR lname LIKE $1 ;`;

  https://www.w3schools.com/sql/sql_wildcards.asp

 */

const userSearch = (req, res) => {
  const searchInput = req.body.searchInput.toLowerCase();
  const placeholder = [searchInput];
  const query = `SELECT * FROM users WHERE lowCaseFN LIKE $1 OR lowCaseLN LIKE $1`;

  pool
    .query(query, placeholder)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `success`,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};
/* ======================================================= */

module.exports = {
  register,
  login,
  createNewFollow,
  getAllUsersByField,
  getUserById,
  getAllFollowersByUserId,
  unFollow,
  createNewInstitutionUser,
  getUsersByInstitustion,
  getUserExperiences,
  updateUserInfo,
  userSearch,
};
