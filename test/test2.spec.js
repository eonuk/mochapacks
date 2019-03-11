const expect = require('chai').expect;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('*** TEST #2 ***', function() {
    before(function() {
        let a = 1;
    });

    before(function() {
        let b = 1;
    });

    after(function() {
        let c = 1;
    });

    it('should do another step', function() {
        expect(10).to.equal(10);
    });
});
