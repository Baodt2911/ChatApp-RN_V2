import React, { createContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { useNavigation } from "@react-navigation/native";
import { addDocument } from "../hooks/services";
import { WEB_CLIENT_ID } from "@env";
import messaging from "@react-native-firebase/messaging";
import firestore from "@react-native-firebase/firestore";
import { ActivityIndicator } from "react-native";
GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});
export const AppContext = createContext();
export const AppUser = ({ children }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };
  useEffect(() => {
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
        }
      });

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp((remoteMessage) => {
      navigation.navigate("Chat", remoteMessage.data);
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });
  }, []);
  const saveTokenToDatabase = async (token) => {
    try {
      // Assume user is already signed in
      const uid = auth().currentUser?.uid;
      // Add the token to the users datastore
      await firestore()
        .collection("users")
        .doc(uid)
        .update({
          tokens: firestore.FieldValue.arrayUnion(token),
        });
    } catch (error) {
      console.log("Save token to DB error: ", error);
    }
  };

  const getTokenDevice = async () => {
    try {
      if (requestUserPermission()) {
        // return FCM token for the device
        let token = await messaging().getToken();
        return saveTokenToDatabase(token);
      } else {
        console.log("Failded token status", authStatus);
      }
      // Listen to whether the token changes
      return messaging().onTokenRefresh((token) => {
        saveTokenToDatabase(token);
      });
    } catch (error) {
      console.log("Get token device");
    }
  };

  const SignInWithFaceBook = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);

      if (result.isCancelled) {
        throw "User cancelled the login process";
      }

      // Once signed in, get the users AccessToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw "Something went wrong obtaining access token";
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken
      );

      // Sign-in the user with the credential
      const {
        additionalUserInfo: { isNewUser },
        user: { displayName, photoURL, email, uid },
      } = await auth().signInWithCredential(facebookCredential);
      //add collection
      if (isNewUser) {
        await addDocument(
          "users",
          {
            displayName,
            email,
            photoURL,
            uid,
          },
          uid
        );
      }
    } catch (error) {
      console.log("SignIn with Facebook error:", error);
    }
  };

  const SignInWithGoogle = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const {
        additionalUserInfo: { isNewUser },
        user: { displayName, photoURL, email, uid },
      } = await auth().signInWithCredential(googleCredential);
      //add collection
      if (isNewUser) {
        await addDocument(
          "users",
          {
            displayName,
            email,
            photoURL,
            uid,
          },
          uid
        );
      }
    } catch (error) {
      console.log("SignIn with Google error:", error);
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      await messaging().deleteToken();
    } catch (error) {
      console.log("Logout error:", error);
    }
  };
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      if (user) {
        const { displayName, email, photoURL, uid } = user;
        setUser({ displayName, email, photoURL, uid });
        if (!photoURL) {
          navigation.reset({
            index: 0,
            routes: [{ name: "ChooseAvatar" }],
          });
        } else {
          await getTokenDevice();
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        }
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        SignInWithGoogle,
        SignInWithFaceBook,
        getTokenDevice,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
