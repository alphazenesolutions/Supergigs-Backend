const express = require("express");
const router = express.Router();
const connection = require("../../db/mysql");

router.post("/new", async (req, res) => {
  try {
    const myquery = "INSERT INTO session1 SET ?";
    const create = new Promise(async (resolve, reject) => {
      await connection.query(myquery, req.body, (err, res) => {
        if (err) return resolve(err);
        return resolve(req.body);
      });
    });
    var allsession1 = await create;
    return res.send(allsession1);
  } catch (error) {
    return res.send(error);
  }
});

router.get("/all", async (req, res) => {
  var session1details = new Promise(async (resolve, reject) => {
    await connection.query("SELECT * FROM session1", function (err, result, fields) {
      if (err) {
        return false;
      } else {
        return resolve(result);
      }
    });
  });
  const session1_details = await session1details;
  return res.send(session1_details);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const allsessions1 = new Promise(async (resolve, reject) => {
    const myquery = `SELECT * FROM session1 WHERE id=?`;
    connection.query(myquery, [id], (err, res) => {
      if (err) return resolve(false);
      return resolve(res);
    });
  });
  const allsession1 = await allsessions1;
  return res.send(allsession1);
});

router.post("/update/:id", async (req, res) => {
    const { id } = req.params
    connection.query('UPDATE session1 SET ? WHERE id = ?', [req.body, id], function (err, rows) {
        if (err) {
            return res.send(false)
        } else {
            return res.send(true)
        }
    })
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const allsession1 = new Promise(async (resolve, reject) => {
        const myquery = "DELETE FROM session1 WHERE id= ?"
        connection.query(myquery, [id], (err, res) => {
            if (err) return resolve(err.message)
            return resolve(true)
        })
    })
    return res.send(true)
})

module.exports = router;
