const express = require("express");
const router = express.Router();
const connection = require("../../db/mysql");

router.post("/new", async (req, res) => {
  try {
    const myquery = "INSERT INTO blogname SET ?";
    const create = new Promise(async (resolve, reject) => {
      await connection.query(myquery, req.body, (err, res) => {
        if (err) return resolve(err);
        return resolve(req.body);
      });
    });
    var allblogname = await create;
    return res.send(allblogname);
  } catch (error) {
    return res.send(error);
  }
});

router.get("/all", async (req, res) => {
  var blognamedetails = new Promise(async (resolve, reject) => {
    await connection.query("SELECT * FROM blogname", function (err, result, fields) {
      if (err) {
        return false;
      } else {
        return resolve(result);
      }
    });
  });
  const blogname_details = await blognamedetails;
  return res.send(blogname_details);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const allblognames = new Promise(async (resolve, reject) => {
    const myquery = `SELECT * FROM blogname WHERE id=?`;
    connection.query(myquery, [id], (err, res) => {
      if (err) return resolve(false);
      return resolve(res);
    });
  });
  const allblogname = await allblognames;
  return res.send(allblogname);
});

router.post("/update/:id", async (req, res) => {
    const { id } = req.params
    connection.query('UPDATE blogname SET ? WHERE id = ?', [req.body, id], function (err, rows) {
        if (err) {
            return res.send(false)
        } else {
            return res.send(true)
        }
    })
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const allblogname = new Promise(async (resolve, reject) => {
        const myquery = "DELETE FROM blogname WHERE id= ?"
        connection.query(myquery, [id], (err, res) => {
            if (err) return resolve(err.message)
            return resolve(true)
        })
    })
    return res.send(true)
})

module.exports = router;
