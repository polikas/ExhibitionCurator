const axios = require("axios");
const axiosMockAdapter = require("axios-mock-adapter");
const {
  getHarvardArts,
  getHarvardClassifications,
  getHarvardDataByClassification,
  getHarvardArtsSearchQuery
} = require("../harvard-api");

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
describe("getHarvardClassifications()", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("should hanle error status code 500", async () => {
    mock
      .onGet(
        "https://api.harvardartmuseums.org/classification?size=63&apikey=b5b7cabe-d309-41c5-8d1c-55747afac2d7"
      )
      .reply(500);

    try {
      await getHarvardClassifications();
    } catch (error) {
      expect(error.message).toContain("Error fetching classifications");
    }
  });

  it("should return a list of classifications and status code 200", async () => {
    const mockClassifications = {
      records: [
        { id: 197, name: "Paintings with Text" },
        { id: 224, name: "Performance Artifacts" },
        { id: 304, name: "Brick Stamps" },
        { id: 1139, name: "Casts" }
      ]
    };

    mock
      .onGet(
        "https://api.harvardartmuseums.org/classification?size=63&apikey=b5b7cabe-d309-41c5-8d1c-55747afac2d7"
      )
      .reply(200, mockClassifications);

    const result = await getHarvardClassifications();

    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({
      id: 197,
      name: "Paintings with Text"
    });
    expect(result[2].name).toBe("Brick Stamps");
  });
});
describe("getHarvardDataByClassification()", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("should return valid results when API responds with records and valid ids", async () => {
    const classificationId = 123;
    const page = 1;

    const mockData = {
      records: [
        { id: 1, classificationid: classificationId, name: "Test object 1" },
        { id: 2, classificationid: classificationId, name: "Test object 2" }
      ]
    };

    mock
      .onGet(
        `https://api.harvardartmuseums.org/object?classification=${classificationId}&size=100&&page=${page}&apikey=b5b7cabe-d309-41c5-8d1c-55747afac2d7`
      )
      .reply(200, mockData);

    const result = await getHarvardDataByClassification(page, classificationId);

    expect(result).toEqual(mockData.records);
  });

  it("should handle errors when the API call fails", async () => {
    const classificationId = 123;
    const page = 1;

    mock
      .onGet(
        `https://api.harvardartmuseums.org/object?classification=${classificationId}&size=100&&page=${page}&apikey=b5b7cabe-d309-41c5-8d1c-55747afac2d7`
      )
      .reply(500);

    await expect(
      getHarvardDataByClassification(page, classificationId)
    ).rejects.toThrow(
      `Error fetching object IDs for classification ${classificationId}: Request failed with status code 500`
    );
  });
});
describe("getHarvardArtsSearchQuery()", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("should return valid results when user search inputs with keyword (in this case we just test with title one of the cases), however a keyword search string; this parameter searches object titles, artists, description, classification, culture, worktype, medium terms, provenance, and creditline", async () => {
    const searchInput = "bike";
    const page = 1;

    const mockData = {
      records: [
        { id: 1, title: searchInput },
        { id: 2, title: searchInput }
      ]
    };

    mock
      .onGet(
        `https://api.harvardartmuseums.org/object?keyword=${searchInput}&size=50&&page=${page}&apikey=b5b7cabe-d309-41c5-8d1c-55747afac2d7`
      )
      .reply(200, mockData);

    const result = await getHarvardArtsSearchQuery(searchInput, page);
    expect(result).toEqual(mockData.records);
  });

  it("should handle errors when the API call fails", async () => {
    const searchInput = "boat";
    const page = 1;

    mock
      .onGet(
        `https://api.harvardartmuseums.org/object?keyword=${searchInput}&size=50&&page=${page}&apikey=b5b7cabe-d309-41c5-8d1c-55747afac2d7`
      )
      .reply(500);

    await expect(getHarvardArtsSearchQuery(searchInput, page)).rejects.toThrow(
      `Error fetching object IDs for keyword ${searchInput}: Request failed with status code 500`
    );
  });
});
