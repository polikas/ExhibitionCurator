# **Summary**

This project is a mobile application built using **Expo Go** that allows users to curate a personalized art exhibition by selecting artworks from various museum collections. Users can search and filter artworks based on keywords or presets, and create a temporary exhibition by selecting artworks they like. The exhibition displays images and detailed information about the selected artworks, with links to find out more or view them in person. The exhibition persists for the duration of the user session, allowing users to interact with their selections.

The app is built using the following tech stack:

- **React Native**: For building the mobile app.
- **Axios**: To interact with the external APIs of the **Harvard Museum** and the **Metropolitan Museum**.
- **React Native Paper**: For UI components and design elements.
- **Jest**: For implementing integration tests of the API interactions.

## **Where to Find the Application**

The app is published and hosted on **Expo Go's** servers, and can be accessed using the Expo Go app. Users can download the Expo Go app from the Play Store, scan the [QR code](https://qr.expo.dev/eas-update?slug=exp&projectId=8a44ca08-0fb5-4e30-b62b-7b0dabf51567&groupId=7ae2dbb9-2d9d-4a91-9053-d9c9e081f64b&host=u.expo.dev)
, and load the app on their mobile devices or use this direct url link which requires to put it at Expo Go app https://expo.dev/preview/update?message=publish&updateRuntimeVersion=1.0.0&createdAt=2024-09-29T19%3A46%3A43.783Z&slug=exp&projectId=8a44ca08-0fb5-4e30-b62b-7b0dabf51567&group=7ae2dbb9-2d9d-4a91-9053-d9c9e081f64b.

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



## **Install Guide - Local**

To run the app locally, follow the steps below:

### **Prerequisites**

- Ensure you have **Node.js** installed with a minimum version of **v16.20.2**.

### **Installation Steps**

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.

3. Run the following command to install the project dependencies:
   ```bash
   npm install
it will install the following depedencies/packages
```bash
npx expo install react-dom react-native-web @expo/metro-runtime
npm install axios
npm install axios-mock-adapter --save-dev
npm install --save-dev jest
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install react-native-paper
npm install native-base
npx expo install react-native-svg@12.1.1
npx expo install react-native-safe-area-context@3.3.2
```
## **Run Local**

*Make sure you have completed the installation steps above before proceeding.*

1. To start the app locally, run the following command:
   ```bash
   npx expo start

2. After running the command, Expo will provide:

- A **local host URL** (not recommended for use since the app is designed for mobile devices).
- A **QR code**, which can be scanned using the **Expo Go** app.

3. To use the app on your mobile device:

- Download the **Expo Go** app from the App Store or Google Play Store.
- Open **Expo Go** and scan the QR code that appears in your terminal after running the npx expo start command.
- This will launch the app on your mobile device, allowing you to test and use the app as intended.
