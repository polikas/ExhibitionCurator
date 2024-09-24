import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import {
  Searchbar,
  List,
  Button,
  ActivityIndicator,
  MD2Colors
} from "react-native-paper";
import { getPagiMetropolitanData } from "../metropolitan-api";
import MetropolitanArtsCard from "../components/MetropolitanArtsCard";
import { FlatList } from "react-native";

const MetropolitanArts = () => {
  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPagiMetropolitanData(pageNumber).then((artData) => {
      setArts(artData);
      setLoading(false);
    });
  }, [pageNumber]);

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <TouchableWithoutFeedback disabled={loading}>
      <View style={styles.container} pointerEvents={loading ? "none" : "auto"}>
        <Text style={styles.searchTheCollection}>Search The Collection</Text>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchInput}
          value={searchInput}
          disabled={loading}
        />
        <List.Section style={styles.filterBy}>
          <List.Accordion title="Filter By">
            <List.Item title="Department" />
            <List.Item title="Second item" />
          </List.Accordion>
        </List.Section>

        {loading ? (
          <ActivityIndicator
            animating={true}
            color={MD2Colors.red800}
            size="large"
            style={styles.loadingIndicator}
          />
        ) : (
          <FlatList
            data={arts}
            keyExtractor={(art) => art.objectID.toString()}
            renderItem={({ item }) => <MetropolitanArtsCard art={item} />}
            ListFooterComponent={
              <View style={styles.paginationContainer}>
                {pageNumber > 0 && (
                  <Button
                    icon="page-previous"
                    mode="contained"
                    onPress={handlePreviousPage}
                    style={styles.pageButton}
                    disabled={loading}
                  >
                    Previous Page
                  </Button>
                )}
                <Text style={styles.pageNumber}>Page {pageNumber}</Text>
                <Button
                  icon="page-next"
                  mode="contained"
                  onPress={handleNextPage}
                  style={styles.pageButton}
                  disabled={loading}
                >
                  Next Page
                </Button>
              </View>
            }
          />
        )}
      </View>
    </TouchableWithoutFeedback>
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
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20
  },
  pageButton: {
    marginHorizontal: 10
  },
  pageNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10
  },
  loadingIndicator: {
    marginTop: 20
  }
});

export default MetropolitanArts;
