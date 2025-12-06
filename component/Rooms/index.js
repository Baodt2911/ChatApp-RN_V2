import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import JOINGROUP from "../../assets/icon/join.png";
import CREATEGROUP from "../../assets/icon/create.png";
import styles from "./style";
import JoinRoom from "../JoinRoom";
import { AppContext } from "../../Context/AppUser";
import useFirestore from "../../hooks/useFirestore";
import { ItemRoom } from "../ItemRoom";
import ControllerRoom from "../ControllerRoom";
const Rooms = ({ navigation }) => {
  const {
    user: { uid },
  } = useContext(AppContext);
  const [isVisibleJoinRoom, setIsVisibleJoinRoom] = useState(false);
  const [isVisibleControllerRoom, setIsVisibleControllerRoom] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [muteNotification, setMuteNotification] = useState("");
  const onControllerRoom = (roomCode, muteNotification) => {
    setMuteNotification(muteNotification);
    setRoomCode(roomCode);
    setIsVisibleControllerRoom(!isVisibleControllerRoom);
  };
  const conditionRoom = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      value: uid,
    };
  }, [uid]);
  const sortOderRoom = useMemo(() => {
    return {
      fieldValue: "createdAt",
      sort: "desc",
    };
  }, []);
  const roomList = useFirestore("rooms", conditionRoom, sortOderRoom, false);
  const renderRoomList = useCallback(({ item }) => {
    return (
      <ItemRoom
        roomName={item?.roomName}
        roomCode={item?.roomCode}
        photoURL={item?.photoURL}
        muteNotification={item?.muteNotification}
        onLongPress={onControllerRoom}
      />
    );
  }, []);
  return (
    <SafeAreaView style={styles.conatiner}>
      <JoinRoom
        isVisible={isVisibleJoinRoom}
        handleCloseJoinRoom={() => setIsVisibleJoinRoom(!isVisibleJoinRoom)}
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btnIcon}
          onPress={() => setIsVisibleJoinRoom(!isVisibleJoinRoom)}
        >
          <Image source={JOINGROUP} resizeMode="contain" style={styles.icon} />
          <Text style={{ fontFamily: "SairaCondensed-Medium" }}>Vào nhóm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnIcon}
          onPress={() => navigation.navigate("CreateRoom")}
        >
          <Image
            source={CREATEGROUP}
            resizeMode="contain"
            style={styles.icon}
          />
          <Text style={{ fontFamily: "SairaCondensed-Medium" }}>Tạo nhóm</Text>
        </TouchableOpacity>
      </View>
      {!roomList ? (
        <ActivityIndicator
          size="large"
          color="gray"
          style={{ marginTop: 50 }}
        />
      ) : roomList.length === 0 ? (
        <Text
          style={{
            fontFamily: "SairaCondensed-Medium",
            fontSize: 20,
            marginTop: 50,
          }}
        >
          Bạn chưa vào nhóm nào
        </Text>
      ) : (
        <FlatList
          style={styles.listRooms}
          data={roomList}
          renderItem={renderRoomList}
          keyExtractor={(item) => item.id}
        />
      )}
      {/* ControllerRoom */}
      <ControllerRoom
        isVisible={isVisibleControllerRoom}
        roomCode={roomCode}
        muteNotification={muteNotification}
        handleCloseControllerRoom={() =>
          setIsVisibleControllerRoom(!isVisibleControllerRoom)
        }
      />
    </SafeAreaView>
  );
};

export default Rooms;
