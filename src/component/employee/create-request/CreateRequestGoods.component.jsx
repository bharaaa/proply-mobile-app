import {
  Image,
  ScrollView,
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
import DropdownItemName from "./DropDownItemName";
import { getItemNameAction } from "../../../app/feature/ItemNameSlice";

const CreateRequestGoods = ({ route }) => {
  const [categoryDropdownValue, setCategoryDropdownValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [itemCategories, setItemCategories] = useState([]);

  const [nameDropdownValue, setNameDropdownValue] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [itemNames, setItemNames] = useState([]);

  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { procurementCategoryId, userId } = route.params;

  useEffect(() => {
    console.log("Procurement Category ID:", procurementCategoryId);
    console.log("User ID:", userId);

    const fetchItemCategory = async () => {
      try {
        const res = await dispatch(getItemCategoryAction());
        if (res.payload?.data) {
          const categories = res.payload.data.map((category) => ({
            label: category.name,
            value: category.itemCategoryId,
          }));
          setItemCategories(categories);
        }
      } catch (error) {
        console.error("Failed to fetch item categories:", error);
      }
    };

    const fetchItemName = async () => {
      try {
        const res = await dispatch(getItemNameAction());
        if (res.payload?.data) {
          const names = res.payload.data.map((name) => ({
            label: name.name,
            value: name.itemId,
          }));
          console.log(names);
          setItemNames(names);
        }
      } catch (error) {
        console.error("Failed to fetch item categories:", error);
      }
    };

    fetchItemName();
    fetchItemCategory();
  }, [dispatch]);

  useEffect(() => {
    console.log("Items updated:", items);
  }, [items]);

  const handleHomeEmployee = () => {
    navigation.goBack();
  };

  const handleCategoryDropdownChange = (value, label) => {
    setCategoryDropdownValue(value);
    console.log(value);
    setSelectedCategory(label);
  };

  const handleNameDropdownChange = (value, label) => {
    setNameDropdownValue(value);
    console.log(value);
    setSelectedName(label);
  };

  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const ItemDisplay = ({ item, onDelete, index }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemText}>Category: {item.categoryLabel}</Text>
        <Text style={styles.itemText}>Name: {item.itemName}</Text>
        <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => onDelete(index)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleAdd = () => {
    if (!categoryDropdownValue || !userId) {
      console.log("Please select a value from the category dropdown");
      return;
    }

    console.log(`${selectedCategory} selected with ID:`, categoryDropdownValue);

    if (!nameDropdownValue) {
      console.log("Please select a value from the name dropdown");
      return;
    }

    console.log(`${selectedName} selected with ID:`, nameDropdownValue);

    if (!categoryDropdownValue || !nameDropdownValue || !quantity) {
      console.log("Please ensure all fields are selected/filled.");
      return;
    }
    const newItem = {
      categoryId: categoryDropdownValue,
      categoryLabel: selectedCategory,
      itemId: nameDropdownValue,
      itemName: selectedName,
      quantity: quantity,
    };
    setItems([...items, newItem]);
    setQuantity("");
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
        <DropdownItemCategory
          data={itemCategories}
          onValueChange={handleCategoryDropdownChange}
          value={categoryDropdownValue}
        />
        <Text style={styles.formLabel}>Item Name</Text>
        <DropdownItemName
          data={itemNames}
          onValueChange={handleNameDropdownChange}
          value={nameDropdownValue}
        />
        <Text style={styles.formLabel}>Quantity</Text>
        <View style={styles.inputNumberContainer}>
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Qty"
              value={quantity}
              onChangeText={setQuantity}
              style={[styles.widthSize, styles.formText]}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.tipsText}>
            <Text style={{ fontFamily: FontFamily.soraRegular }}>
              *Insert the quantity of item
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={handleAdd}>
            <Image source={AddButton} style={styles.image} />
          </TouchableOpacity>
        </View>
        <View style={styles.divider}></View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {items.map((item, index) => (
            <ItemDisplay
              key={index}
              item={item}
              index={index}
              onDelete={handleDelete}
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.loginButtonContainer}>
          <Button
            mode="contained"
            onPress={() => console.log("Clicked")}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Create Request</Text>
          </Button>
        </View>
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
  footerContainer: {
    backgroundColor: "#FFFFFF",
    height: 120
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    width: 80,
    alignItems: 'center',
    marginRight: 10,
    marginTop: 15
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemText: {
    marginHorizontal: 10,
    fontFamily: FontFamily.soraRegular,
    marginVertical: 2
  },
});
