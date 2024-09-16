import axios from "axios";

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
    for (const id of objectIDsForCurrentPage) {
      try {
        const artResponse = await axios.get(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        );
        if (artResponse.data && artResponse.data.isPublicDomain === true) {
          validResults.push(artResponse.data); // Add only valid results
        }
      } catch (error) {
        console.error(`Error fetching object ID ${id}:`, error.message);
      }
    }
    console.log(validResults, `<--- Valid art data for page ${page}`);

    return validResults;
  } catch (error) {
    return [];
  }
};

module.exports = { getPagiMetropolitanData };
