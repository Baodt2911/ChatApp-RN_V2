import React from "react";
import "@react-native-firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Navigation from "./component/navigation";
import { AppUser } from "./Context/AppUser";
const App = () => {
  const [loaded] = useFonts({
    "SairaCondensed-Medium": require("./assets/fonts/SairaCondensed-Medium.ttf"),
    "SairaCondensed-Light": require("./assets/fonts/SairaCondensed-Light.ttf"),
    "SairaCondensed-SemiBold": require("./assets/fonts/SairaCondensed-SemiBold.ttf"),
    "SairaCondensed-Regular": require("./assets/fonts/SairaCondensed-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <AppUser>
        <Navigation />
      </AppUser>
    </NavigationContainer>
  );
};
export default App;
