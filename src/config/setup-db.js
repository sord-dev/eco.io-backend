require("dotenv").config();
const fs = require('fs');

const { db } = require("./postgresdb.js");

const sql = fs.readFileSync(process.cwd() + '/src/config/setup.sql').toString();

db.query(sql)
    .then(data => {
        db.end();
        console.log("Set-up complete.");
    })
    .catch(error => console.log(error));