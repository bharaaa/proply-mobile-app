import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { FontFamily } from '../../../../GlobalStyles'
import { Appbar, Button } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { approveProcurementsAction, rejectProcurementsAction } from '../../../app/feature/ProcurementListSlice'

const ProcurementListDetail = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute();
  const { item } = route.params;

  const handleHomeManager = () => {
    navigation.goBack()
  }

  const handleApproved = () => {
    dispatch(approveProcurementsAction(item.procurementId))
    navigation.navigate('ProcurementListApproved');
  };

  const handleRejected = () => {
    dispatch(rejectProcurementsAction(item.procurementId))
    navigation.navigate('ProcurementListRejected')
  }

  const { procurements } = useSelector((state) => state.procurements);

  useEffect(() => {
    console.log(procurements);
  }, [procurements]);

  const renderDetailItem = ({ item }) => (
    <View style={styles.detailContainer}>
      <Text style={styles.detailText}>
        Item: {item.itemResponse.name}, Quantity: {item.quantity} , Status: {item.status}
      </Text>
      <Text style={styles.detailText}>
        Notes: {item.notes}
      </Text>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Appbar.Header mode='center-aligned' style={styles.header}>
        <Appbar.BackAction onPress={handleHomeManager} />
        <Appbar.Content title="Procurement Detail" titleStyle={styles.title} />
      </Appbar.Header>
      <View style={styles.container}>
        <View>
          <Image source={{ uri: item.userResponse.profileImageUrl }} style={styles.imageContainer}/>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{item.userResponse.fullName}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.divisionText}>{item.userResponse.divisionResponse.name} Division</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.titleContainer}>
          <Text style={styles.statusText}>{item.procurementCategoryResponse.name}</Text>
        </View>
        <FlatList
          data={item.procurementDetailResponses}
          renderItem={renderDetailItem}
          keyExtractor={(detail) => detail.procurementDetailId}
          contentContainerStyle={styles.listContainer}
          style= {styles.listDetail}
        />
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleApproved} style={styles.button}>
            <Text style={styles.buttonText}>Approve</Text>
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleRejected} style={styles.buttonReject}>
            <Text style={styles.buttonText}>Reject</Text>
          </Button>
        </View>
      </View>
    </>
  );
}

export default ProcurementListDetail

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontFamily: FontFamily.soraSemiBold,
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleContainer: {
    height: 40,
    justifyContent: 'center',
    marginHorizontal: 30
  },
  titleText: {
    fontFamily: FontFamily.soraSemiBold,
    fontSize: 23
  },
  statusText: {
    fontFamily: FontFamily.soraSemiBold,
    fontSize: 18
  },
  divider: {
    height: 1,
    backgroundColor: 'lightgray',
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 20
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 30,
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#4D869C',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 80
  },
  buttonReject: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 80
  },
  buttonText: {
    fontSize: 18,
    fontFamily: FontFamily.soraMedium
  },
  itemContainer: {
    backgroundColor: 'cyan',
    height: 70,
  },
  itemText: {
    marginHorizontal: 30,
    fontFamily: FontFamily.soraRegular
  },
  listDetail: {
    marginHorizontal: 30
  },
  divisionText: {
    fontFamily: FontFamily.soraMedium,
    fontSize: 16
  },
  detailText: {
    fontFamily: FontFamily.soraRegular
  },
  detailContainer: {
  },
  imageContainer: {
    height: 80,
    width: 80,
    borderRadius: 50,
    marginHorizontal: 30
  }
})