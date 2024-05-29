import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FontFamily } from "../../../../GlobalStyles";
import { useDispatch } from "react-redux";
import { getUsersAction } from "../../../app/feature/UserSlice";
import DropdownList from "./DropdownList";
import { addProcurementsAction } from "../../../app/feature/ProcurementRequestSlice";

const UserApproval = ({ route }) => {
  const [manager1, setManager1] = useState("");
  const [manager2, setManager2] = useState("");
  const [manager3, setManager3] = useState("");
  const [users, setUsers] = useState([]);
  const [visibleDropdowns, setVisibleDropdowns] = useState(0);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { procurementCategoryId, userId, itemIdQuantityPairs } = route.params;

  useEffect(() => {
    const fetchUsersManager = async () => {
      try {
        const res = await dispatch(getUsersAction());
        if (res.payload?.data) {
          const managers = res.payload.data.filter(
            (user) => user.userCredentialResponse.role === "ROLE_MANAGER"
          );

          const managerOptions = managers.map((manager) => ({
            label: manager.fullName,
            value: manager.userId,
          }));

          setUsers(managerOptions);
          console.log(managerOptions);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsersManager();
  }, [dispatch]);

  const handleHomeEmployee = () => {
    navigation.goBack();
  };

  const handleAddApproval = () => {
    if (visibleDropdowns < 3) {
      setVisibleDropdowns(visibleDropdowns + 1);
    } else {
      console.log("Maximum of 3 managers can be added");
    }
  };

  const getFilteredUsers = (selectedUserIds) => {
    return users.filter((user) => !selectedUserIds.includes(user.value));
  };

  const level = visibleDropdowns;

  const createRequest = () => {
    const approvalRequests = [manager1, manager2, manager3].map(userId => ({ userId }));
    dispatch(
      addProcurementsAction({
        userId,
        procurementCategoryId,
        procurementDetailRequests: itemIdQuantityPairs,
        approvalRequests,
        level,
      })
    );
    console.log("Success create request")
    navigation.navigate('ProcurementRequestSuccess')
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        <Appbar.Header mode="center-aligned" style={styles.header}>
          <Appbar.BackAction onPress={handleHomeEmployee} />
          <Appbar.Content title="Manager Approval" titleStyle={styles.title} />
        </Appbar.Header>
        <View style={styles.upperButtonContainer}>
          <Button
            mode="contained"
            onPress={handleAddApproval}
            style={styles.upperButton}
          >
            <Text style={styles.upperButtonText}>Add Approval</Text>
          </Button>
        </View>
        {visibleDropdowns > 0 && (
          <>
            <Text style={styles.formLabel}>Manager 1</Text>
            <DropdownList
              data={getFilteredUsers([manager2, manager3])}
              onValueChange={(value) => setManager1(value)}
              value={manager1}
            />
          </>
        )}
        {visibleDropdowns > 1 && (
          <>
            <Text style={styles.formLabel}>Manager 2</Text>
            <DropdownList
              data={getFilteredUsers([manager1, manager3])}
              onValueChange={(value) => setManager2(value)}
              value={manager2}
            />
          </>
        )}
        {visibleDropdowns > 2 && (
          <>
            <Text style={styles.formLabel}>Manager 3</Text>
            <DropdownList
              data={getFilteredUsers([manager1, manager2])}
              onValueChange={(value) => setManager3(value)}
              value={manager3}
            />
          </>
        )}
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.loginButtonContainer}>
          <Button
            mode="contained"
            onPress={createRequest}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Create Request</Text>
          </Button>
        </View>
      </View>
    </>
  );
};

export default UserApproval;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 80,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontFamily: FontFamily.soraSemiBold,
    fontSize: 20,
  },
  formLabel: {
    marginHorizontal: 30,
    fontFamily: FontFamily.soraRegular,
    fontSize: 12,
    marginVertical: 10,
  },
  formContainer: {
    marginHorizontal: 30,
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 2,
  },
  formText: {
    fontFamily: FontFamily.soraMedium,
    fontSize: 15,
    height: 50,
    backgroundColor: "#FFFFFF",
    marginLeft: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  inputNumberContainer: {
    flexDirection: "row",
  },
  widthSize: {
    width: 50,
    alignItems: "center",
  },
  tipsText: {
    width: 150,
    marginRight: 30,
  },
  image: {
    width: 60,
    height: 60,
  },
  divider: {
    height: 1,
    backgroundColor: "lightgray",
    marginHorizontal: 30,
    marginTop: 30,
    marginBottom: 20,
  },
  loginButtonContainer: {
    marginHorizontal: 30,
    marginVertical: 30,
  },
  loginButton: {
    backgroundColor: "#4D869C",
    borderRadius: 10,
    padding: 10,
  },
  loginButtonText: {
    fontSize: 20,
    fontFamily: FontFamily.soraSemiBold,
  },
  upperButtonContainer: {
    marginHorizontal: 30,
    marginBottom: 10,
  },
  upperButton: {
    backgroundColor: "#7AB2B2",
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 86,
  },
  upperButtonText: {
    fontSize: 17,
    fontFamily: FontFamily.soraSemiBold,
  },
  footerContainer: {
    backgroundColor: "#FFFFFF",
    height: 120,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    width: 80,
    alignItems: "center",
    marginRight: 10,
    marginTop: 15,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontFamily: FontFamily.soraSemiBold,
  },
  itemContainer: {
    marginHorizontal: 30,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "lightgray",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    marginHorizontal: 10,
    fontFamily: FontFamily.soraRegular,
    marginVertical: 2,
  },
});
