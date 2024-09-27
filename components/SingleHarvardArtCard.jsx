import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const SingleHarvardArtCard = ({ route }) => {
  const { art } = route.params;

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
        {art.people?.[0]?.displayname || "Uknown"}, ({art.birthplace}{" "}
        {art.displaydate} {art.deathplace})
      </Text>

      <Text>
        <Text style={{ fontWeight: "bold" }}>Work Type: </Text>
        {art.worktypes[0].worktype}
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

export default SingleHarvardArtCard;
