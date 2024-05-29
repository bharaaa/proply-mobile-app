import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProfilePhoto from "../../../assets/profile.png";
import { FontFamily } from "../../../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { getByEmailAction } from "../../app/feature/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import CustomAlert from "../../../CustomAlert";
import LogoutAlert from "../../../LogoutAlert";

const AccountProfile = () => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [role, setRole] = useState("");
  const navigation = useNavigation();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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
          const userData = res?.payload?.data;
          if (userData) {
            setFullName(userData.fullName);
            setUserId(userData.userId);
            setGender(userData.gender);
            setRole(userData.userCredentialResponse.role)
            setProfileImageUrl(userData.profileImageUrl);
            setMaritalStatus(userData.maritalStatus);
          }
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    };

    fetchEmailFromToken();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      setAlertVisible(true);
    } catch (error) {
      console.error("Failed to show alert:", error);
    }
  };

  const handleYes = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const handleNo = () => {};

  return (
    <>
      <StatusBar barStyle="default" backgroundColor="#313131" />
      <View style={styles.headerContainer}>
        <View style={styles.helloContainer}>
          <Text style={styles.helloText}>Profile</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.photoContainer}>
            <Image
              source={profileImageUrl ? { uri: profileImageUrl } : ProfilePhoto}
              style={styles.profilePhoto}
            />
          </View>
          <View style={styles.personalDetailContainer}>
            <Text style={styles.personalDetailText}>Personal Details</Text>
            <View>
              <Text style={styles.emailAddressText}>Email Address</Text>
            </View>
            <View style={styles.emailContainer}>
              <Text style={styles.textInContainer}>{email}</Text>
            </View>
            <View>
              <Text style={styles.emailAddressText}>Full Name</Text>
            </View>
            <View style={styles.emailContainer}>
              <Text style={styles.textInContainer}>{fullName}</Text>
            </View>
            <View>
              <Text style={styles.emailAddressText}>Gender</Text>
            </View>
            <View style={styles.emailContainer}>
              <Text style={styles.textInContainer}>{gender}</Text>
            </View>
            <View>
              <Text style={styles.emailAddressText}>Marital Status</Text>
            </View>
            <View style={styles.emailContainer}>
              <Text style={styles.textInContainer}>{maritalStatus}</Text>
            </View>
            <View>
              <Text style={styles.emailAddressText}>Role</Text>
            </View>
            <View style={styles.emailContainer}>
              <Text style={styles.textInContainer}>{role}</Text>
            </View>
            <View style={styles.logoutButtonContainer}>
              <Button
                mode="contained"
                onPress={handleLogout}
                style={styles.logoutButton}
              >
                <Text style={styles.logoutButtonText}>Log Out</Text>
              </Button>
              <LogoutAlert
                isVisible={alertVisible}
                onClose={() => setAlertVisible(false)}
                title="Are you sure to Log Out?"
                message="Logging out will require you to log in again."
                onYes={handleYes}
                onNo={handleNo}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default AccountProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  photoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  profilePhoto: {
    height: 110,
    width: 110,
    borderRadius: 50,
  },
  helloContainer: {
    flexDirection: "row",
    height: 60,
    borderRadius: 10,
    marginHorizontal: 30,
    marginVertical: 20,
    alignItems: "center",
  },
  headerContainer: {
    backgroundColor: "#313131",
    height: 120,
    justifyContent: "center",
  },
  helloText: {
    fontFamily: FontFamily.soraSemiBold,
    fontSize: 25,
    color: "#FFFFFF",
  },
  personalDetailContainer: {
    marginHorizontal: 30,
    marginVertical: 25,
  },
  personalDetailText: {
    fontFamily: FontFamily.soraSemiBold,
    fontSize: 19,
  },
  emailAddressText: {
    fontFamily: FontFamily.soraRegular,
    fontSize: 12,
    marginTop: 10,
  },
  emailContainer: {
    backgroundColor: "transparent",
    height: 60,
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 10,
    borderColor: "#C8C8C8",
    borderWidth: 2,
  },
  textInContainer: {
    marginLeft: 20,
    fontFamily: FontFamily.soraRegular,
  },
  logoutButtonContainer: {
    marginTop: 30,
    marginHorizontal: 100,
    justifyContent: "center",
  },
  logoutButton: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
  },
  logoutButtonText: {
    fontSize: 15,
    fontFamily: FontFamily.soraRegular,
  },
});
