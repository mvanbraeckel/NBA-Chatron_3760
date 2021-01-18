const assert = require('assert');
const { Player } = require('../impl/player');
const player = new Player();

describe('Player', function() {
    // Test 1
    describe('Get all stats for a non-existent player', function() {
        it('should respond with an string', async () => {
            const response = await player.getPlayerStats('s19', 'Donald Trump');
            assert(typeof response === 'string');
        });
        it('should respond with \'Player not found.\'', async () => {
            const response = await player.getPlayerStats('s19', 'Donald Trump');
            assert(response === 'Player Donald Trump not found.');
        });
    });
    // Test 2
    describe('Get all stats for player LeBron James', function() {
        it('should respond with an object', async () => {
            const response = await player.getPlayerStats('s19', 'LeBron James');
            assert.strictEqual(typeof response, 'string');
        });
        it('should respond with LeBron James', async () => {
            const response = await player.getPlayerStats('s19', 'LeBron James');
            assert(response.toLowerCase().includes('lebron james'));
        });
    });

    // Test 3
    describe('Get field goals attempted for a non-existent player', function() {
        it('should respond with an string', async () => {
            const response = await player.getPlayerSpecificStat('s19', 'Donald Trump', 'FGA');
            assert(typeof response === 'string');
        });
        it('should respond with \'Player not found.\'', async () => {
            const response = await player.getPlayerSpecificStat('s19', 'Donald Trump', 'FGA');
            assert(response === 'Player Donald Trump not found.');
        });
    });
    // Test 4
    describe('Get LeBron James\' field goals attempted', function() {
        it('should respond with an object', async () => {
            const response = await player.getPlayerSpecificStat('s19', 'LeBron James', 'FGA');
            assert(typeof response === 'string');
        });
        it('should respond with 1303 field goals attempted', async () => {
            const response = await player.getPlayerSpecificStat('s19', 'LeBron James', 'FGA');
            assert.strictEqual(response, 'Player LeBron James has 1303 FGA');
        });
    });

    // Test 5
    describe('Get highest field goals attempted', function() {
        it('should respond with an object', async () => {
            const response = await player.getStatHighestLowestPlayer('s19', 'FGA', 'DESC');
            assert.strictEqual(typeof response, 'string');
        });
        it('should respond with James Harden', async () => {
            const response = await player.getStatHighestLowestPlayer('s19', 'FGA', 'DESC');
            assert(response.toLowerCase().includes('james harden'));
        });
        it('should respond with 1514 field goals attempted', async () => {
            const response = await player.getStatHighestLowestPlayer('s19', 'FGA', 'DESC');
            assert.strictEqual(response, 'Player James Harden has the highest FGA at 1514');
        });
    });
    // Test 6
    describe('Get highest non-existent stat', function() {
        it('should respond with an Error', async () => {
            player.getStatHighestLowestPlayer('s19', 'non-existent', 'DESC')
                .catch((error) => assert(error instanceof Error));
        });
        it('should respond with James Harden', async () => {
            player.getStatHighestLowestPlayer('s19', 'non-existent', 'DESC')
                .catch((error) => assert(error.message === 'Stat non-existent not found.'));
        });
    });

    // Test 7
    describe('Get lowest field goals attempted', function() {
        it('should respond with an object', async () => {
            const response = await player.getStatHighestLowestPlayer('s19', 'FGA', 'ASC');
            assert.strictEqual(typeof response, 'string');
        });
        it('should respond with Jacob Evans', async () => {
            const response = await player.getStatHighestLowestPlayer('s19', 'FGA', 'ASC');
            assert(response.toLowerCase().includes('jacob evans'));
        });
        it('should respond with 1 field goals attempted', async () => {
            const response = await player.getStatHighestLowestPlayer('s19', 'FGA', 'ASC');
            assert.strictEqual(response, 'Player Jacob Evans has the lowest FGA at 1');
        });
    });
    // Test 8
    describe('Get lowest non-existent stat', function() {
        it('should respond with an Error', async () => {
            player.getStatHighestLowestPlayer('s19', 'non-existent', 'ASC')
                .catch((error) => assert(error instanceof Error));
        });
        it('should respond with James Harden', async () => {
            player.getStatHighestLowestPlayer('s19', 'non-existent', 'ASC')
                .catch((error) => assert(error.message === 'Stat non-existent not found.'));
        });
    });

    // Test 9
    describe('Attempt to call functions with bad input', function() {
        it('getPlayerStats should reject the promise', async () => {
            const response = async () => player.getPlayerStats('s20', 'LeBron James');
            assert.rejects(response);
        });
        it('getPlayerSingleStat should reject the promise', async () => {
            const response = async () => player.getPlayerSpecificStat('s19', 'FGA', 'LeBron James');
            assert.rejects(response);
        });
        it('getHighest should reject the promise', async () => {
            const response = async () => player.getStatHighestLowestPlayer('s20', 'FGA', 'DESC');
            assert.rejects(response);
        });
    });
});
