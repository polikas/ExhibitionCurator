import axios from "axios";

const getHarvardArts = async (page) => {
  const validResults = [];
  try {
    // Fetch 4000 records from the API, use the page parameter
    const harvardArtResponse = await axios.get(
      `https://api.harvardartmuseums.org/object?size=4000&page=${page}&apikey=b5b7cabe-d309-41c5-8d1c-55747afac2d7`
    );

    // Filter for valid records
    for (const object of harvardArtResponse.data.records) {
      if (object.primaryimageurl != null) {
        validResults.push(object);
      }
    }

    return validResults;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

module.exports = {
  getHarvardArts
};
