const expect = require('chai').expect;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('Second test case @tag2 @tag3 $refcode2', function() {
    it('information', function() {
        // some information here
    });

    describe('scenario 1', function() {
        it('should do another first step', async function() {
            expect(10).to.equal(10);
        });

        it('should do another first step', function() {
            expect(10).to.equal(11);
        });
    });

    describe('scenario 2', function() {
        it('should do another first step', async function() {
            expect(10).to.equal(10);
        });

        it('should do another first step', function() {
            expect(10).to.equal(10);
        });

        describe('subpart', function() {
            it('should do another first step', async function() {
                expect(10).to.equal(10);
            });

            it('should do another first step', function() {
                expect(10).to.equal(10);
            });
        });
    });
});
