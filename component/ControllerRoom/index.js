import React, { useContext, useMemo, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
} from "react-native";
import styles from "./style";
import ICON_MUTE_NOTIFICATION from "../../assets/icon/mute.png";
import ICON_NOTIFICATION from "../../assets/icon/notification.png";
import ICON_LEAVE from "../../assets/icon/leave.png";
import useFirestore from "../../hooks/useFirestore";
import firestore from "@react-native-firebase/firestore";
import { AppContext } from "../../Context/AppUser";
const TouchComponent =
  Platform.OS === "ios" ? TouchableOpacity : TouchableWithoutFeedback;
const ControllerRoom = ({
  roomCode,
  isVisible,
  muteNotification,
  handleCloseControllerRoom,
}) => {
  const {
    user: { uid },
  } = useContext(AppContext);
  const conditionGetRoom = useMemo(() => {
    return {
      fieldName: "roomCode",
      operator: "==",
      value: roomCode,
    };
  }, [roomCode]);
  const getRoom = useFirestore("rooms", conditionGetRoom, true, false);
  const handleLeaveRoom = async () => {
    try {
      const ref = firestore().collection("rooms").doc(getRoom[0].id);
      await ref.update({
        members: firestore.FieldValue.arrayRemove(uid),
      });
      handleCloseControllerRoom();
    } catch (error) {
      console.log("Leave room error", error);
      handleCloseControllerRoom();
    }
  };
  const handleMuteNotification = async () => {
    try {
      const ref = firestore().collection("rooms").doc(getRoom[0].id);
      await ref.update({
        muteNotification: firestore.FieldValue.arrayUnion(uid),
      });
      handleCloseControllerRoom();
    } catch (error) {
      console.log("Mute Notification error: ", error);
      handleCloseControllerRoom();
    }
  };
  const handleRemoveMuteNotification = async () => {
    try {
      const ref = firestore().collection("rooms").doc(getRoom[0].id);
      await ref.update({
        muteNotification: firestore.FieldValue.arrayRemove(uid),
      });
      handleCloseControllerRoom();
    } catch (error) {
      console.log("Mute Notification error: ", error);
      handleCloseControllerRoom();
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleCloseControllerRoom}
    >
      <TouchComponent style={{ flex: 1 }} onPress={handleCloseControllerRoom}>
        <View style={styles.container}>
          <View style={styles.main}>
            {/* Button Mute Notification */}
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                {
                  muteNotification?.includes(uid)
                    ? handleRemoveMuteNotification()
                    : handleMuteNotification();
                }
              }}
            >
              <Image
                source={
                  muteNotification?.includes(uid)
                    ? ICON_NOTIFICATION
                    : ICON_MUTE_NOTIFICATION
                }
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
              <Text style={styles.txtBtn}>
                {muteNotification?.includes(uid)
                  ? "Bật thông báo"
                  : "Tắt thông báo"}
              </Text>
            </TouchableOpacity>
            {/* Button Leave Room */}
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                Alert.alert(
                  "Thông báo",
                  "Bạn có chắc chắn muốn rời nhóm không?",
                  [
                    {
                      text: "Không",
                      onPress: () => {
                        handleCloseControllerRoom();
                      },
                    },
                    {
                      text: "Đồng ý",
                      onPress: () => handleLeaveRoom(),
                    },
                  ]
                );
              }}
            >
              <Image
                source={ICON_LEAVE}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
              <Text style={styles.txtBtn}>Rời nhóm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchComponent>
    </Modal>
  );
};

export default ControllerRoom;
