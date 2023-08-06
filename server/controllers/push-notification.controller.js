import admin from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../chat-app-db76c-firebase-adminsdk-tqbqw-9966534b1a.json" assert { type: "json" };
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chat-app-db76c-default-rtdb.firebaseio.com",
});
const db = getFirestore();

const getTokenUserInRooms = async (roomCode) => {
  try {
    const roomRef = db.collection("rooms");
    const dataRooms = await roomRef.where("roomCode", "==", roomCode).get();
    let data;
    dataRooms.forEach((doc) => {
      data = doc.data();
    });
    const { members } = data;

    const tokenPromises = members.map(async (uid) => {
      const querySnapshot = await db
        .collection("users")
        .where("uid", "==", uid)
        .get();

      const [{ tokens }] = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      return tokens;
    });

    const tokens = await Promise.all(tokenPromises);
    const listTokens = [];
    tokens.forEach((token) => {
      token.forEach((itemToken) => {
        listTokens.push(itemToken);
      });
    });
    return listTokens;
  } catch (error) {
    console.log("getTokenUserInRooms error:", error);
    return [];
  }
};
const pushNotificationController = {
  sendMessage: async (req, res) => {
    try {
      const { roomCode, notification } = req.body;
      const registrationTokens = await getTokenUserInRooms(roomCode);
      const message = {
        tokens: registrationTokens,
        notification,
      };

      const response = await getMessaging().sendMulticast(message);
      console.log("Successfully sent message:", response);
      res.status(200).json(message);
    } catch (error) {
      console.log("Error sending message:", error);
    }
  },
};
export default pushNotificationController;
