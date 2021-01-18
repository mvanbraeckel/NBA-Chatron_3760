// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// index.js is used to setup and configure your bot

// Import required packages
const path = require('path');

// Note: Ensure you have a .env file
const ENV_FILE = path.join(__dirname, '.env');
require('dotenv').config({ path: ENV_FILE });

const restify = require('restify');

// /etc/letsencrypt/live/chatron.socs.uoguelph.ca/privkey.pem
// /etc/letsencrypt/live/chatron.socs.uoguelph.ca/fullchain.pem
const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 8080, () => {
    console.log(`\n${ server.name } listening to ${ server.url }`);
    console.log('\nTo access go to https://chatron.socs.uoguelph.ca/');
});

// Serve website
server.get('/*', restify.plugins.serveStatic({
    directory: './public',
    default: 'index.html'
}));

// Maintain a hash of all connected sockets
var sockets = {}; var nextSocketId = 0;
server.on('connection', function(socket) {
    // Add a newly connected socket
    var socketId = nextSocketId++;
    sockets[socketId] = socket;
    console.log('socket', socketId, 'opened');

    // Remove the socket when it closes
    socket.on('close', function() {
        console.log('socket', socketId, 'closed');
        delete sockets[socketId];
    });
});

// shutdown on CTRL+C detection
process.on('SIGINT', () => {
    console.log('\nDetected interrupt, shutting down gracefully.');
    server.close(function() {
        console.log('HTTPS_Server closed!');
    });
    for (var socketId in sockets) {
        console.log('socket', socketId, 'destroyed');
        sockets[socketId].destroy();
    }
    process.exit(0);
});

// === Create and use Bot ===

// Import required bot services.
// See https://aka.ms/bot-services to learn more about the different parts of a bot.
const { BotFrameworkAdapter } = require('botbuilder');

// This bot's main dialog.
const { Bot } = require('./bot');

// Create adapter.
// See https://aka.ms/about-bot-adapter to learn more about how bots work.
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Catch-all for errors.
const onTurnErrorHandler = async (context, error) => {
    // This check writes out errors to console log .vs. app insights.
    // NOTE: In production environment, you should consider logging this to Azure
    //       application insights.
    console.error(`\n [onTurnError] unhandled error: ${ error }`);

    // Send a trace activity, which will be displayed in Bot Framework Emulator
    await context.sendTraceActivity(
        'OnTurnError Trace',
        `${ error }`,
        'https://www.botframework.com/schemas/error',
        'TurnError'
    );

    // Send a message to the user
    await context.sendActivity('The bot encountered an error or bug.');
    await context.sendActivity('To continue to run this bot, please fix the bot source code.');
};

// Set the onTurnError for the singleton BotFrameworkAdapter.
adapter.onTurnError = onTurnErrorHandler;

// Create the main dialog.
const bot = new Bot();

// Listen for incoming requests.
server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        // Route to main dialog.
        await bot.run(context);
    });
});

// Listen for Upgrade requests for Streaming.
server.on('upgrade', (req, socket, head) => {
    // Create an adapter scoped to this WebSocket connection to allow storing session data.
    const streamingAdapter = new BotFrameworkAdapter({
        appId: process.env.MicrosoftAppId,
        appPassword: process.env.MicrosoftAppPassword
    });
    // Set onTurnError for the BotFrameworkAdapter created for each connection.
    streamingAdapter.onTurnError = onTurnErrorHandler;

    streamingAdapter.useWebSocket(req, socket, head, async (context) => {
        // After connecting via WebSocket, run this logic for every request sent over
        // the WebSocket connection.
        await bot.run(context);
    });
});
