const sql = require('mysql');

class DBConnection {
    /*
    * Function:  query
    * --------------------
    * execute a query on the database
    *
    *  query: formatted SQL query to execute on the database
    *
    *  returns: an array (rows from a database) with JSON object values
    *   [ {
    *       PLAYER_ID=2544,
    *       PLAYER_NAME='LeBron James',
    *       GP='119'
    *       ...
    *   } ]
    */
    async query(query) {
        return new Promise((resolve, reject) => {
            const connection = sql.createConnection({
                host: 'chatron.socs.uoguelph.ca',
                user: 'sysadmin',
                password: 'SublimeVarnish',
                database: 'NBA'
            });

            connection.query(query, (err, result, fields) => {
                connection.end(); // close connection after call
                if (err) return reject(err);
                return resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    }
}

module.exports.DBConnection = DBConnection;
