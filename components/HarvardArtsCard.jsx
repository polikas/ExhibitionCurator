import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

const HarvardArtsCard = ({ art }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("SingleHarvardArtCard", { art });
  };

  return (
    <TouchableOpacity onPress={handlePress} key={art.id} style={styles.card}>
      {art.primaryimageurl ? (
        <Image
          source={{ uri: art.primaryimageurl }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <Text style={styles.noImageText}>No Image Available</Text>
      )}
      <Text style={styles.title}>Title: {art.title}</Text>
      {/* <Text>Artist: {art.artistDisplayName}</Text>
      <Text>Date: {art.objectBeginDate}</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8
  },
  image: {
    width: "100%",
    height: 200
  },
  noImageText: {
    color: "gray",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 10
  },
  title: {
    marginTop: 10,
    fontWeight: "bold"
  }
});

export default HarvardArtsCard;
