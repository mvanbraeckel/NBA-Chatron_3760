const assert = require('assert');
const { Command } = require('../impl/command');
const command = new Command();

describe('Command', function() {
    // Test 1
    describe('/player Lebron James', function() {
        it('should return a string', async () => {
            const response = await command.analyze('/player LeBron James');
            assert(typeof response === 'string');
        });
    });
    // Test 2
    describe('/playerSingleStat STL James Harden', function() {
        it('should return a string', async () => {
            const response = await command.analyze('/playerSingleStat STL James Harden');
            assert(typeof response === 'string');
        });
        it('should return 125 STL', async () => {
            const response = await command.analyze('/playerSingleStat STL James Harden');
            assert(response === 'Player James Harden has 125 STL');
        });
    });
    // Test 2 - bad input
    describe('/playerSingleStat with bad input', function() {
        it('should reject the input', async () => {
            const response = () => command.analyze('/playerSingleStat James Harden STL');
            assert.rejects(response);
        });
    });
    // Test 3
    describe('/playerHighest STL', function() {
        it('should return a string', async () => {
            const response = await command.analyze('/playerHighest STL');
            assert(typeof response === 'string');
        });
        it('should return James Harden', async () => {
            const response = await command.analyze('/playerHighest STL');
            assert(response === 'Player James Harden has the highest STL at 125');
        });
    });
    // Test 3 - bad input
    describe('/playerHighest VOL', function() {
        it('should reject the input', async () => {
            const response = () => command.analyze('/playerHighest VOL');
            assert.rejects(response);
        });
    });
    // Test 4
    describe('/playerLowest STL', function() {
        it('should return a string', async () => {
            const response = await command.analyze('/playerLowest STL');
            assert.strictEqual(typeof response, 'string');
        });
        it('should return Udonis Haslem', async () => {
            const response = await command.analyze('/playerLowest STL');
            assert.strictEqual(response, 'Player Udonis Haslem has the lowest STL at 0');
        });
    });
    // Test 4 - bad input
    describe('/playerLowest VOL', function() {
        it('should reject the input', async () => {
            const response = () => command.analyze('/playerLowest VOL');
            assert.rejects(response);
        });
    });
    // Test 5 - /help
    describe('/help', function() {
        it('should return the help string', async () => {
            const help = '/player <playerName>: get all stats of given player  \n' +
                '/playerSingleStat <stat> <playerName>: get a single stat of a player  \n' +
                '/playerHighest <stat>: get the player with the highest value in the stat given  \n' +
                '/playerLowest <stat>: get the player with the lowest value in the stat given  \n' +
                'NOTE: use /helpStats to get stat mappings. \n';
            const response = await command.analyze('/help');
            assert(response === help);
        });
    });
    // Test 5 - /helpStats
    describe('/helpStats', function() {
        it('should return the help string', async () => {
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
            const response = await command.analyze('/helpStats');
            assert(response === helpStats);
        });
    });
    // bad input
    describe('attempt to analyze a non-command', function() {
        it('should reject the input', async () => {
            const response = () => command.analyze('#');
            assert.rejects(response);
        });
    });
});
