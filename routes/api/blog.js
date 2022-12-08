const express = require("express");
const router = express.Router();
const connection = require("../../db/mysql");

router.post("/new", async (req, res) => {
  try {
    const myquery = "INSERT INTO blog SET ?";
    const create = new Promise(async (resolve, reject) => {
      await connection.query(myquery, req.body, (err, res) => {
        if (err) return resolve(err);
        return resolve(req.body);
      });
    });
    var allblog = await create;
    return res.send(allblog);
  } catch (error) {
    return res.send(error);
  }
});

router.get("/all", async (req, res) => {
  var blogdetails = new Promise(async (resolve, reject) => {
    await connection.query("SELECT * FROM blog", function (err, result, fields) {
      if (err) {
        return false;
      } else {
        return resolve(result);
      }
    });
  });
  const blog_details = await blogdetails;
  return res.send(blog_details);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const allblogs = new Promise(async (resolve, reject) => {
    const myquery = `SELECT * FROM blog WHERE id=?`;
    connection.query(myquery, [id], (err, res) => {
      if (err) return resolve(false);
      return resolve(res);
    });
  });
  const allblog = await allblogs;
  return res.send(allblog);
});

router.post("/update/:id", async (req, res) => {
    const { id } = req.params
    connection.query('UPDATE blog SET ? WHERE id = ?', [req.body, id], function (err, rows) {
        if (err) {
            return res.send(false)
        } else {
            return res.send(true)
        }
    })
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const allblog = new Promise(async (resolve, reject) => {
        const myquery = "DELETE FROM blog WHERE id= ?"
        connection.query(myquery, [id], (err, res) => {
            if (err) return resolve(err.message)
            return resolve(true)
        })
    })
    return res.send(true)
})

module.exports = router;
