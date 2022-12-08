const express = require("express");
const router = express.Router();
const connection = require("../../db/mysql");

router.post("/new", async (req, res) => {
  try {
    const myquery = "INSERT INTO bloglist SET ?";
    const create = new Promise(async (resolve, reject) => {
      await connection.query(myquery, req.body, (err, res) => {
        if (err) return resolve(err);
        return resolve(req.body);
      });
    });
    var allbloglist = await create;
    return res.send(allbloglist);
  } catch (error) {
    return res.send(error);
  }
});

router.get("/all", async (req, res) => {
  var bloglistdetails = new Promise(async (resolve, reject) => {
    await connection.query("SELECT * FROM bloglist", function (err, result, fields) {
      if (err) {
        return false;
      } else {
        return resolve(result);
      }
    });
  });
  const bloglist_details = await bloglistdetails;
  return res.send(bloglist_details);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const allbloglists = new Promise(async (resolve, reject) => {
    const myquery = `SELECT * FROM bloglist WHERE id=?`;
    connection.query(myquery, [id], (err, res) => {
      if (err) return resolve(false);
      return resolve(res);
    });
  });
  const allbloglist = await allbloglists;
  return res.send(allbloglist);
});

router.post("/update/:id", async (req, res) => {
    const { id } = req.params
    connection.query('UPDATE bloglist SET ? WHERE id = ?', [req.body, id], function (err, rows) {
        if (err) {
            return res.send(false)
        } else {
            return res.send(true)
        }
    })
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const allbloglist = new Promise(async (resolve, reject) => {
        const myquery = "DELETE FROM bloglist WHERE id= ?"
        connection.query(myquery, [id], (err, res) => {
            if (err) return resolve(err.message)
            return resolve(true)
        })
    })
    return res.send(true)
})

module.exports = router;
