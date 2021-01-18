const assert = require('assert');
const { DBConnection } = require('../impl/database');
var db = new DBConnection();

describe('Database', function() {
    // Test 1
    describe('Find player Kim Kardashian', function() {
        it('should respond with zero rows found', async () => {
            const response = await db.query('SELECT * from s19 WHERE PLAYER_NAME=\'Kim Kardashian\'');
            assert(response.length === 0);
        });
    });
    // Test 2
    describe('Find player Lebron James', function() {
        it('should respond with an object of length > 0', async () => {
            const response = await db.query('SELECT * from s19 WHERE PLAYER_NAME=\'Lebron James\'');
            assert(response.length > 0);
        });
        it('should respond with Lebron James\' stats', async () => {
            const response = await db.query('SELECT * from s19 WHERE PLAYER_NAME=\'Lebron James\'');
            assert(response[0].PLAYER_NAME === 'LeBron James');
        });
    });
    // Test 3
    describe('Find non-existent stat', function() {
        it('should respond a rejection', async () => {
            const response = async () => db.query('SELECT nonExistentStat from s19 WHERE PLAYER_NAME=\'Lebron James\'');
            assert.rejects(response);
        });
    });
});
