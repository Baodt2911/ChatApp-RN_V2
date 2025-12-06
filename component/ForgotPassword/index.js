import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { WINDOW_WIDTH } from "../../utils";
import auth from "@react-native-firebase/auth";
const ForgotPassword = () => {
  const [textEmail, setTextEmail] = useState();
  console.log(textEmail);
  const handleSendEmail = async () => {
    try {
      await auth().sendEmailVerification(textEmail);
    } catch (error) {
      console.log("Email verification sent error: ", error);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        keyboardType="email-address"
        value={textEmail}
        onChangeText={(text) => setTextEmail(text)}
        placeholder="Nhập địa chỉ email của bạn"
        style={{
          width: WINDOW_WIDTH * 0.8,
          height: 50,
          paddingHorizontal: 20,
          backgroundColor: "#fff",
          fontFamily: "SairaCondensed-Medium",
        }}
      />
      <TouchableOpacity
        style={{
          width: 150,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
          backgroundColor: "#0E8388",
          elevation: 5,
          marginTop: 20,
          opacity: !!textEmail ? 1 : 0.7,
        }}
        onPress={handleSendEmail}
        disabled={!textEmail}
      >
        <Text
          style={{
            fontSize: 16,
            textTransform: "uppercase",
            color: "#fff",
            fontFamily: "SairaCondensed-Medium",
          }}
        >
          Gửi
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
