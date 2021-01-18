const { WitConnection } = require('./wit');
const { Player } = require('./player');

class NLP {
    /*
    * Function:  analyze
    * --------------------
    * analyzes a conversational query
    *
    *   message: the message sent by the user to the bot
    *
    *   returns: an array (rows from a database) with JSON object values
    *   [ {
    *       PLAYER_NAME='LeBron James',
    *       GP='119'
    *       ...
    *   } ]
    */
    async analyze(message) {
        return new Promise((resolve, reject) => {
            const wit = new WitConnection();
            const player = new Player();
            wit.analyze(message)
                .then((response) => {
                    // check the intent of the message
                    const intent = wit.retrieveIntent(response);
                    let playerName = '';

                    // look at the command entered, and get the stat desired
                    switch (intent) {
                    case 'playerAllStats': { // USAGE: /player <playerName>, RETURNS all stats of given player
                        playerName = wit.retrieveFirstContactEntity(response);
                        player.getPlayerStats('s19', playerName)
                            .then((response) => resolve(response))
                            .catch((error) => reject(error));
                        return;
                    }

                    case 'playerSingleStat': { // USAGE: /playerSingleStat <stat> <playerName>, RETURNS stat requested
                        playerName = wit.retrieveFirstContactEntity(response);
                        const stat = wit.retrieveStat(response);
                        player.getPlayerSpecificStat('s19', playerName, stat)
                            .then((response) => resolve(response))
                            .catch((error) => reject(error));
                        return;
                    }

                    case 'playerHighest': { // USAGE: /playerHighest <stat>, RETURNS: player with the highest stat value
                        const stat = wit.retrieveStat(response);
                        player.getStatHighestLowestPlayer('s19', stat, 'DESC')
                            .then((response) => resolve(response))
                            .catch((error) => reject(error));
                        return;
                    }

                    case 'playerLowest': { // USAGE: /playerLowest <stat>, RETURNS: player with the lowest stat value
                        const stat = wit.retrieveStat(response);
                        player.getStatHighestLowestPlayer('s19', stat, 'ASC')
                            .then((response) => resolve(response))
                            .catch((error) => reject(error));
                        return;
                    }

                    default: { // echo it back, replace this with wit.analyze
                        const replyText = 'I\'m sorry, I didn\'t understand that message.';
                        return resolve(replyText);
                    }
                    }
                })
                .catch((error) => reject(error));
        });
    }
}

module.exports.NLP = NLP;
