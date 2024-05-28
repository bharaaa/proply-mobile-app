import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { FontFamily } from "../../../../GlobalStyles";
import DropdownItemCategory from "./DropdownItemCategory";
import AddButton from "../../../../assets/addbutton.png";
import { useDispatch } from "react-redux";
import { getItemCategoryAction } from "../../../app/feature/ItemCategorySlice";

const CreateRequestGoods = ({ route }) => {
  const [dropdownValue, setDropdownValue] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [itemCategories, setItemCategories] = useState([]);
  const { procurementCategoryId, userId } = route.params;

  useEffect(() => {
    console.log("Procurement Category ID:", procurementCategoryId);
    console.log("User ID:", userId);
    dispatch(getItemCategoryAction())
  }, [procurementCategoryId, userId]);

  const handleHomeEmployee = () => {
    navigation.goBack();
  };

  const handleDropdownChange = (value, label) => {
    setDropdownValue(value);
    setSelectedCategoryName(label);
  };

  const handleAdd = () => {
    if (dropdownValue === "1") {
      itemCategoryId = "b62c5517-cee4-4286-8bb3-04898b43ccd1"; //ID Furniture
      console.log("Furniture", itemCategoryId)
    } else if (dropdownValue === "2") {
      itemCategoryId = "4535ffbe-e236-4ca2-96db-0efdfeff9d34"; //ID Stationery
      console.log("Stationery", itemCategoryId)
    } else if (dropdownValue === "3") {
      itemCategoryId = "6a732d93-409d-419a-860b-a91b26215761"; //ID Electronic
      console.log("Electronic", itemCategoryId)
    } else {
      console.log("Please select a value from the dropdown");
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        <Appbar.Header mode="center-aligned" style={styles.header}>
          <Appbar.BackAction onPress={handleHomeEmployee} />
          <Appbar.Content title="Create Request" titleStyle={styles.title} />
        </Appbar.Header>
        <Text style={styles.formLabel}>Item Category</Text>
        <DropdownItemCategory onValueChange={setDropdownValue} />
        <Text style={styles.formLabel}>Item Name</Text>
        <View style={styles.formContainer}>
          <TextInput placeholder="Item Name" style={styles.formText} />
        </View>
        <Text style={styles.formLabel}>Quantity</Text>
        <View style={styles.inputNumberContainer}>
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Qty"
              style={[styles.widthSize, styles.formText]}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.tipsText}>
            <Text>*Insert the quantity of item</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={handleAdd}>
            <Image source={AddButton} style={styles.image} />
          </TouchableOpacity>
        </View>
        <View style={styles.divider}></View>
      </View>
    </>
  );
};

export default CreateRequestGoods;

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
});
