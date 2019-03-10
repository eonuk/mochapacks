const expect = require("chai").expect;

before(function() {
    let x = 1;
});

it("should do a step at the root", function() {
    expect(1).to.equal(1);
});

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
        expect(3).to.equal(3);
    });
    it("should make a pending test");

    describe("inner describe1", function() {
        it("should do inner1.1");
        it("should do inner1.2", function() {});
    });
    describe("inner describe2", function() {
        it("should do inner2.1", function() {});
        it("should do inner2.2", function() {});
    });
});

describe("test2", function() {
    before(function() {
        let a = 1;
    });

    before(function() {
        let b = 1;
    });

    after(function() {
        let c = 1;
    });

    it("should do another step", function() {
        expect(10).to.equal(10);
    });
});
