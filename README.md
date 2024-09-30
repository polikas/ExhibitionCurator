# **Summary**

This project is a mobile application built using **Expo Go** that allows users to curate a personalized art exhibition by selecting artworks from various museum collections. Users can search and filter artworks based on keywords or presets, and create a temporary exhibition by selecting artworks they like. The exhibition displays images and detailed information about the selected artworks, with links to find out more or view them in person. The exhibition persists for the duration of the user session, allowing users to interact with their selections.

The app is built using the following tech stack:

- **React Native**: For building the mobile app.
- **Axios**: To interact with the external APIs of the **Harvard Museum** and the **Metropolitan Museum**.
- **React Native Paper**: For UI components and design elements.
- **Jest**: For implementing integration tests of the API interactions.

The app is published and hosted on **Expo Go's** servers, and can be accessed using the Expo Go app. Users can download the Expo Go app from the Play Store, scan the QR code, and load the app on their mobile devices.

## **How to Use**

As a user, you can follow these steps to use the app:

1. **Main Page**: 
   - Upon entering the app, you will be presented with two buttons:
     - **Harvard Art Museum**: Fetch artworks from the Harvard Art Museum API.
     - **Metropolitan Museum**: Fetch artworks from the Metropolitan Museum API.
   - You will also see a **Temporary Collection** button that allows you to view artworks saved during the session.

2. **Search Functionality**:
   - Both the Harvard and Metropolitan Museum APIs offer similar features:
     - **Search Bar**: You can enter keywords (e.g., _boat_, _wood_, _Egyptian cat_, _Greek helmet_) to search for artworks.
     - **Filter Menu**: A drop-down menu allows you to filter results by specific fields, such as museum departments, and display artworks based on those departments.

3. **Default Artwork Display**:
   - When you access an API, a selection of artworks will be displayed by default. These are paginated to give you a brief overview of the collection.

4. **Artwork Details**:
   - Clicking on an artwork's thumbnail will take you to a detailed page, where you can view:
     - An image of the artwork.
     - Detailed information about the artwork.
     - A button to **Save** the artwork to your temporary collection.

5. **Temporary Collection**:
   - After saving artworks, you can view your collection by clicking on the **Temporary Collection** button on the main page. This collection persists only for the duration of your session.



Install Guide

Run Local
