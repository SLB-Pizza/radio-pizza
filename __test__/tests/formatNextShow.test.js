import { expect } from "chai";
import { formatNextShow, formatDateTime } from "../../src/utils";

// beforeEach(() => {});

describe("formatNextShow", () => {
  it("returns true when the date of the next show IS the same as today's date", () => {
    let today = "2020-09-05T00:00:00+0000";
    let sameDayShowDate = { schedule_date: "2020-09-05" };
    expect(formatNextShow(sameDayShowDate, today)).to.be.true;
  });
  it("returns false when the date of the next show is NOT the same as today's date", () => {});
});
