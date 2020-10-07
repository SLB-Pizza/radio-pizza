import { expect } from "chai";
import { nullDataCheck } from "../../src/utils";

describe("nullDataCheck", () => {
  describe("should return false", () => {
    it("when passed nothing", () => {
      expect(nullDataCheck()).to.be.false;
    });

    it("when passed an empty array ", () => {
      expect(nullDataCheck([])).to.be.false;
    });

    it("when passed an empty object", () => {
      expect(nullDataCheck({})).to.be.false;
    });

    it("when passed an array with multiple empty objects", () => {
      expect(nullDataCheck([{}, {}, {}])).to.be.false;
    });

    it("when passed an array where the first object has a non-null key-value pair", () => {
      expect(
        nullDataCheck([
          {
            sample_field: "Lamprotornis superbus",
          },
          {
            sample_field: null,
          },
        ])
      ).to.be.false;
    });

    it("when passed an array where the first object has a null key-value pair", () => {
      expect(
        nullDataCheck([
          {
            sample_field: null,
          },
          {
            sample_field: "Lamprotornis superbus",
          },
        ])
      ).to.be.false;
    });
  });

  describe("should return true", () => {
    it("when passed an array containing only one object that has a key with a value of null", () => {
      expect(nullDataCheck([{ key_title: null }])).to.be.true;
    });
  });
});
