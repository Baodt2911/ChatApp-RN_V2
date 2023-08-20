import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../Welcome";
import Login from "../Login";
import Register from "../Register";
import ForgotPassword from "../ForgotPassword";
import EmailVerification from "../EmailVerification";
import ChooseAvatar from "../Choose_Avatar";
import CreateRoom from "../CreateRoom";
import Chat from "../Chat";
import ShowMember from "../ShowMember";
import Home from "../Home";
const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: true,
          headerTitle: "Quên mật khẩu",
          headerStyle: { backgroundColor: "#f5f5f5" },
        }}
      />
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ChooseAvatar" component={ChooseAvatar} />
      <Stack.Screen
        name="CreateRoom"
        component={CreateRoom}
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: { backgroundColor: "#f5f5f5" },
        }}
      />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen
        name="ShowMember"
        component={ShowMember}
        options={{
          headerShown: true,
          headerTitle: "",
          headerStyle: { backgroundColor: "#f5f5f5" },
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
