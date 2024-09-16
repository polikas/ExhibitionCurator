import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Title = ({ children }) => {
  return (
    <View style={styles.centeredView}>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
  },
  title: {
    fontSize: 32,
    textAlign: "center"
  }
});

export default Title;
