import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import { FontFamily } from "../../../GlobalStyles";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AuthService from "../../service/AuthService";
import CustomAlert from "../../../CustomAlert";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { forgotPasswordAction, loginAction } from "../../app/feature/AuthSlice";

const loginFormSchema = yup
  .object({
    email: yup.string().email().required("Email is Required"),
  })
  .required();

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    getFieldState,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(loginFormSchema),
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async ({ email }) => {
    try {
      console.log("Email", email);

      const res = await dispatch(forgotPasswordAction(email));
      console.log(res);
      if (forgotPasswordAction.fulfilled.match(res)) {
        navigation.navigate("ForgotPasswordSuccess");
      } else {
        setAlertMessage("Email not found in registered user");
        setAlertVisible(true);
      }
    } catch (err) {
      setAlertMessage("An error occurred. Please try again.");
      setAlertVisible(true);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Reset Password</Text>
        </View>
        <View style={styles.emailContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Email"
                value={value}
                onChangeText={onChange}
                mode="outlined"
                style={styles.emailText}
                activeOutlineColor="#4D869C"
                outlineStyle={{ borderRadius: 10, borderColor: "#626262" }}
                onBlur={onBlur}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialCommunityIcons
                        name={"email"}
                        size={20}
                        style={styles.icon}
                      />
                    )}
                    onPress={() => {}}
                  />
                }
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={styles.errors}>{errors.email.message}</Text>
          )}
        </View>
        <View style={styles.loginButtonContainer}>
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Send Email</Text>
          </Button>
          <CustomAlert
            isVisible={alertVisible}
            onClose={() => setAlertVisible(false)}
            title="Reset Password Failed"
            message={alertMessage}
            onConfirm={() => setAlertVisible(false)}
          />
        </View>
      </View>
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  welcomeContainer: {
    marginLeft: 30,
    marginRight: 100,
    marginTop: 30,
  },
  welcomeText: {
    fontFamily: FontFamily.plusJakartaSansBold,
    fontSize: 40,
  },
  emailContainer: {
    marginHorizontal: 30,
    marginTop: 60,
  },
  emailText: {
    fontFamily: FontFamily.soraMedium,
    fontSize: 15,
    height: 60,
    backgroundColor: "#F3F3F3",
  },
  passwordContainer: {
    marginHorizontal: 30,
    marginTop: 25,
  },
  passwordText: {
    fontSize: 15,
    height: 60,
    backgroundColor: "#F3F3F3",
  },
  loginButtonContainer: {
    marginTop: 100,
    marginHorizontal: 30,
    justifyContent: "center",
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
  dontHaveContainer: {
    marginTop: 60,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  dontHaveText1: {
    fontFamily: FontFamily.soraMedium,
    color: "gray",
  },
  dontHaveText2: {
    fontFamily: FontFamily.soraBold,
    color: "#4D869C",
  },
  errors: {
    fontFamily: FontFamily.soraRegular,
    fontSize: 12,
    color: "red",
    marginLeft: 5,
    marginTop: 5,
  },
  icon: {
    top: 5,
    color: "grey",
  },
  forgotPasswordContainer: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  forgotText: {
    fontFamily: FontFamily.soraMedium,
    fontSize: 13,
  },
});
