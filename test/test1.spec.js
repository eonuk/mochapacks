const expect = require('chai').expect;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('First test case @tag1 @tag2 $refCode1', function() {
    it('information', function() {
        // some information here
    });

    describe('scenario 1', function() {
        it('should test that 1 equals 1', async function() {
            await sleep(500);
            expect(1).to.equal(1);
        });
        it('should test that 2 equals 2', function() {
            expect(2).to.equal(2);
        });
        it('should test that 3 equals 3', function() {
            expect(3).to.equal(3);
        });
        //it('should make a pending test');
    });
});
