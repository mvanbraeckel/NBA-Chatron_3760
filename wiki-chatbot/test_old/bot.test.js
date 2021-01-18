const { TestAdapter, MessageFactory } = require('botbuilder');
const { Player } = require('../impl/player');

const adapter = new TestAdapter(async (context) => {
    if (context.activity.text === '_skip') return;
    const player = new Player();
    const response = await player.getPlayer(context.activity.text);
    if (typeof response === 'string') {
        await context.sendActivity(MessageFactory.text(response, response));
    } else {
        for (var key in response[0]) {
            const msg = key + ': ' + (response[0])[key];
            await context.sendActivity(MessageFactory.text(msg, msg));
        }
    }
});

// test echo
adapter.test('hi', 'Echo: hi')
    .then(() => {
        console.log('Bot test 1 passed.');
    });

// test not found
adapter.test('/player Kim Kardashian', 'Player Kim Kardashian not found.')
    .then(() => {
        console.log('Bot test 2 passed.');
    });

// test player
adapter.test('/player Lebron James', 'PLAYER_ID: 2544')
    .test('_skip', 'PLAYER_NAME: LeBron James')
    .test('_skip', 'TEAM_ABBREV: LAL')
    .test('_skip', 'AST: 684')
    .test('_skip', 'BLK: 36')
    .test('_skip', 'DREB: 459')
    .test('_skip', 'FG3A: 425')
    .test('_skip', 'FG3M: 148')
    .test('_skip', 'FG3_PCT: 0.348')
    .test('_skip', 'FGA: 1303')
    .test('_skip', 'FGM: 643')
    .test('_skip', 'FG_PCT: 0.493')
    .test('_skip', 'FTA: 381')
    .test('_skip', 'FTM: 264')
    .test('_skip', 'FT_PCT: 0.693')
    .test('_skip', 'GP: 67')
    .test('_skip', 'GS: 67')
    .test('_skip', 'MIN: 2316')
    .test('_skip', 'OREB: 66')
    .test('_skip', 'PF: 118')
    .test('_skip', 'PLAYER_AGE: 35')
    .test('_skip', 'PTS: 1698')
    .test('_skip', 'REB: 525')
    .test('_skip', 'STL: 78')
    .test('_skip', 'TOV: 261')
    .then(() => {
        console.log('Bot test 3 passed.');
    });
