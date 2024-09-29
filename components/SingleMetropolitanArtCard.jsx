import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { ArtCollectionContext } from "../contexts/ArtCollectionContext";

const SingleMetropolitanArtCard = ({ route }) => {
  const { art } = route.params;
  const { collection, addToCollection } = useContext(ArtCollectionContext);

  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleAddToCollection = () => {
    const artExists = collection.some((item) => item.objectID === art.objectID);

    if (artExists) {
      setSnackbarMessage("Art is already in the collection!");
    } else {
      addToCollection(art);
      setSnackbarMessage("Art saved to collection!");
    }

    setSnackbarVisible(true);
  };
  return (
    <View style={styles.container}>
      {art.primaryImage ? (
        <Image
          source={{ uri: art.primaryImage }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : (
        <Text style={styles.noImageText}>No Image Available</Text>
      )}

      <Button
        mode="contained"
        style={styles.addToCollectionBtn}
        onPress={handleAddToCollection}
      >
        Add to Collection
      </Button>

      <Text>
        <Text style={{ fontWeight: "bold" }}>Title: </Text>
        {art.title}
      </Text>

      <Text>
        <Text style={{ fontWeight: "bold" }}>Artist: </Text>
        {art.artistDisplayName}
      </Text>

      <Text>
        <Text style={{ fontWeight: "bold" }}>Artist Nationality: </Text>
        {art.artistNationality}
      </Text>

      <Text>
        <Text style={{ fontWeight: "bold" }}>Artist Bio: </Text>
        {art.artistDisplayBio}
      </Text>

      <Text>
        <Text style={{ fontWeight: "bold" }}>Date: </Text>
        {art.objectBeginDate}
      </Text>

      <Text>
        <Text style={{ fontWeight: "bold" }}>Medium: </Text>
        {art.medium}
      </Text>

      <Text>
        <Text style={{ fontWeight: "bold" }}>Dimensions: </Text>
        {art.dimensions}
      </Text>

      <Text>
        <Text style={{ fontWeight: "bold" }}>Classification: </Text>
        {art.classification}
      </Text>

      <Text>
        <Text style={{ fontWeight: "bold" }}>Credit Line: </Text>
        {art.creditLine}
      </Text>

      <Text>
        <Text style={{ fontWeight: "bold" }}>Accession Number: </Text>
        {art.accessionNumber}
      </Text>

      <Text>
        <Text style={{ fontWeight: "bold" }}>Rights and Reproduction: </Text>
        {art.rightsAndReproduction}
      </Text>

      <Snackbar
        visible={isSnackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={styles.snackbar}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  image: {
    width: "100%",
    height: 300
  },
  noImageText: {
    color: "gray",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 10
  },
  addToCollectionBtn: {
    backgroundColor: "darkorange",
    marginVertical: 10
  },
  snackbar: {
    backgroundColor: "green"
  }
});

export default SingleMetropolitanArtCard;
