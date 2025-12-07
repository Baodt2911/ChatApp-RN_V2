module.exports = () => ({
  name: "CB | Chat",
  slug: "Chat-app",
  version: "2.0.0",

  extra: {
    eas: {
      projectId: "c99f33be-2e64-41ed-85d4-73a127bca8b0",
    },
  },

  android: {
    package: "com.baodt2911.Chatapp",
    adaptiveIcon: {
      foregroundImage: "./assets/favicon.png",
      backgroundColor: "#ffffff",
    },
    googleServicesFile: "./google-services.json", // Đường dẫn trực tiếp
  },

  ios: {
    bundleIdentifier: "com.baodt2911.Chatapp",
    supportsTablet: true,
    googleServicesFile: "./GoogleService-Info.plist", // Đường dẫn trực tiếp
  },

  plugins: [
    "@react-native-google-signin/google-signin",
    [
      "expo-image-picker",
      {
        photosPermission:
          "The app accesses your photos to let you share them with your friends.",
      },
    ],
    [
      "react-native-fbsdk-next",
      {
        appID: "1281020842772304",
        clientToken: "65257bb46ef078e42610b7ed141b8687",
        displayName: "Chat app",
      },
    ],
    "expo-font",
  ],
});
