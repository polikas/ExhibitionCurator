import axios from "axios";

// Display 40 metropolitan arts for main page of metropolitan, apply pagination
const getPagiMetropolitanData = async (page) => {
  try {
    const objectsPerPage = 40; // Number of objects per page
    // Step 1: Fetch all object IDs
    const response = await axios.get(
      "https://collectionapi.metmuseum.org/public/collection/v1/objects"
    );
    const allObjectIDs = response.data.objectIDs || [];
    // Step 2: Extract object IDs based on the current page
    const startIndex = page * objectsPerPage;
    const endIndex = startIndex + objectsPerPage;
    const objectIDsForCurrentPage = allObjectIDs.slice(startIndex, endIndex);
    // Step 3: Fetch details for the current page's object IDs
    const validResults = [];
    const titleSet = new Set();
    for (const id of objectIDsForCurrentPage) {
      try {
        const artResponse = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        );
        if (
          artResponse.data &&
          artResponse.data.isPublicDomain === true &&
          !titleSet.has(artResponse.data.title)
        ) {
          validResults.push(artResponse.data); // Add only valid results
          titleSet.add(artResponse.data.title);
        }
      } catch (error) {
        console.error(`Error fetching object ID ${id}:`, error.message);
      }
    }
    //console.log(validResults, `<--- Valid art data for page ${page}`);

    return validResults;
  } catch (error) {
    return [];
  }
};

// Get a list of all the departmentds, Get the departmentId and displayName
const getDepartments = async () => {
  try {
    const response = await axios.get(
      "https://collectionapi.metmuseum.org/public/collection/v1/departments"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getPagiMetropolitanDataByDepartment = async (page, departmentId) => {
  try {
    const objectsPerPage = 40; // Number of objects per page
    // Step 1: Fetch all object IDs for the specified department
    const response = await axios.get(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentId}`
    );
    const allObjectIDs = response.data.objectIDs || [];

    // Step 2: Extract object IDs based on the current page
    const startIndex = page * objectsPerPage;
    const endIndex = startIndex + objectsPerPage;
    const objectIDsForCurrentPage = allObjectIDs.slice(startIndex, endIndex);

    // Step 3: Fetch details for the current page's object IDs
    const validResults = [];
    const titleSet = new Set();
    for (const id of objectIDsForCurrentPage) {
      try {
        const artResponse = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        );

        // Check if the response is valid and the object is in the public domain
        if (
          artResponse.data &&
          artResponse.data.isPublicDomain === true &&
          !titleSet.has(artResponse.data.title)
        ) {
          validResults.push(artResponse.data); // Add only valid results
          titleSet.add(artResponse.data.title);
        }
      } catch (error) {
        console.error(`Error fetching object ID ${id}:`, error.message);
      }
    }

    // console.log(
    //   validResults,
    //   `<--- Valid art data for department ${departmentId}, page ${page}`
    // );

    return validResults;
  } catch (error) {
    console.error(
      `Error fetching object IDs for department ${departmentId}:`,
      error.message
    );
    return [];
  }
};

const getArtsSearchQuery = async (search, page) => {
  try {
    const objectsPerPage = 40;
    // Step 1: Fetch object IDs based on the search keyword
    const response = await axios.get(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${search}`
    );
    const objectIDs = response.data.objectIDs || [];

    // Calculate the start and end index based on the page number and items per page
    const startIndex = page * objectsPerPage;
    const endIndex = startIndex + objectsPerPage;
    const objectIDsForPage = objectIDs.slice(startIndex, endIndex);

    // Step 2: Fetch details for each object ID
    const validResults = [];
    const titleSet = new Set();
    for (const id of objectIDsForPage) {
      try {
        const artResponse = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        );
        if (
          artResponse.data &&
          artResponse.data.isPublicDomain === true &&
          !titleSet.has(artResponse.data.title)
        ) {
          validResults.push(artResponse.data); // Add only valid results
          titleSet.add(artResponse.data.title);
        }
      } catch (error) {
        console.error(`Error fetching object ID ${id}:`, error.message);
        // Skip invalid or error-prone objects
      }
    }

    console.log(
      validResults,
      `<--- Valid art data for search '${search}' on page ${page}`
    );

    // Return only valid results to avoid any front-end issues
    console.log(validResults.length, "<==== length of valid records");
    return validResults;
  } catch (error) {
    console.error("Error in getArtsSearchQuery:", error);
  }
};

//title, artistDisplayName, objectBeginDate, primaryImage or primaryImageSmall

module.exports = {
  getPagiMetropolitanData,
  getDepartments,
  getPagiMetropolitanDataByDepartment,
  getArtsSearchQuery
};
