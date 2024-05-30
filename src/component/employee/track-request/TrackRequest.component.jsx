import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FontFamily } from "../../../../GlobalStyles";
import { FontAwesome6 } from "@expo/vector-icons";
import { Appbar, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getByEmailAction } from "../../../app/feature/UserSlice";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getProcurementsByUserIdAction } from "../../../app/feature/ProcurementListSlice";
dayjs.extend(relativeTime);

const TrackRequest = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [filteredProcurements, setFilteredProcurements] = useState([]);

  const handleHomeManager = () => {
    navigation.goBack();
  };

  const { procurements, isLoading, error } = useSelector(
    (state) => state.procurements
  );

  useEffect(() => {
    const fetchEmailFromToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const email = decodedToken.email;
          setEmail(email);
          console.log("Email:", email);
          const res = await dispatch(getByEmailAction(email));
          const userId = res?.payload?.data?.userId;
          if (userId) {
            setUserId(userId);
            console.log("UserId:", userId);
            dispatch(getProcurementsByUserIdAction(userId));
          } else {
            console.log("UserId not found in response");
          }
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    };

    fetchEmailFromToken();
  }, [dispatch]);

  useEffect(() => {
    if (userId && procurements) {
      const filtered = procurements.filter((procurement) =>
        procurement.approvalResponses.some(
          (response) =>
            response.status === "PENDING"
        )
      );
      setFilteredProcurements(filtered);
      console.log("Filtered Procurements:", filtered);
    }
  }, [userId, procurements]);

  const renderItem = ({ item }) => {
    return (
      <Button
        mode="contained"
        key={item.procurementId}
        onPress={() => {
          const { onPress, ...itemWithoutOnPress } = item;
          navigation.navigate("TrackRequestDetail", {
            item: itemWithoutOnPress,
          });
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {item.userResponse.divisionResponse.name} Division,{" "}
          {item.userResponse.fullName}
        </Text>
      </Button>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Appbar.Header mode="center-aligned" style={styles.header}>
        <Appbar.BackAction onPress={handleHomeManager} />
        <Appbar.Content title="Track Request" titleStyle={styles.title} />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Text style={styles.tipsText}>
            Track the status of ongoing request
          </Text>
          {isLoading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : error ? (
            <Text style={styles.errorText}>Error: {error}</Text>
          ) : filteredProcurements.length === 0 ? (
            <Text style={styles.noRequestText}>No ongoing request</Text>
          ) : (
            <FlatList
              data={filteredProcurements}
              renderItem={renderItem}
              keyExtractor={(item) => item.procurementId}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default TrackRequest;

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontFamily: FontFamily.soraSemiBold,
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "red",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    textAlign: "center",
    fontFamily: FontFamily.soraSemiBold,
    marginLeft: 200,
  },
  tipsText: {
    textAlign: "center",
    fontFamily: FontFamily.soraRegular,
    color: "#898989",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 30,
    marginHorizontal: 30,
  },
  buttonContainer: {
    justifyContent: "flex-start",
    paddingBottom: 100,
  },
  button: {
    backgroundColor: "#CDE8E5",
    borderRadius: 10,
    height: 60,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  buttonText: {
    textAlign: "left",
    color: "black",
    fontSize: 12,
    fontFamily: FontFamily.soraSemiBold,
  },
  noRequestText: {
    textAlign: "center",
    fontFamily: FontFamily.soraRegular,
    color: "#898989",
    fontSize: 12,
    marginTop: 250,
  },
  loadingText: {
    textAlign: "center",
    fontFamily: FontFamily.soraRegular,
    color: "#898989",
    fontSize: 12,
    marginTop: 250,
  },
});
