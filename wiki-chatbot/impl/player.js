const { DBConnection } = require('./database');

class Player {
    /*
    * Function:  getPlayerCommand
    * --------------------
    * gets all the stats for the requested player
    *
    *   table: the table to look in when retrieving the player
    *   playerName: name of the player
    *
    *   returns: an array (rows from a database) with JSON object values
    *   [ {
    *       PLAYER_NAME='LeBron James',
    *       GP='119'
    *       ...
    *   } ]
    */
    async getPlayerStats(table, playerName) {
        return new Promise((resolve, reject) => {
            const db = new DBConnection();
            const query = `SELECT * FROM ${ table } WHERE PLAYER_NAME='${ playerName }';`;
            db.query(query)
                .then((response) => {
                    if (response.length > 0) {
                        let msg = '';
                        for (var stat in response[0]) {
                            msg += `${ stat } : ${ (response[0])[stat] }  \n`;
                        }
                        return resolve(msg);
                    } else resolve('Player ' + playerName + ' not found.');
                })
                .catch((error) => reject(error));
        });
    }

    /*
    * Function:  getPlayerSingleStatCommand
    * --------------------
    * gets the stat requested for the given player
    *
    *  table: the table to look in when retrieving the stat
    *  playerName: name of the player
    *  stat: stat requested
    *
    *  returns: an array (rows from a database) with JSON object values
    *   [ {
    *       PLAYER_NAME='LeBron James',
    *       GP='119'
    *   } ]
    */
    async getPlayerSpecificStat(table, playerName, stat) {
        return new Promise((resolve, reject) => {
            const db = new DBConnection();
            const query = `SELECT ${ stat } FROM ${ table } WHERE PLAYER_NAME='${ playerName }';`;
            db.query(query)
                .then((response) => {
                    if (response.length > 0) resolve(`Player ${ playerName } has ${ response[0][stat] } ${ stat.toUpperCase() }`);
                    else resolve('Player ' + playerName + ' not found.');
                })
                .catch(() => reject(Error('Stat passed is invalid.')));
        });
    }

    /*
    * Function:  getStatHighestLowestPlayer
    * --------------------
    * gets player with the highest value of stat given
    *
    *  table: the table to look in when retrieving the stat
    *  stat: stat given
    *  order: whether you want highest | lowest
    *
    *  returns: an array (rows from a database) with JSON object values
    *   [ {
    *       PLAYER_NAME='LeBron James',
    *       GP='119'
    *       ...
    *   } ]
    */
    async getStatHighestLowestPlayer(table, stat, order) {
        return new Promise((resolve, reject) => {
            const db = new DBConnection();
            const query = `SELECT PLAYER_NAME, ${ stat } FROM ${ table } ORDER BY ${ stat } ${ order };`;
            db.query(query)
                .then((response) => {
                    if (order === 'DESC') resolve(`Player ${ response[0].PLAYER_NAME } has the highest ${ stat } at ${ (response[0])[stat] }`);
                    else resolve(`Player ${ response[0].PLAYER_NAME } has the lowest ${ stat } at ${ (response[0])[stat] }`);
                })
                .catch(() => reject(Error('Stat passed is invalid.')));
        });
    }
}

module.exports.Player = Player;
