import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainPage from "./MainPage";
import MetropolitanArts from "./MetropolitanArts";
import HarvardArts from "./HarvardArts";
import SingleHarvardArtCard from "./SingleHarvardArtCard";
import SingleMetropolitanArtCard from "./SingleMetropolitanArtCard";
import ArtsCollection from "./ArtsCollection";
import Title from "./Title";
import { ArtCollectionProvider } from "../contexts/ArtCollectionContext";

const Stack = createStackNavigator();

const App = () => {
  return (
    <ArtCollectionProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitle: (props) => <Title {...props} />,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "darkorange"
            }
          }}
        >
          <Stack.Screen
            name="MainPage"
            component={MainPage}
            options={{ title: "Create Your Exhibition" }}
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
          <Stack.Screen
            name="HarvardArts"
            component={HarvardArts}
            options={{ title: "Harvard Arts" }}
          />
          <Stack.Screen
            name="SingleHarvardArtCard"
            component={SingleHarvardArtCard}
            options={{ title: "Artwork Details" }}
          />
          <Stack.Screen
            name="ArtsCollection"
            component={ArtsCollection}
            options={{ title: "My Collection" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ArtCollectionProvider>
  );
};

export default App;
