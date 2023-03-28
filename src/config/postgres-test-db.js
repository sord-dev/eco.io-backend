const fs = require('fs')

// creating test database
const { Pool } = require('pg');
// initialising test database with test db url
let testdb = new Pool({
    connectionString: "postgres://ixcaudug:VDR2bn6KlbHgKwI6TmRAvAMmZESR5VIJ@trumpet.db.elephantsql.com/ixcaudug"
});

// seeding database with the testing data
const sql = fs.readFileSync(process.cwd() + '/src/config/setup.sql').toString();
testdb.query(sql)
    .then(data => {
        testdb.end();
        console.log("Set-up complete.");
    })
    .catch(error => console.log(error));

module.exports = testdb;