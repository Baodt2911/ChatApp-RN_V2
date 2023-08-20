import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import styles from "./style";
import { AppContext } from "../../Context/AppUser";
const Profile = () => {
  const {
    user: { displayName, photoURL, email },
    logout,
  } = useContext(AppContext);
  const alertLogout = () => {
    Alert.alert("Thông Báo", "Bạn có muốn đăng xuất không", [
      {
        text: "Không",
        onPress: () => {},
      },
      {
        text: "Đồng ý",
        onPress: async () => await logout(),
      },
    ]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <View style={styles.imageUser}>
          {photoURL?.length === 1 ? (
            <Text style={styles.imageText}>{photoURL}</Text>
          ) : (
            <Image
              source={{ uri: photoURL }}
              style={styles.imageUser}
              resizeMode="cover"
            />
          )}
        </View>
        <View style={styles.content}>
          <Text style={styles.nameUser}>{displayName}</Text>
          <Text style={styles.textEmail}>Email: {email}</Text>
        </View>
        <TouchableOpacity style={styles.btnLogout}>
          <TouchableOpacity style={styles.btnLogout} onPress={alertLogout}>
            <Text style={styles.txtBtn}>Đăng xuất</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
