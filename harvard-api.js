import axios from "axios";

const getHarvardArts = async (page) => {
  const validResults = [];
  try {
    const harvardArtResponse = await axios.get(
      `https://api.harvardartmuseums.org/object?size=4000&page=${page}&apikey=b5b7cabe-d309-41c5-8d1c-55747afac2d7`
    );

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

const getHarvardClassifications = async () => {
  const validResults = [];
  try {
    const response = await axios.get(
      "https://api.harvardartmuseums.org/classification?size=63&apikey=b5b7cabe-d309-41c5-8d1c-55747afac2d7"
    );

    for (const object of response.data.records) {
      if (object.id != 0 && object.name != "(not assigned)") {
        validResults.push(object);
      }
    }
    return validResults;
  } catch (error) {
    throw new Error(`Error fetching classifications: ${error.message}`);
  }
};

const getHarvardDataByClassification = async (page, classificationId) => {
  const validResults = [];
  try {
    const response = await axios.get(
      `https://api.harvardartmuseums.org/object?classification=${classificationId}&size=100&&page=${page}&apikey=b5b7cabe-d309-41c5-8d1c-55747afac2d7`
    );
    for (const object of response.data.records) {
      if (object.classificationid != null) {
        validResults.push(object);
      }
    }
    return validResults;
  } catch (error) {
    throw new Error(
      `Error fetching object IDs for classification ${classificationId}: ${error.message}`
    );
  }
};

module.exports = {
  getHarvardArts,
  getHarvardClassifications,
  getHarvardDataByClassification
};
