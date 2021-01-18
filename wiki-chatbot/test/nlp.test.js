const assert = require('assert');
const { NLP } = require('../impl/nlp');
const nlp = new NLP();

describe('NLP', function() {
    // Test 1
    describe('Send a converstional message that wouldn\'t be recognized', function() {
        it('should return a string', async () => {
            const response = await nlp.analyze("what's the weather like in Istanbul today?");
            assert.strictEqual(typeof response, 'string');
        });
        it('should clarify that the message was not understood', async () => {
            const response = await nlp.analyze("what's the weather like in Istanbul today?");
            assert.strictEqual(response, 'I\'m sorry, I didn\'t understand that message.');
        });
    });
    // Test 2
    describe('Analyze a conversational question for all stats for James Harden', function() {
        it('should return a string', async () => {
            const response = await nlp.analyze("what are James Harden's stats?");
            assert.strictEqual(typeof response, 'string');
        });
        it('should detect that the player was lebron james', async () => {
            const response = await nlp.analyze("what are James Harden's stats?");
            assert(response.toLowerCase().includes('james harden'));
        });
    });
    // Test 3
    describe('Analyze a conversational question for all stats for Lebron James', function() {
        it('should return a string', async () => {
            const response = await nlp.analyze("what are Lebron James' stats?");
            assert(typeof response === 'string');
        });
        it('should detect that the player was lebron james', async () => {
            const response = await nlp.analyze("what are Lebron James' stats?");
            assert(response.toLowerCase().includes('lebron james'));
        });
        it('should return the stats for lebron james', async () => {
            const response = await nlp.analyze("what are Lebron James' stats?");
            const expected = 'PLAYER_ID : 2544  \n' +
                            'PLAYER_NAME : LeBron James  \n' +
                            'TEAM_ABBREV : LAL  \n' +
                            'AST : 684  \n' +
                            'BLK : 36  \n' +
                            'DREB : 459  \n' +
                            'FG3A : 425  \n' +
                            'FG3M : 148  \n' +
                            'FG3_PCT : 0.348  \n' +
                            'FGA : 1303  \n' +
                            'FGM : 643  \n' +
                            'FG_PCT : 0.493  \n' +
                            'FTA : 381  \n' +
                            'FTM : 264  \n' +
                            'FT_PCT : 0.693  \n' +
                            'GP : 67  \n' +
                            'GS : 67  \n' +
                            'MIN : 2316  \n' +
                            'OREB : 66  \n' +
                            'PF : 118  \n' +
                            'PLAYER_AGE : 35  \n' +
                            'PTS : 1698  \n' +
                            'REB : 525  \n' +
                            'STL : 78  \n' +
                            'TOV : 261  \n';
            assert.strictEqual(response, expected);
        });
    });
    // Test 3
    describe('Analyze a conversational question for James Harden\'s singular stat', function() {
        it('should return a string', async () => {
            const response = await nlp.analyze('How many points did James Harden score?');
            assert(typeof response === 'string');
        });
        it('should detect that the player was James Harden', async () => {
            const response = await nlp.analyze('How many points did James Harden score?');
            assert(response.toLowerCase().includes('james harden'));
        });
        it('should return james harden\'s points scored', async () => {
            const response = await nlp.analyze('How many points did James Harden score?');
            assert.strictEqual(response, 'Player James Harden has 2335 PTS');
        });
        it('should fail when an incorrect stat is passed', async () => {
            const response = async () => await nlp.analyze("What is Kyle Lowry's four point percentage?");
            assert.rejects(response);
        });
    });
    // Test 4
    describe('Analyze a conversational question for highest stat', function() {
        it('should return a string', async () => {
            const response = await nlp.analyze('Who has the most offensive rebounds?');
            assert.strictEqual(typeof response, 'string');
        });
        it('should return Hassan Whiteside', async () => {
            const response = await nlp.analyze('Who has the most offensive rebounds?');
            assert(response.toLowerCase().includes('hassan whiteside'));
        });
        it('should fail when an incorrect stat is passed', async () => {
            const response = async () => await nlp.analyze('Who has the highest four point percentage?');
            assert.rejects(response);
        });
    });
    // Test 5
    describe('Analyze a conversational question for lowest stat', function() {
        it('should return a string', async () => {
            const response = await nlp.analyze('Who has the least minutes played?');
            assert(typeof response === 'string');
        });
        it('should return Hassan Whiteside', async () => {
            const response = await nlp.analyze('Who has the least minutes played?');
            assert(response.toLowerCase().includes('jacob evans'));
        });
        it('should fail when an incorrect stat is passed', async () => {
            const response = async () => await nlp.analyze('Who has the lowest four point percentage?');
            assert.rejects(response);
        });
    });
});
