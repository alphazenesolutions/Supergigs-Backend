const express = require("express");
const router = express.Router();
const connection = require("../../db/mysql");

router.post("/new", async (req, res) => {
  try {
    const myquery = "INSERT INTO intro SET ?";
    const create = new Promise(async (resolve, reject) => {
      await connection.query(myquery, req.body, (err, res) => {
        if (err) return resolve(err);
        return resolve(req.body);
      });
    });
    var allintro = await create;
    return res.send(allintro);
  } catch (error) {
    return res.send(error);
  }
});

router.get("/all", async (req, res) => {
  var introdetails = new Promise(async (resolve, reject) => {
    await connection.query("SELECT * FROM intro", function (err, result, fields) {
      if (err) {
        return false;
      } else {
        return resolve(result);
      }
    });
  });
  const intro_details = await introdetails;
  return res.send(intro_details);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const allintros = new Promise(async (resolve, reject) => {
    const myquery = `SELECT * FROM intro WHERE id=?`;
    connection.query(myquery, [id], (err, res) => {
      if (err) return resolve(false);
      return resolve(res);
    });
  });
  const allintro = await allintros;
  return res.send(allintro);
});

router.post("/update/:id", async (req, res) => {
    const { id } = req.params
    connection.query('UPDATE intro SET ? WHERE id = ?', [req.body, id], function (err, rows) {
        if (err) {
            return res.send(false)
        } else {
            return res.send(true)
        }
    })
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const allintro = new Promise(async (resolve, reject) => {
        const myquery = "DELETE FROM intro WHERE id= ?"
        connection.query(myquery, [id], (err, res) => {
            if (err) return resolve(err.message)
            return resolve(true)
        })
    })
    return res.send(true)
})

module.exports = router;
