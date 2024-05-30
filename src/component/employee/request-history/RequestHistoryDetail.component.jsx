import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontFamily } from "../../../../GlobalStyles";
import { Appbar, Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

const RequestHistoryDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  const handleHomeManager = () => {
    navigation.goBack();
    console.log(item);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Appbar.Header mode="center-aligned" style={styles.header}>
        <Appbar.BackAction onPress={handleHomeManager} />
        <Appbar.Content
          title="Request History Detail"
          titleStyle={styles.title}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{item.userResponse.fullName}</Text>
        </View>
        <View style={styles.divider}></View>

        {item.procurementDetailResponses.map((procurement, index) => (
          <View key={index}>
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>
                Item name: {procurement.itemResponse.name}
              </Text>
              <Text style={styles.itemText}>
                Quantity: {procurement.quantity}
              </Text>
            </View>
            <View style={styles.divider2}></View>
          </View>
        ))}

        {item.approvalResponses.map((approval, index) => (
          <View key={index}>
            <View style={styles.titleContainer}>
              <Text style={styles.statusText}>
                Manager: {approval.userResponse.fullName}
              </Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.statusText}>Status: {approval.status}</Text>
            </View>
            <View style={styles.titleContainer}>
              {approval.notes ? (
                <Text style={styles.statusText}>Notes: {approval.notes}</Text>
              ) : (
                <Text style={styles.statusText}>Notes: No notes</Text>
              )}
            </View>
            <View style={styles.divider2}></View>
          </View>
        ))}
        <View style={{ height: 400 }}></View>
      </View>
    </>
  );
};

export default RequestHistoryDetail;

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
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "lightgray",
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 20,
  },
  divider2: {
    height: 1,
    backgroundColor: "lightgray",
    marginHorizontal: 30,
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
    marginHorizontal: 30,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#4D869C",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 80,
  },
  buttonReject: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 80,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: FontFamily.soraMedium,
  },
  imageContainer: {
    height: 80,
    width: 80,
    borderRadius: 50,
    marginHorizontal: 30,
  },
  itemContainer: {
    marginHorizontal: 30,
    backgroundColor: "#CDE8E5",
    padding: 10,
    borderRadius: 10,
  },
  itemText: {
    fontFamily: FontFamily.soraRegular,
  },
});
