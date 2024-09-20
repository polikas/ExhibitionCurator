import React, { useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Dimensions } from "react-native";
import { useState } from "react";
import { Searchbar, List } from "react-native-paper";
import { getPagiMetropolitanData } from "../metropolitan-api";
import MetropolitanArtsCard from "../components/MetropolitanArtsCard";
import { FlatList } from "react-native";

const MetropolitanArts = () => {
  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [arts, setArts] = useState([]);

  useEffect(() => {
    getPagiMetropolitanData(pageNumber).then((artData) => {
      console.log(artData[0].title);
      setArts(artData);
    });
  }, [pageNumber]);

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
      <FlatList
        data={arts}
        keyExtractor={(art) => art.objectID.toString()}
        renderItem={({ item }) => <MetropolitanArtsCard art={item} />}
      ></FlatList>
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
