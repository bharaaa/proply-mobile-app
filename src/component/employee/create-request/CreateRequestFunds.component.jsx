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
import AddButton from "../../../../assets/addbutton.png";

const CreateRequestFunds = ({ route }) => {
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();
  const { procurementCategoryId, userId } = route.params;

  useEffect(() => {
    console.log("Procurement Category ID:", procurementCategoryId);
    console.log("User ID:", userId);
  }, [procurementCategoryId, userId]);

  const handleHomeEmployee = () => {
    navigation.goBack();
  };

  const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const ItemDisplay = ({ item, onDelete, index }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemText}>Nominal: {formatToRupiah(item.quantity)}</Text>
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
    if (!quantity) {
      setErrorMessage("Nominal cannot be empty");
      return;
    }

    const newItem = {
      categoryId: null,
      categoryLabel: null,
      itemId: null,
      itemName: null,
      quantity: quantity,
    };
    setItems([...items, newItem]);
    setQuantity("");
    setErrorMessage("");
  };

  const handleSubmit = () => {
    if (items.length === 0) {
      setErrorMessage("You must add item first");
      return;
    }

    const itemIdQuantityPairs = items.map((item) => ({
      itemId: item.itemId,
      quantity: item.quantity,
    }));
    console.log(itemIdQuantityPairs)
    
    navigation.navigate('UserApproval', {
      procurementCategoryId: procurementCategoryId,
      userId: userId,
      itemIdQuantityPairs: itemIdQuantityPairs
    });
  };

  const handleDelete = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        <Appbar.Header mode="center-aligned" style={styles.header}>
          <Appbar.BackAction onPress={handleHomeEmployee} />
          <Appbar.Content title="Create Request" titleStyle={styles.title} />
        </Appbar.Header>
        <Text style={styles.formLabel}>Nominal</Text>
        <View style={styles.inputNumberContainer}>
        <View style={styles.formContainer}>
            <TextInput
              placeholder="Nominal"
              value={quantity}
              onChangeText={setQuantity}
              style={[styles.widthSize, styles.formText]}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={handleAdd}>
            <Image source={AddButton} style={styles.image} />
          </TouchableOpacity>
        </View>
        <View style={styles.tipsText}>
          <Text style={{ fontFamily: FontFamily.soraRegular, color: 'gray' }}>
            *Insert the nominal in Rupiah
          </Text>
        </View>
        <View style={styles.divider}></View>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
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
        <View style={styles.footerContainer}></View>
        <View style={styles.loginButtonContainer}>
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Next</Text>
          </Button>
        </View>
      </View>
    </>
  );
};

export default CreateRequestFunds;

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
    width: 250,
    alignItems: "center",
  },
  tipsText: {
    marginHorizontal: 30,
    marginTop: 10,
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
  },
  errorText: {
    textAlign: 'center',
    fontFamily: FontFamily.soraRegular,
    marginTop: 100
  },
  itemContainer: {
    marginHorizontal: 30,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "lightgray",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10
  },
  itemText: {
    marginHorizontal: 10,
    fontFamily: FontFamily.soraRegular,
    marginVertical: 2,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
    width: 80,
    alignItems: "center"
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontFamily: FontFamily.soraSemiBold,
  },
});
