import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { ArtCollectionContext } from "../contexts/ArtCollectionContext";

const SingleHarvardArtCard = ({ route }) => {
  const { art } = route.params;
  const { collection, addToCollection } = useContext(ArtCollectionContext);

  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleAddToCollection = () => {
    const artExists = collection.some((item) => item.id === art.id);

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
      {art.primaryimageurl ? (
        <Image
          source={{ uri: art.primaryimageurl }}
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
        <Text style={{ fontWeight: "bold" }}>Object Number: </Text>
        {art.objectnumber}
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>Classification: </Text>
        {art.classification}
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>People: </Text>
        {art.people?.[0]?.displayname || "Unknown"}, ({art.birthplace}{" "}
        {art.displaydate} {art.deathplace})
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>Work Type: </Text>
        {art.worktypes?.[0]?.worktype}
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>Date: </Text>
        {art.dated}
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>Culture: </Text>
        {art.culture}
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
        <Text style={{ fontWeight: "bold" }}>Credit Line: </Text>
        {art.creditline}
      </Text>
      <Text>
        <Text style={{ fontWeight: "bold" }}>Division: </Text>
        {art.division}
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

export default SingleHarvardArtCard;
