import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Alert,
  Dimensions
} from "react-native";

// Get screen width and height
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const MainPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("MetropolitanArts")}
        style={styles.metroButton}
      >
        <Text style={styles.metroText}>Metropolitan Art</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("HarvardArts")}
        style={styles.harvardButton}
      >
        <Text style={styles.harvardText}>Harvard Art</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 50
  },
  metroButton: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.3,
    backgroundColor: "powderblue",
    justifyContent: "center",
    marginHorizontal: 10,
    marginBottom: 20
  },
  harvardButton: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.3,
    backgroundColor: "skyblue",
    justifyContent: "center",
    marginHorizontal: 10,
    marginBottom: 20
  },
  metroText: {
    fontSize: 20,
    textAlign: "center"
  },
  harvardText: {
    fontSize: 20,
    textAlign: "center"
  }
});

export default MainPage;
