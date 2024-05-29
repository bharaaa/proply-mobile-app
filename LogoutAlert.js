import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { FontFamily } from "./GlobalStyles";
import { Button } from "react-native-paper";

const LogoutAlert = ({ isVisible, onClose, title, message, onYes, onNo }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.yesButton}
            onPress={() => {
              onYes();
              onClose();
            }}
          >
            <Text style={styles.yesButtonText}>Yes</Text>
          </Button>
          <Button
            style={styles.noButton}
            onPress={() => {
              onNo();
              onClose();
            }}
          >
            <Text style={styles.noButtonText}>No</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: FontFamily.soraMedium,
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: FontFamily.soraRegular,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  yesButton: {
    borderRadius: 10,
    width: 80,
    marginHorizontal: 10,
    borderColor: "#4D869C",
    borderWidth: 2
  },
  noButton: {
    backgroundColor: "#4D869C",
    borderRadius: 10,
    width: 80,
    marginHorizontal: 10
  },
  yesButtonText: {
    color: "#4D869C",
    fontSize: 14,
    fontFamily: FontFamily.soraRegular,
    textAlign: "center",
  },
  noButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: FontFamily.soraRegular,
    textAlign: "center",
  },
});

export default LogoutAlert;
