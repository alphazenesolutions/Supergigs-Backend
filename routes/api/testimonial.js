const express = require("express");
const router = express.Router();
const connection = require("../../db/mysql");

router.post("/new", async (req, res) => {
  try {
    const myquery = "INSERT INTO testimonial SET ?";
    const create = new Promise(async (resolve, reject) => {
      await connection.query(myquery, req.body, (err, res) => {
        if (err) return resolve(err);
        return resolve(req.body);
      });
    });
    var alltestimonial = await create;
    return res.send(alltestimonial);
  } catch (error) {
    return res.send(error);
  }
});

router.get("/all", async (req, res) => {
  var testimonialdetails = new Promise(async (resolve, reject) => {
    await connection.query("SELECT * FROM testimonial", function (err, result, fields) {
      if (err) {
        return false;
      } else {
        return resolve(result);
      }
    });
  });
  const testimonial_details = await testimonialdetails;
  return res.send(testimonial_details);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const alltestimonials = new Promise(async (resolve, reject) => {
    const myquery = `SELECT * FROM testimonial WHERE id=?`;
    connection.query(myquery, [id], (err, res) => {
      if (err) return resolve(false);
      return resolve(res);
    });
  });
  const alltestimonial = await alltestimonials;
  return res.send(alltestimonial);
});

router.post("/update/:id", async (req, res) => {
    const { id } = req.params
    connection.query('UPDATE testimonial SET ? WHERE id = ?', [req.body, id], function (err, rows) {
        if (err) {
            return res.send(false)
        } else {
            return res.send(true)
        }
    })
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const alltestimonial = new Promise(async (resolve, reject) => {
        const myquery = "DELETE FROM testimonial WHERE id= ?"
        connection.query(myquery, [id], (err, res) => {
            if (err) return resolve(err.message)
            return resolve(true)
        })
    })
    return res.send(true)
})

module.exports = router;
