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
import {
  getPagiMetropolitanData,
  getPagiMetropolitanDataByDepartment,
  getDepartments,
  getArtsSearchQuery
} from "../metropolitan-api";
import MetropolitanArtsCard from "../components/MetropolitanArtsCard";

const MetropolitanArts = () => {
  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [showDepartmentMenu, setShowDepartmentMenu] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [error, setError] = useState("");

  const fetchArts = async () => {
    setLoading(true);
    setError("");
    try {
      let artData;
      if (selectedDepartment) {
        artData = await getPagiMetropolitanDataByDepartment(
          pageNumber,
          selectedDepartment.departmentId
        );
      } else {
        artData = await getPagiMetropolitanData(pageNumber);
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
  }, [pageNumber, selectedDepartment]);

  useEffect(() => {
    if (searchInput) {
      setSelectedDepartment(null);
    }
  }, [searchInput]);

  useEffect(() => {
    getDepartments().then((deptData) => {
      setDepartments(deptData.departments);
    });
  }, []);

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleDepartmentMenu = () => {
    setShowDepartmentMenu(true);
  };

  const handleSelectDepartment = (department) => {
    setSelectedDepartment(department);
    setShowDepartmentMenu(false);
    setPageNumber(0);
    setSearchInput("");
  };

  const handleSearchIconPress = async () => {
    if (!searchInput.trim()) return;

    setLoading(true);
    setError("");

    try {
      const searchResults = await getArtsSearchQuery(searchInput, pageNumber);
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
            <List.Item title="Department" onPress={handleDepartmentMenu} />
          </List.Accordion>
        </List.Section>

        {selectedDepartment && !searchInput && (
          <Text style={styles.selectedDepartment}>
            Selected Department: {selectedDepartment.displayName}
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

        <Modal visible={showDepartmentMenu} animationType="slide">
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select a Department</Text>
            <FlatList
              data={departments}
              keyExtractor={(dept) => dept.departmentId.toString()}
              renderItem={({ item }) => (
                <Button
                  mode="outlined"
                  onPress={() => handleSelectDepartment(item)}
                  style={styles.departmentButton}
                >
                  {item.displayName}
                </Button>
              )}
            />
            <Button
              mode="contained"
              style={styles.closeDepartmentBtn}
              onPress={() => setShowDepartmentMenu(false)}
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
  departmentButton: {
    marginVertical: 10,
    width: "100%"
  },
  closeDepartmentBtn: {
    backgroundColor: "darkorange"
  }
});

export default MetropolitanArts;
