import React, { createContext, useState } from "react";

export const ArtCollectionContext = createContext();

export const ArtCollectionProvider = ({ children }) => {
  const [collection, setCollection] = useState([]);

  const addToCollection = (art) => {
    setCollection((prevCollection) => [
      ...prevCollection,
      { ...art, objectID: art.objectID || art.id }
    ]);
  };

  const removeFromCollection = (artToRemove) => {
    setCollection((prevCollection) =>
      prevCollection.filter((art) => art.objectID !== artToRemove.objectID)
    );
  };

  return (
    <ArtCollectionContext.Provider
      value={{ collection, addToCollection, removeFromCollection }}
    >
      {children}
    </ArtCollectionContext.Provider>
  );
};
