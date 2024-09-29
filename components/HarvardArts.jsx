import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
  FlatList
} from "react-native";
import {
  Searchbar,
  List,
  Button,
  ActivityIndicator,
  MD2Colors
} from "react-native-paper";
import HarvardArtsCard from "../components/HarvardArtsCard";
import {
  getHarvardArts,
  getHarvardClassifications,
  getHarvardDataByClassification,
  getHarvardArtsSearchQuery
} from "../harvard-api";

const HarvardArts = () => {
  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classifications, setClassifications] = useState([]);
  const [showClassificationMenu, setShowClassificationMenu] = useState(false);
  const [selectedClassification, setSelectedClassification] = useState(null);
  const [error, setError] = useState("");

  const fetchArts = async () => {
    setLoading(true);
    setError("");
    try {
      let artData;
      if (selectedClassification) {
        artData = await getHarvardDataByClassification(
          pageNumber,
          selectedClassification.id
        );
      } else {
        artData = await getHarvardArts(pageNumber);
      }
      setArts(artData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArts();
  }, [pageNumber, selectedClassification]);

  useEffect(() => {
    if (searchInput) {
      setSelectedClassification(null);
    }
  }, [searchInput]);

  useEffect(() => {
    getHarvardClassifications().then((classificationData) => {
      setClassifications(classificationData);
    });
  }, []);

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleClassificationMenu = () => {
    setShowClassificationMenu(true);
  };

  const handleSelectClassification = (classification) => {
    setSelectedClassification(classification);
    setShowClassificationMenu(false);
    setPageNumber(1);
    setSearchInput("");
  };

  const handleSearchIconPress = async () => {
    if (!searchInput.trim()) return;

    setLoading(true);
    setError("");

    try {
      const searchResults = await getHarvardArtsSearchQuery(
        searchInput,
        pageNumber
      );
      setArts(searchResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
          onIconPress={handleSearchIconPress}
          onSubmitEditing={handleSearchIconPress}
          disabled={loading}
        />
        <List.Section style={styles.filterBy}>
          <List.Accordion title="Filter By">
            <List.Item
              title="Classification"
              onPress={handleClassificationMenu}
            />
          </List.Accordion>
        </List.Section>

        {selectedClassification && !searchInput && (
          <Text style={styles.selectedClassification}>
            Selected Classification: {selectedClassification.name}
          </Text>
        )}

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
            keyExtractor={(art) => art.id.toString()}
            renderItem={({ item }) => <HarvardArtsCard art={item} />}
            ListFooterComponent={
              <View style={styles.paginationContainer}>
                {pageNumber > 1 && (
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

        <Modal visible={showClassificationMenu} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select a Classification</Text>
            <FlatList
              data={classifications}
              keyExtractor={(classification) => classification.id.toString()}
              renderItem={({ item }) => (
                <Button
                  mode="outlined"
                  onPress={() => handleSelectClassification(item)}
                  style={styles.classificationButton}
                >
                  {item.name}
                </Button>
              )}
            />
            <Button
              mode="contained"
              style={styles.closeClassificationBtn}
              onPress={() => setShowClassificationMenu(false)}
            >
              Close
            </Button>
          </View>
        </Modal>
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
  selectedDepartment: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "bold"
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
    marginHorizontal: 10,
    backgroundColor: "darkorange"
  },
  pageNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10
  },
  loadingIndicator: {
    marginTop: 20
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20
  },
  classificationButton: {
    marginVertical: 10,
    width: "100%"
  },
  closeClassificationBtn: {
    backgroundColor: "darkorange"
  }
});

export default HarvardArts;
