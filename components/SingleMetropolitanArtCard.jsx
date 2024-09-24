import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const SingleMetropolitanArtCard = ({ route }) => {
  const { art } = route.params;

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
  }
});

export default SingleMetropolitanArtCard;
