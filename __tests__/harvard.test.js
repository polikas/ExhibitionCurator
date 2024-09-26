const axios = require("axios");
const axiosMockAdapter = require("axios-mock-adapter");
const { getHarvardArts } = require("../harvard-api");
import dotenv from "dotenv";

dotenv.config();

const mock = new axiosMockAdapter(axios);

describe("getHarvardArts()", () => {
  beforeEach(() => {
    mock.reset();
  });
  it("should throw an error if the API call fails", async () => {
    mock
      .onGet(
        `https://api.harvardartmuseums.org/object?size=4000&page=1&apikey=${process.env.API_KEY}`
      )
      .reply(500);

    await expect(getHarvardArts(1)).rejects.toThrow(
      "Error fetching data: Request failed with status code 500"
    );
  });
});
