const expect = require('chai').expect;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

before(async function() {
    await sleep(500);
});

it('should do a step at the root', function() {
    expect(1).to.equal(1);
});

describe('*** TEST #1 ***', function() {
    this.retries(2);

    beforeEach(async function() {
        await sleep(1000);
    });

    after(function() {
        let b = 1;
    });

    it('should test that 1 equals 1', async function() {
        await sleep(150);
        expect(1).to.equal(1);
    });
    it('should test that 2 equals 2', function() {
        expect(2).to.equal(2);
    });
    it('should test that 3 equals 3', function() {
        expect(3).to.equal(3);
    });
    it('should make a pending test');

    /*describe("inner describe1", function() {
        it("should do inner1.1");
        it("should do inner1.2", async function() {
            await sleep(120);
        });
    });
    describe("inner describe2", function() {
        it("should do inner2.1", function() {});
        it("should do inner2.2", function() {});
    });*/
});
