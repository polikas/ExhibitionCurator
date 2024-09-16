import React, { useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Dimensions } from "react-native";
import { useState } from "react";
import { Searchbar, List } from "react-native-paper";
import { getPagiMetropolitanData } from "../metropolitan-api";

const MetropolitanArts = () => {
  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [arts, setArts] = useState([]);

  useEffect(() => {
    getPagiMetropolitanData(pageNumber).then((artData) => {
      console.log(artData);
      setArts(artData);
    });
  }, [pageNumber]);

  // useEffect(() => {
  //   axios
  //     .get("https://collectionapi.metmuseum.org/public/collection/v1/objects")
  //     .then((response) => console.log("Axios is working:", response.data))
  //     .catch((error) => console.error("Axios error:", error));
  // }, [pageNumber]);

  return (
    <View style={styles.container}>
      <Text style={styles.searchTheCollection}>Search The Collection</Text>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchInput}
        value={searchInput}
      />
      <List.Section style={styles.filterBy}>
        <List.Accordion title="Filter By">
          <List.Item title="Department" />
          <List.Item title="Second item" />
        </List.Accordion>
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  searchTheCollection: {
    fontSize: 22
  },
  filterBy: {
    alignSelf: "stretch"
  }
});

export default MetropolitanArts;
