import { View, Text, Image } from "react-native";
import React from "react";

const EmailVerification = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../assets/icon/welcome.png")}
        style={{ width: "100%", height: "50%" }}
        resizeMode="contain"
      />
      <Text
        style={{
          fontSize: 24,
          color: "gray",
          fontFamily: "SairaCondensed-Light",
          lineHeight: 30,
        }}
      >
        Email verification sent!
      </Text>
    </View>
  );
};

export default EmailVerification;
