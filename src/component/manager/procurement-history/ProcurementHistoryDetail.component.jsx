import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontFamily } from "../../../../GlobalStyles";
import { Appbar, Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  approveProcurementsAction,
  rejectProcurementsAction,
} from "../../../app/feature/ProcurementListSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfilePhoto from "../../../../assets/profile.png";

const ProcurementHistoryDetail = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  const handleHomeManager = () => {
    navigation.goBack();
  };

  const [approvalStatus, setApprovalStatus] = useState({});

  const loadApprovalStatus = async () => {
    try {
      const savedStatus = await AsyncStorage.getItem(
        `approvalStatus-${item.procurementId}`
      );
      if (savedStatus) {
        setApprovalStatus(JSON.parse(savedStatus));
      }
    } catch (error) {
      console.log("Failed to load approval status:", error);
    }
  };

  const saveApprovalStatus = async (status) => {
    try {
      await AsyncStorage.setItem(
        `approvalStatus-${item.procurementId}`,
        JSON.stringify(status)
      );
    } catch (error) {
      console.log("Failed to save approval status:", error);
    }
  };

  useEffect(() => {
    loadApprovalStatus();
  }, []);

  const handleApproved = (procurementDetailId) => {
    const procurementId = item.procurementId;
    console.log("ID: ", procurementId, "ID Detail", procurementDetailId);
    dispatch(approveProcurementsAction({ procurementId, procurementDetailId }));
    const updatedStatus = {
      ...approvalStatus,
      [procurementDetailId]: "Approved",
    };
    setApprovalStatus(updatedStatus);
    saveApprovalStatus(updatedStatus);
    console.log("Approved");
  };

  const { procurements } = useSelector((state) => state.procurements);

  useEffect(() => {
    console.log(procurements);
  }, [procurements]);

  const renderDetailItem = ({ item }) => (
    <View style={styles.detailContainer}>
      {item.itemResponse && (
        <Text style={styles.detailText}>Item: {item.itemResponse.name}</Text>
      )}
      <Text style={styles.detailText}>Quantity: {item.quantity}</Text>
      <View style={styles.buttonContainer}>
        {approvalStatus[item.procurementDetailId] ? (
          <Text style={styles.statusText}>
            {approvalStatus[item.procurementDetailId]}
          </Text>
        ) : null}
      </View>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Appbar.Header mode="center-aligned" style={styles.header}>
        <Appbar.BackAction onPress={handleHomeManager} />
        <Appbar.Content
          title="Procurement History Detail"
          titleStyle={styles.title}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <View>
          <Image
            source={
              item.userResponse.profileImageUrl
                ? { uri: item.userResponse.profileImageUrl }
                : ProfilePhoto
            }
            style={styles.imageContainer}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{item.userResponse.fullName}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.divisionText}>
            {item.userResponse.divisionResponse.name} Division
          </Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.titleContainer}>
          <Text style={styles.statusText}>
            {item.procurementCategoryResponse.name}
          </Text>
        </View>
        <FlatList
          data={item.procurementDetailResponses}
          renderItem={renderDetailItem}
          keyExtractor={(detail) => detail.procurementDetailId}
          style={styles.listDetail}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <Text style={styles.statusText}>Approval</Text>
          </View>
          {item.approvalResponses.map((approval, index) => (
            <View key={index}>
              <View style={styles.titleContainer}>
                <Text style={styles.statusText2}>
                  Manager: {approval.userResponse.fullName}
                </Text>
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.statusText2}>
                  Status: {approval.status}
                </Text>
              </View>
              <View style={styles.titleContainer}>
                {approval.notes ? (
                  <Text style={styles.statusText2}>
                    Notes: {approval.notes}
                  </Text>
                ) : (
                  <Text style={styles.statusText2}>Notes: No notes</Text>
                )}
              </View>
              <View style={styles.divider2}></View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default ProcurementHistoryDetail;

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
  titleContainer: {
    height: 40,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  titleText: {
    fontFamily: FontFamily.soraSemiBold,
    fontSize: 23,
  },
  statusText: {
    fontFamily: FontFamily.soraSemiBold,
    fontSize: 20,
  },
  statusText2: {
    fontFamily: FontFamily.soraRegular,
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "lightgray",
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#4D869C",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 80,
    marginBottom: 30,
  },
  buttonReject: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 80,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: FontFamily.soraMedium,
  },
  itemContainer: {
    backgroundColor: "cyan",
    height: 70,
  },
  itemText: {
    marginHorizontal: 30,
    fontFamily: FontFamily.soraRegular,
  },
  listDetail: {
    marginHorizontal: 30,
  },
  divisionText: {
    fontFamily: FontFamily.soraMedium,
    fontSize: 16,
  },
  detailText: {
    fontFamily: FontFamily.soraRegular,
    fontSize: 15,
  },
  detailContainer: {
    borderWidth: 2,
    borderColor: "lightgray",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  imageContainer: {
    height: 80,
    width: 80,
    borderRadius: 50,
    marginHorizontal: 30,
  },
  divider2: {
    height: 1,
    backgroundColor: "lightgray",
    marginHorizontal: 30,
    marginVertical: 10,
  },
  divider2: {
    height: 1,
    backgroundColor: "lightgray",
    marginHorizontal: 30,
    marginVertical: 10,
  },
});
