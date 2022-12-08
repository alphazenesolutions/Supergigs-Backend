const express = require("express");
const router = express.Router();
const connection = require("../../db/mysql");

router.post("/new", async (req, res) => {
  try {
    const myquery = "INSERT INTO testimoniallist SET ?";
    const create = new Promise(async (resolve, reject) => {
      await connection.query(myquery, req.body, (err, res) => {
        if (err) return resolve(err);
        return resolve(req.body);
      });
    });
    var alltestimoniallist = await create;
    return res.send(alltestimoniallist);
  } catch (error) {
    return res.send(error);
  }
});

router.get("/all", async (req, res) => {
  var testimoniallistdetails = new Promise(async (resolve, reject) => {
    await connection.query("SELECT * FROM testimoniallist", function (err, result, fields) {
      if (err) {
        return false;
      } else {
        return resolve(result);
      }
    });
  });
  const testimoniallist_details = await testimoniallistdetails;
  return res.send(testimoniallist_details);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const alltestimoniallists = new Promise(async (resolve, reject) => {
    const myquery = `SELECT * FROM testimoniallist WHERE id=?`;
    connection.query(myquery, [id], (err, res) => {
      if (err) return resolve(false);
      return resolve(res);
    });
  });
  const alltestimoniallist = await alltestimoniallists;
  return res.send(alltestimoniallist);
});

router.post("/update/:id", async (req, res) => {
    const { id } = req.params
    connection.query('UPDATE testimoniallist SET ? WHERE id = ?', [req.body, id], function (err, rows) {
        if (err) {
            return res.send(false)
        } else {
            return res.send(true)
        }
    })
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const alltestimoniallist = new Promise(async (resolve, reject) => {
        const myquery = "DELETE FROM testimoniallist WHERE id= ?"
        connection.query(myquery, [id], (err, res) => {
            if (err) return resolve(err.message)
            return resolve(true)
        })
    })
    return res.send(true)
})

module.exports = router;
