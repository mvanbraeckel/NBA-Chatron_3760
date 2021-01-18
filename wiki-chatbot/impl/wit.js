const {
    Wit //, log
} = require('node-wit');

var client = new Wit({
    accessToken: '7CC7EFU76WBWH3P5YAQTTMR4AMJNKSL3'
    // logger: new log.Logger(log.DEBUG) // optional
});

class WitConnection {
    async analyze(message) {
        return new Promise((resolve, reject) => {
            client.message(message, {})
                .then((data) => {
                    resolve(JSON.parse(JSON.stringify(data)));
                })
                .catch(console.error);
        });
    }

    /*
        Retrieves the intent with the highest confidence
    */
    retrieveIntent(message) {
        /*
        let confidence = -1;
        let intent = null;

        message.intents.forEach((int) => {
            if (int.confidence > confidence) {
                intent = int.name;
                confidence = int.confidence;
            }
        });
        */
        if (message.intents.length === 0) return null;
        return message.intents[0].name;
    }

    retrieveFirstContactEntity(message) {
        let playerName = message.entities['wit$contact:contact'][0].value;
        // remove 's from the name
        playerName = playerName.replace(/'s/, '');
        playerName = playerName.replace(/'/, '');
        return playerName;
    }

    retrieveStat(message) {
        return message.entities['stat:stat'][0].value;
    }
}

module.exports.WitConnection = WitConnection;
