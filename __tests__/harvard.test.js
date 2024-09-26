const axios = require("axios");
const axiosMockAdapter = require("axios-mock-adapter");
const { getHarvardArts } = require("../harvard-api");

const mock = new axiosMockAdapter(axios);

describe("getHarvardArts()", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("should throw an error if the API call fails", async () => {
    mock
      .onGet(
        `https://api.harvardartmuseums.org/object?size=4000&page=1&apikey=b5b7cabe-d309-41c5-8d1c-55747afac2d7`
      )
      .reply(500);

    await expect(getHarvardArts(1)).rejects.toThrow(
      "Error fetching data: Request failed with status code 500"
    );
  });

  it("should return objects with non-null primaryimageurl", async () => {
    const mockData = {
      records: [
        { primaryimageurl: "http://example.com/image1.jpg" },
        { primaryimageurl: "http://example.com/image2.jpg" },
        { primaryimageurl: null }
      ]
    };

    mock
      .onGet(
        `https://api.harvardartmuseums.org/object?size=4000&page=1&apikey=b5b7cabe-d309-41c5-8d1c-55747afac2d7`
      )
      .reply(200, mockData);

    const results = await getHarvardArts(1);

    results.forEach((object) => {
      expect(object.primaryimageurl).not.toBeNull();
    });
  });
});
