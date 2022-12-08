const express = require("express");
const router = express.Router();
const connection = require("../../db/mysql");

router.post("/new", async (req, res) => {
  try {
    const myquery = "INSERT INTO slider SET ?";
    const create = new Promise(async (resolve, reject) => {
      await connection.query(myquery, req.body, (err, res) => {
        if (err) return resolve(err);
        return resolve(req.body);
      });
    });
    var allslider = await create;
    return res.send(allslider);
  } catch (error) {
    return res.send(error);
  }
});

router.get("/all", async (req, res) => {
  var sliderdetails = new Promise(async (resolve, reject) => {
    await connection.query("SELECT * FROM slider", function (err, result, fields) {
      if (err) {
        return false;
      } else {
        return resolve(result);
      }
    });
  });
  const slider_details = await sliderdetails;
  return res.send(slider_details);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const allsliders = new Promise(async (resolve, reject) => {
    const myquery = `SELECT * FROM slider WHERE id=?`;
    connection.query(myquery, [id], (err, res) => {
      if (err) return resolve(false);
      return resolve(res);
    });
  });
  const allslider = await allsliders;
  return res.send(allslider);
});

router.post("/update/:id", async (req, res) => {
    const { id } = req.params
    connection.query('UPDATE slider SET ? WHERE id = ?', [req.body, id], function (err, rows) {
        if (err) {
            return res.send(false)
        } else {
            return res.send(true)
        }
    })
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const allslider = new Promise(async (resolve, reject) => {
        const myquery = "DELETE FROM slider WHERE id= ?"
        connection.query(myquery, [id], (err, res) => {
            if (err) return resolve(err.message)
            return resolve(true)
        })
    })
    return res.send(true)
})

module.exports = router;
