import { expect } from "chai";
import { mappableDataCheck } from "../../src/utils";

describe("mappableDataCheck", () => {
  // Immediate rejection
  describe("returns -1", () => {
    it("when passed nothing", () => {
      expect(mappableDataCheck()).to.equal(-1);
    });

    it("when passed an empty array ", () => {
      expect(mappableDataCheck([])).to.equal(-1);
    });

    it("when passed an empty object", () => {
      expect(mappableDataCheck({})).to.equal(-1);
    });
  });

  // Is an array, but wrong contents
  describe("returns an empty array when all entries are invalid", () => {
    it("when passed an array with a nested array within", () => {
      expect(mappableDataCheck([[]])).to.eql([]);
    });

    it("when passed an array containing one empty object", () => {
      expect(mappableDataCheck([{}])).to.eql([]);
    });

    it("when passed an array with multiple empty objects", () => {
      expect(mappableDataCheck([{}, {}, {}])).to.eql([]);
    });

    it("when passed an array with an object containing a null key-value pair", () => {
      let nullKeyValue = [{ sample_field: null }];
      expect(mappableDataCheck(nullKeyValue)).to.eql([]);
    });

    it("when passed an array with one object containing multiple key-value pairs", () => {
      let hasObjectWithMultipleKeys = [
        {
          type: "paragraph",
          text: "",
          spans: [],
        },
      ];

      expect(mappableDataCheck(hasObjectWithMultipleKeys)).to.eql([]);
    });

    it("when passed an array with multiple objects, each containing a null key-value pair", () => {
      let allNullKeyValues = [
        { sample_field: null },
        { sample_field: null },
        { sample_field: null },
        { sample_field: null },
        { sample_field: null },
      ];
      expect(mappableDataCheck(allNullKeyValues)).to.eql([]);
    });
  });

  describe("returns an array only containing valid key-value pairs", () => {
    it("when passed an array with a single valid entry", () => {
      let oneValidEntry = [
        {
          resident_mix: {
            __typename: "PRISMIC_Mix",
            _meta: {
              tags: ["prog rock", "post rock", "instrumental", "math rock"],
              uid: "dev-moon-album",
              type: "mix",
            },
            mix_image: {
              dimensions: {
                width: 700,
                height: 700,
              },
              alt: "Digital moon",
              copyright: null,
              url:
                "https://images.prismic.io/hmbk-cms/0bada19d-6533-4bd1-a587-25e58b093704_wallhaven-g8qy13.jpg?auto=compress,format&rect=93,0,1080,1080&w=700&h=700",
              medium: {
                dimensions: {
                  width: 500,
                  height: 500,
                },
                alt: "Digital moon",
                copyright: null,
                url:
                  "https://images.prismic.io/hmbk-cms/0bada19d-6533-4bd1-a587-25e58b093704_wallhaven-g8qy13.jpg?auto=compress,format&rect=748,0,1080,1080&w=500&h=500",
              },
              now_playing: {
                dimensions: {
                  width: 96,
                  height: 96,
                },
                alt: "Digital moon",
                copyright: null,
                url:
                  "https://images.prismic.io/hmbk-cms/0bada19d-6533-4bd1-a587-25e58b093704_wallhaven-g8qy13.jpg?auto=compress,format&rect=416,0,1080,1080&w=96&h=96",
              },
            },
            mix_title: null,
            mix_link: "https://www.youtube.com/watch?v=Q9XTqQbuavI",
            mix_date: "2020-08-02",
            featured_residents: [
              {
                mix_resident: {
                  __typename: "PRISMIC_Resident",
                  resident_name: "Jardin de la Croix",
                  _meta: {
                    uid: "dev-resident-jardin-de-la-croix",
                    type: "resident",
                  },
                },
              },
              {
                mix_resident: {
                  __typename: "PRISMIC_Resident",
                  resident_name: "Infected Mushroom",
                  _meta: {
                    uid: "dev-resident-infected-mushroom",
                    type: "resident",
                  },
                },
              },
            ],
          },
        },
      ];

      expect(mappableDataCheck(oneValidEntry)).to.eql(oneValidEntry);
    });

    it("when passed an array where the first object has a null key-value pair", () => {
      let firstKeyValuePairNull = [
        {
          sample_field: null,
        },
        {
          resident_event: {
            __typename: "PRISMIC_Event",
            _meta: {
              uid: "dev-event-edc-las-vegas",
              type: "event",
            },
          },
        },
      ];

      expect(mappableDataCheck(firstKeyValuePairNull)).to.eql([
        {
          resident_event: {
            __typename: "PRISMIC_Event",
            _meta: {
              uid: "dev-event-edc-las-vegas",
              type: "event",
            },
          },
        },
      ]);
    });

    it("when passed an array where the last object has a null key-value pair", () => {
      let lastKeyValuePairNull = [
        {
          resident_image: {
            dimensions: {
              width: 900,
              height: 506,
            },
            alt: "DJ Freedem",
            copyright: null,
            url:
              "https://images.prismic.io/hmbk-cms/4669971b-35ff-41ee-bddf-469d6bc515d6_1295420.jpg?auto=compress,format",
          },
        },
        {
          sample_field: null,
        },
      ];

      expect(mappableDataCheck(lastKeyValuePairNull)).to.eql([
        {
          resident_image: {
            dimensions: {
              width: 900,
              height: 506,
            },
            alt: "DJ Freedem",
            copyright: null,
            url:
              "https://images.prismic.io/hmbk-cms/4669971b-35ff-41ee-bddf-469d6bc515d6_1295420.jpg?auto=compress,format",
          },
        },
      ]);
    });

    it("when passed an array with multiple objects containing a null key-value pair", () => {
      let validEntriesTotal = Math.ceil(Math.random() * 10);
      let invalidEntriesTotal = Math.ceil(Math.random() * 10);

      let nullEntry = { is_null: null };
      let validEntry = {
        not_null: {
          sub_key: "value",
        },
      };

      const arrayMaker = () => {
        let validCount = 0;
        let invalidCount = 0;
        let mixedArray = [];

        while (mixedArray.length !== validEntriesTotal + invalidEntriesTotal) {
          if (validCount === validEntriesTotal) {
            mixedArray.push(nullEntry);
            invalidCount++;
          } else if (invalidCount === invalidEntriesTotal) {
            mixedArray.push(validEntry);
            validCount++;
          } else {
            let validOrInvalid = Math.ceil(Math.random() * 2);

            if (validOrInvalid === 1) {
              mixedArray.push(nullEntry);
              invalidCount++;
            } else {
              mixedArray.push(validEntry);
              validCount++;
            }
          }
        }
        return mixedArray;
      };

      let testArray = arrayMaker();

      // Create an array with validEntries # empty slots and fill each slot with valid entry
      let arrayMatch = Array(validEntriesTotal).fill(validEntry);

      expect(mappableDataCheck(testArray)).to.eql(arrayMatch);
    });
  });
});
