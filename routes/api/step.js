const express = require("express");
const router = express.Router();
const connection = require("../../db/mysql");

router.post("/new", async (req, res) => {
  try {
    const myquery = "INSERT INTO step SET ?";
    const create = new Promise(async (resolve, reject) => {
      await connection.query(myquery, req.body, (err, res) => {
        if (err) return resolve(err);
        return resolve(req.body);
      });
    });
    var allstep = await create;
    return res.send(allstep);
  } catch (error) {
    return res.send(error);
  }
});

router.get("/all", async (req, res) => {
  var stepdetails = new Promise(async (resolve, reject) => {
    await connection.query("SELECT * FROM step", function (err, result, fields) {
      if (err) {
        return false;
      } else {
        return resolve(result);
      }
    });
  });
  const step_details = await stepdetails;
  return res.send(step_details);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const allsteps = new Promise(async (resolve, reject) => {
    const myquery = `SELECT * FROM step WHERE id=?`;
    connection.query(myquery, [id], (err, res) => {
      if (err) return resolve(false);
      return resolve(res);
    });
  });
  const allstep = await allsteps;
  return res.send(allstep);
});

router.post("/update/:id", async (req, res) => {
    const { id } = req.params
    connection.query('UPDATE step SET ? WHERE id = ?', [req.body, id], function (err, rows) {
        if (err) {
            return res.send(false)
        } else {
            return res.send(true)
        }
    })
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const allstep = new Promise(async (resolve, reject) => {
        const myquery = "DELETE FROM step WHERE id= ?"
        connection.query(myquery, [id], (err, res) => {
            if (err) return resolve(err.message)
            return resolve(true)
        })
    })
    return res.send(true)
})

module.exports = router;
