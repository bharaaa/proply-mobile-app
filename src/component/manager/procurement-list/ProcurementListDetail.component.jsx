import { FlatList, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontFamily } from '../../../../GlobalStyles'
import { Appbar, Button } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'

const ProcurementListDetail = () => {
  const navigation = useNavigation()
  const route = useRoute();
  const { item } = route.params;

  const handleHomeManager = () => {
    navigation.goBack()
  }

  const renderItem = ({ item }) => (
    <Button 
    mode="contained" 
    key={item.procurementDetailResponses.procurementDetailId}
    onPress={() => {
      const { onPress, ...itemWithoutOnPress } = item;
      navigation.navigate("ProcurementListDetail", { item: itemWithoutOnPress });
    }}
    style={styles.button}
    >
      <Text style={styles.buttonText}>{item.procurementDetailResponses.procurementDetailId} Division, {item.userResponse.fullName}</Text>
    </Button>
  );

  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
    <Appbar.Header
    mode='center-aligned'
    style={styles.header}
    >
      <Appbar.BackAction onPress={handleHomeManager} />
      <Appbar.Content title="Procurement Detail" titleStyle={styles.title}/>
    </Appbar.Header>
    <ScrollView showsVerticalScrollIndicator= {false}>      
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{item.userResponse.fullName}</Text>
      </View>
      <View style={styles.divider}></View>
      <View style={styles.titleContainer}>
        <Text style={styles.statusText}>{item.procurementCategoryResponse.name}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>Item</Text>
        <FlatList
        data={procurements}
        renderItem={renderItem}
        keyExtractor={(item) => item.procuremendId}
        showsVerticalScrollIndicator= {false}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.statusText}>Status: {item.procurementDetailResponses.status}</Text>
      </View>
      <View style={{height: 400}}></View>
      <View style={styles.buttonContainer}>
          <Button 
          mode="contained" 
          onPress={() => console.log("Approve Clicked")}
          style={styles.button}
          >
            <Text style={styles.buttonText}>Approve</Text>
          </Button>
      </View>
      <View style={styles.buttonContainer}>
          <Button 
          mode="contained" 
          onPress={() => console.log("Reject Clicked")}
          style={styles.buttonReject}
          >
            <Text style={styles.buttonText}>Reject</Text>
          </Button>
      </View>
    </View>
    </ScrollView>
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
  }
})