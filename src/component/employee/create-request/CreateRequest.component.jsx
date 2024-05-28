import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Appbar, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FontFamily } from '../../../../GlobalStyles';
import DropdownProcurementCategory from './DropdownProcurementCategory';
import { useDispatch, useSelector } from 'react-redux';
import { getByEmailAction } from '../../../app/feature/UserSlice';
import { loginAction } from '../../../app/feature/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { getProcurementCategoryAction } from '../../../app/feature/ProcurementCategorySlice';

const CreateRequest = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [dropdownValue, setDropdownValue] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [procurementCategories, setProcurementCategories] = useState([]);

  const handleHomeEmployee = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchEmailFromToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decodedToken = jwtDecode(token);
          const email = decodedToken.email;
          setEmail(email);
          console.log('Email:', email);
          const res = await dispatch(getByEmailAction(email));
          const userId = res?.payload?.data?.userId;
          if (userId) {
            setUserId(userId);
            console.log('UserId:', userId);
          } else {
            console.log('UserId not found in response');
          }
        }
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    };

    const fetchProcurementCategory = async () => {
      try {
        const res = await dispatch(getProcurementCategoryAction());
        if (res.payload?.data) {
          const categories = res.payload.data.map(category => ({
            label: category.name,
            value: category.procurementCategoryId
          }));
          setProcurementCategories(categories);
        }
      } catch (error) {
        console.error('Failed to fetch procurement categories:', error);
      }
    };

    fetchEmailFromToken();
    fetchProcurementCategory();
  }, [dispatch]);

  const handleNext = () => {
    if (!dropdownValue || !userId) {
      console.log('Please select a value from the dropdown');
      return;
    }

    if (selectedCategoryName === 'Goods Procurement') {
      navigation.navigate('CreateRequestGoods', { procurementCategoryId: dropdownValue, userId });
    } else if (selectedCategoryName === 'Funds Procurement') {
      navigation.navigate('CreateRequestFunds', { procurementCategoryId: dropdownValue, userId });
    } else {
      console.log('Invalid category selected');
    }
  };

  const handleDropdownChange = (value, label) => {
    setDropdownValue(value);
    setSelectedCategoryName(label);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        <Appbar.Header mode="center-aligned" style={styles.header}>
          <Appbar.BackAction onPress={handleHomeEmployee} />
          <Appbar.Content title="Create Request" titleStyle={styles.title} />
        </Appbar.Header>
        <Text style={styles.formLabel}>Procurement Category</Text>
        <DropdownProcurementCategory data={procurementCategories} onValueChange={handleDropdownChange} />
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleNext} style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </Button>
        </View>
      </View>
    </>
  );
};

export default CreateRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 80,
    backgroundColor: '#FFFFFF',
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
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#4D869C',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 80,
  },
  buttonText: {
    fontFamily: FontFamily.soraRegular,
    fontSize: 16,
    color: '#FFFFFF',
  },
});
