// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory } = require('botbuilder');
// const NBA = require('nba');
const { Command } = require('./impl/command');
const { NLP } = require('./impl/nlp');

class Bot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            // remove @ and #
            let message = context.activity.text;
            message = message.replace(/@[a-zA-Z0-9]*/g, '');
            message = message.replace(/#[a-zA-Z0-9]*/g, '');
            message = message.replace(/  +/g, ' ');
            message = message.trim();

            // if the message was a command message
            if (message.charAt(0) === '/') {
                const command = new Command();
                try {
                    const replyText = await command.analyze(message);
                    await context.sendActivity(MessageFactory.text(replyText));
                } catch (error) {
                    await context.sendActivity(MessageFactory.text(error.message));
                }
            } else { // the message was not a command
                const nlp = new NLP();
                try {
                    const replyText = await nlp.analyze(message);
                    await context.sendActivity(MessageFactory.text(replyText));
                } catch (error) {
                    await context.sendActivity(MessageFactory.text(error.message));
                }
            }
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome!';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.Bot = Bot;
