const expect = require("chai").expect;

describe("test1", function() {
    this.retries(2);

    before(function() {
        let a = 1;
    });

    after(function() {
        let b = 1;
    });

    it("should test that 1 equals 1", function() {
        expect(1).to.equal(1);
    });
    it("should test that 2 equals 2", function() {
        expect(2).to.equal(2);
    });
    it("should test that 3 equals 3", function() {
        expect(1).to.equal(3);
    });
    it("should make a pending test");
});
