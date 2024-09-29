import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  ScrollView
} from "react-native";

// Get screen width and height
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const MainPage = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("MetropolitanArts")}
        style={({ pressed }) => [
          styles.metroButton,
          pressed && styles.buttonPressed
        ]}
      >
        <Text style={styles.metroText}>Discover Metropolitan Arts</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("HarvardArts")}
        style={({ pressed }) => [
          styles.harvardButton,
          pressed && styles.buttonPressed
        ]}
      >
        <Text style={styles.harvardText}>Discover Harvard Art</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("ArtsCollection")}
        style={({ pressed }) => [
          styles.collectionBtn,
          pressed && styles.buttonPressed
        ]}
      >
        <Text style={styles.collectionText}>View My Collection</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingVertical: 20
  },
  metroButton: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.3,
    backgroundColor: "powderblue",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    transition: "all 0.3s ease"
  },
  harvardButton: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.3,
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  collectionBtn: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.3,
    backgroundColor: "lightcoral",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  metroText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff"
  },
  harvardText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff"
  },
  collectionText: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff"
  },
  buttonPressed: {
    opacity: 0.7
  }
});

export default MainPage;
