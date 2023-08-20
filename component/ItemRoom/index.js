import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useContext, useMemo } from "react";
import useFirestore from "../../hooks/useFirestore";
import { formatDate } from "../../hooks/formatDate";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";
import ICON_MUTE_NOTIFICATION from "../../assets/icon/mute.png";
import { AppContext } from "../../Context/AppUser";
export const ItemRoom = ({
  roomName,
  photoURL,
  roomCode,
  muteNotification,
  onLongPress,
}) => {
  const navigation = useNavigation();
  const {
    user: { uid },
  } = useContext(AppContext);
  const conditionMessage = useMemo(() => {
    return {
      fieldName: "roomCode",
      operator: "==",
      value: roomCode,
    };
  }, [roomCode]);
  const sortOderMessage = useMemo(() => {
    return {
      fieldValue: "createdAt",
      sort: "desc",
    };
  }, []);
  const lastMessage = useFirestore(
    "messages",
    conditionMessage,
    sortOderMessage,
    true
  );
  return (
    <TouchableOpacity
      style={styles.itemRoom}
      onLongPress={() => onLongPress(roomCode, muteNotification)}
      onPress={() =>
        navigation.navigate("Chat", {
          roomCode: roomCode,
          roomName: roomName,
        })
      }
    >
      <Image
        source={{ uri: `${photoURL}` }}
        resizeMode="cover"
        style={styles.imgRoom}
      />
      <View style={styles.titleRoom} numberOfLines={1}>
        <Text numberOfLines={1} style={styles.nameRoom}>
          {roomName}
        </Text>
        {!lastMessage ? (
          <></>
        ) : lastMessage.length === 0 ? (
          <></>
        ) : (
          <View style={styles.message}>
            <Text numberOfLines={1} style={styles.currentMessage}>
              {lastMessage[0]?.displayName}:
              <Text style={styles.textMessage} numberOfLines={1}>
                {lastMessage[0]?.text}
              </Text>
            </Text>
            <Text style={styles.timeSend}>
              {formatDate(lastMessage[0]?.createdAt?.seconds)}
            </Text>
          </View>
        )}
      </View>
      {/* Mute Notification */}
      {muteNotification.includes(uid) ? (
        <Image
          source={ICON_MUTE_NOTIFICATION}
          style={[
            styles.iconMuted,
            {
              marginBottom: lastMessage.length === 0 ? 0 : 20,
            },
          ]}
          resizeMode="contain"
        />
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};
