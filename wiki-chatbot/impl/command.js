const { Player } = require('./player');

class Command {
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
    async analyze(request) {
        return new Promise((resolve, reject) => {
            // player query class
            const player = new Player();

            // parse the command
            const res = request.split(' ');
            const command = res[0];

            // look at the command entered, and get the stat desired
            switch (command) {
            case '/player': { // USAGE: /player <playerName>, RETURNS all stats of given player
                res.shift();
                const playerName = res.join(' ');
                player.getPlayerStats('s19', playerName)
                    .then((response) => resolve(response))
                    .catch((error) => reject(error));
                return;
            }

            case '/playerSingleStat': { // USAGE: /playerSingleStat <stat> <playerName>, RETURNS stat requested
                const stat = res[1];
                res.shift();
                res.shift();
                const playerName = res.join(' ');
                player.getPlayerSpecificStat('s19', playerName, stat)
                    .then((response) => resolve(response))
                    .catch((error) => reject(error));
                return;
            }

            case '/playerHighest': { // USAGE: /playerHighest <stat>, RETURNS: player with the highest stat value
                res.shift();
                const stat = res.join(' ');
                player.getStatHighestLowestPlayer('s19', stat, 'DESC')
                    .then((response) => resolve(response))
                    .catch((error) => reject(error));
                return;
            }

            case '/playerLowest': { // USAGE: /playerLowest <stat>, RETURNS: player with the lowest stat value
                res.shift();
                const stat = res.join(' ');
                player.getStatHighestLowestPlayer('s19', stat, 'ASC')
                    .then((response) => resolve(response))
                    .catch((error) => reject(error));
                return;
            }

            case '/help': {
                const help = '/player <playerName>: get all stats of given player  \n' +
                '/playerSingleStat <stat> <playerName>: get a single stat of a player  \n' +
                '/playerHighest <stat>: get the player with the highest value in the stat given  \n' +
                '/playerLowest <stat>: get the player with the lowest value in the stat given  \n' +
                'NOTE: use /helpStats to get stat mappings. \n';
                return resolve(help);
            }

            case '/helpStats': {
                const helpStats = 'AST = Assists  \n' +
                'BLK = Blocks  \n' +
                'DREB = Defensive Rebounds  \n' +
                'FG3A = 3-point field goals attempted  \n' +
                'FG3M = 3-point field goals made  \n' +
                'FG3_PCT = 3-point field goals percent  \n' +
                'FGA = field goals attempted  \n' +
                'FGM = field goals made  \n' +
                'FG_PCT = field goals percent  \n' +
                'FTA = free throws attempted  \n' +
                'FTM = free throws made  \n' +
                'FT_PCT = free throws percent  \n' +
                'GP = games played  \n' +
                'GS = games started  \n' +
                'MIN = minutes played  \n' +
                'OREB = offensive rebounds  \n' +
                'PF = personal fouls  \n' +
                'PLAYER_AGE = player age  \n' +
                'PTS = points scored  \n' +
                'REB = rebounds  \n' +
                'STL = steals  \n' +
                'TOV = turnovers  \n';
                return resolve(helpStats);
            }

            default: { // echo it back, replace this with wit.analyze
                const replyText = 'Command not found, type /help to see available commands.';
                return resolve(replyText);
            }
            }
        });
    }
}

module.exports.Command = Command;
