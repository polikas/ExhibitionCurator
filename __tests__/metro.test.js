const axios = require("axios");
const axiosMockAdapter = require("axios-mock-adapter");
const {
  getPagiMetropolitanData,
  getDepartments,
  getPagiMetropolitanDataByDepartment
} = require("../metropolitan-api");

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

    const mockArtData = mockObjectIDs.map((id) => ({
      objectID: id,
      isPublicDomain: true,
      title: `Art Title ${id}`
    }));

    mockObjectIDs.forEach((id) => {
      mock
        .onGet(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        )
        .reply(200, mockArtData[id - 1]);
    });

    const result = await getPagiMetropolitanData(0);

    expect(result).toHaveLength(5);
    expect(result).toEqual(mockArtData);
  });
});
describe("getDepartments()", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("should return a list of departments and status code 200", async () => {
    const mockDepartments = {
      departments: [
        { departmentId: 1, displayName: "American Decorative Arts" },
        { departmentId: 3, displayName: "Ancient Near Eastern Art" },
        { departmentId: 4, displayName: "Arms and Armor" },
        {
          departmentId: 5,
          displayName: "Arts of Africa, Oceania, and the Americas"
        },
        { departmentId: 6, displayName: "Asian Art" }
      ]
    };

    mock
      .onGet(
        "https://collectionapi.metmuseum.org/public/collection/v1/departments"
      )
      .reply(200, mockDepartments);

    const result = await getDepartments();
    console.log(result.departments);

    expect(result.departments).toHaveLength(5);
    expect(result.departments[0]).toEqual({
      departmentId: 1,
      displayName: "American Decorative Arts"
    });
    expect(result.departments[4].displayName).toBe("Asian Art");
  });

  it("should handle errors status 500", async () => {
    mock
      .onGet(
        "https://collectionapi.metmuseum.org/public/collection/v1/departments"
      )
      .reply(500);

    try {
      await getDepartments();
    } catch (error) {
      expect(error.response.status).toBe(500);
    }
  });
});

describe("getPagiMetropolitanDataByDepartment()", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("should return 3 art records for department 1 and page 0", async () => {
    const mockObjectIDs = Array.from({ length: 3 }, (_, i) => i + 1);
    mock
      .onGet(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1"
      )
      .reply(200, { objectIDs: mockObjectIDs });

    const mockArtData = mockObjectIDs.map((id) => ({
      objectID: id,
      isPublicDomain: true,
      title: `Art Title ${id}`
    }));

    mockObjectIDs.forEach((id) => {
      mock
        .onGet(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        )
        .reply(200, mockArtData[id - 1]);
    });

    const result = await getPagiMetropolitanDataByDepartment(0, 1);

    expect(result).toHaveLength(3);
    expect(result).toEqual(mockArtData);
  });

  it("should return an empty array for a department with no objects", async () => {
    mock
      .onGet(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1"
      )
      .reply(200, { objectIDs: [] });

    const result = await getPagiMetropolitanDataByDepartment(0, 1);

    expect(result).toHaveLength(0);
  });

  it("should handle errors when fetching art details", async () => {
    const mockObjectIDs = [1, 2];
    mock
      .onGet(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1"
      )
      .reply(200, { objectIDs: mockObjectIDs });

    mock
      .onGet(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects/1"
      )
      .reply(200, {
        objectID: 1,
        isPublicDomain: true,
        title: "Art Title 1"
      });

    mock
      .onGet(
        "https://collectionapi.metmuseum.org/public/collection/v1/objects/2"
      )
      .reply(500);

    const result = await getPagiMetropolitanDataByDepartment(0, 1);

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Art Title 1");
  });
});
