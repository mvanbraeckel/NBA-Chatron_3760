const assert = require('assert');
const { WitConnection } = require('../impl/wit');
const wit = new WitConnection();

describe('Wit', function() {
    // Test 1
    describe('Analyze a conversational question for a single player stat', function() {
        it('should detect the intent is playerSingleStat', async () => {
            const response = await wit.analyze("what is Lebron James' three point percentage?");
            const intent = wit.retrieveIntent(response);
            assert(intent === 'playerSingleStat');
        });
        it('should detect the name of the player', async () => {
            const response = await wit.analyze("what is Lebron James' three point percentage?");
            const contact = wit.retrieveFirstContactEntity(response).toLowerCase();
            assert(contact === 'lebron james');
        });
        it('should detect the stat as FG3_PCT', async () => {
            const response = await wit.analyze("what is Lebron James' three point percentage?");
            const stat = wit.retrieveStat(response);
            assert.strictEqual(stat, 'FG3_PCT');
        });
    });
    // Test 3
    describe('Analyze a conversational question that is out of context', function() {
        it('should return null for intent', async () => {
            const response = await wit.analyze('What is the volume of niagara falls?');
            const intent = wit.retrieveIntent(response);
            assert(intent === null);
        });
    });
});
