const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;
const pth = process.env.F_PATH || ".";
const app = express();

app.delete("/delete", (req, res) => {
  try {
    let file = pth + req.query.path;

    if (fs.existsSync(file)) {
      fs.unlink(file, (err) => {
        if (err) {
          throw err;
        }
      });
    }
    return res.json("succesfully deleted");
  } catch (err) {
    throw err;
  }
});

app.listen(5000, () => {
  console.log(`Working on port: ${PORT}`);
});
