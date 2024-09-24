import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainPage from "./MainPage";
import MetropolitanArts from "./MetropolitanArts";
import SingleMetropolitanArtCard from "./SingleMetropolitanArtCard";
import Title from "./Title";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: (props) => <Title {...props} />,
          headerTitleAlign: "center", // Center the title
          headerStyle: {
            backgroundColor: "darkorange"
          }
        }}
      >
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{ title: "Exhibition Curator Arts" }}
        />
        <Stack.Screen
          name="MetropolitanArts"
          component={MetropolitanArts}
          options={{ title: "Metropolitan Arts" }}
        />
        <Stack.Screen
          name="SingleMetropolitanArtCard"
          component={SingleMetropolitanArtCard}
          options={{ title: "Artwork Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
