import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const getHarvardArts = async (page) => {
  const validResults = [];
  try {
    const harvardArtResponse = await axios.get(
      `https://api.harvardartmuseums.org/object?size=4000&page=${page}&apikey=${process.env.API_KEY}`
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

module.exports = {
  getHarvardArts
};
