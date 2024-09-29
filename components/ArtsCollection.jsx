import React, { useContext, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { ArtCollectionContext } from "../contexts/ArtCollectionContext";
import { Button, Snackbar } from "react-native-paper";

const ArtsCollection = () => {
  const { collection, removeFromCollection } = useContext(ArtCollectionContext);
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleRemoveFromCollection = (art) => {
    removeFromCollection(art);
    setSnackbarMessage("Art removed from collection!");
    setSnackbarVisible(true);
  };

  return (
    <View style={styles.container}>
      {collection.length > 0 ? (
        <FlatList
          data={collection}
          keyExtractor={(item) =>
            item.id ? item.id.toString() : item.objectID.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.artItem}>
              {item.primaryimageurl ? (
                <Image
                  source={{ uri: item.primaryimageurl }}
                  style={styles.image}
                  resizeMode="contain"
                />
              ) : item.primaryImage ? (
                <Image
                  source={{ uri: item.primaryImage }}
                  style={styles.image}
                  resizeMode="contain"
                />
              ) : (
                <Text style={styles.noImageText}>No Image Available</Text>
              )}

              <Text style={styles.sourceText}>
                {item.primaryimageurl ? "By Harvard" : "By Metropolitan"}
              </Text>

              <Text style={styles.title}>{item.title}</Text>

              <Button
                mode="contained"
                style={styles.removeButton}
                onPress={() => handleRemoveFromCollection(item)}
              >
                Remove from Collection
              </Button>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noArtText}>
          No artworks added to collection yet.
        </Text>
      )}

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
    padding: 20,
    backgroundColor: "#f0f0f0"
  },
  artItem: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    padding: 15,
    marginBottom: 20
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5
  },
  sourceText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#555",
    marginTop: 5,
    textAlign: "center"
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold"
  },
  noImageText: {
    color: "gray",
    fontStyle: "italic",
    textAlign: "center"
  },
  noArtText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: "red"
  },
  snackbar: {
    backgroundColor: "green"
  }
});

export default ArtsCollection;
