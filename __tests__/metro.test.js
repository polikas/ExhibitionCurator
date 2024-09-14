const axios = require("axios");
const axiosMockAdapter = require("axios-mock-adapter");
const { getPagiMetropolitanData } = require("../metropolitan-api");

const mock = new axiosMockAdapter(axios);

describe("getPagiMetropolitanData()", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("it should return 5 art records and status code 200 for first page", async () => {
    const mockObjectIDs = Array.from({ length: 5 }, (_, i) => i + 1);
    mock
      .onGet("https://collectionapi.metmuseum.org/public/collection/v1/objects")
      .reply(200, { objectIDs: mockObjectIDs });

    mockObjectIDs.forEach((id) => {
      mock
        .onGet(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        )
        .reply(200, { objectID: id, isPublicDomain: true });
    });

    const result = await getPagiMetropolitanData(0);

    expect(result).toHaveLength(5);
  });
});
