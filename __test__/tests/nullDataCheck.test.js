import { expect } from "chai";
import { nullDataCheck } from "../../src/utils";

// beforeEach(() => {});

describe("nullDataCheck", () => {
  describe("should return false", () => {
    it("when presented with an empty array ", () => {
      expect(nullDataCheck([])).to.be.false;
    });
    it("when presented with an empty object", () => {
      expect(nullDataCheck({})).to.be.false;
    });
    it("when presented with nothing", () => {
      expect(nullDataCheck()).to.be.false;
    });
  });

  // describe("should return true", () => {
  //   it("when presented with an empty array ", () => {
  //     expect(nullDataCheck([])).to.be.false;
  //   });
  // });
});
