import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontFamily } from '../../../../GlobalStyles'
import { FontAwesome6 } from '@expo/vector-icons'
import { Appbar, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const procurementRequestData = [
  { id: '1', title: 'List 1', description: 'Description for List 1', status: 'Pending', onPress: () => console.log('Notification 1 Pressed') },
  { id: '2', title: 'List 2', description: 'Description for List 2', status: 'Pending', onPress: () => console.log('Notification 2 Pressed') },
  { id: '3', title: 'List 3', description: 'Description for List 3', status: 'Pending', onPress: () => console.log('Notification 3 Pressed') },
  { id: '4', title: 'List 4', description: 'Description for List 4', status: 'Pending', onPress: () => console.log('Notification 4 Pressed') },
  { id: '5', title: 'List 5', description: 'Description for List 5', status: 'Pending', onPress: () => console.log('Notification 5 Pressed') },
  { id: '6', title: 'List 6', description: 'Description for List 6', status: 'Pending', onPress: () => console.log('Notification 6 Pressed') },
  { id: '7', title: 'List 7', description: 'Description for List 7', status: 'Pending', onPress: () => console.log('Notification 7 Pressed') },
  { id: '8', title: 'List 8', description: 'Description for List 8', status: 'Pending', onPress: () => console.log('Notification 8 Pressed') },
  { id: '9', title: 'List 1', description: 'Description for List 1', status: 'Pending', onPress: () => console.log('Notification 1 Pressed') },
  { id: '10', title: 'List 2', description: 'Description for List 2', status: 'Pending', onPress: () => console.log('Notification 2 Pressed') },
  { id: '11', title: 'List 3', description: 'Description for List 3', status: 'Pending', onPress: () => console.log('Notification 3 Pressed') },
  { id: '12', title: 'List 4', description: 'Description for List 4', status: 'Pending', onPress: () => console.log('Notification 4 Pressed') },
  { id: '13', title: 'List 5', description: 'Description for List 5', status: 'Pending', onPress: () => console.log('Notification 5 Pressed') },
  { id: '14', title: 'List 6', description: 'Description for List 6', status: 'Pending', onPress: () => console.log('Notification 6 Pressed') },
];

const ProcurementList = () => {
  const navigation = useNavigation()

  const handleHomeManager = () => {
    navigation.goBack()
  }

  const renderItem = ({ item }) => (
    <Button 
    mode="contained" 
    key={item.id}
    onPress={() => {
      const { onPress, ...itemWithoutOnPress } = item;
      navigation.navigate("ProcurementListDetail", { item: itemWithoutOnPress });
    }}
    style={styles.button}
    >
      <Text style={styles.buttonText}>{item.title}</Text>
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
      <Appbar.Content title="Procurement List" titleStyle={styles.title}/>
    </Appbar.Header>
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
      <Text style={styles.tipsText}>Manage all procurement request, 
      here you can see a list of request from each employee</Text>
        <FlatList
        data={procurementRequestData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator= {false}
        />
      </View>
    </View>
    </>
  );
}

export default ProcurementList

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
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: 'red',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    textAlign: 'center',
    fontFamily: FontFamily.soraSemiBold,
    marginLeft: 200
  },
  tipsText: {
    textAlign: 'center',
    fontFamily: FontFamily.soraRegular,
    color: '#898989',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 30,
    marginHorizontal: 30
  },
  buttonContainer: {
    justifyContent: 'flex-start',
    paddingBottom: 100
  },
  button: {
    backgroundColor: '#CDE8E5',
    borderRadius: 10,
    height: 60,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 30
  },
  buttonText: {
    textAlign: 'left',
    color: 'black',
    fontSize: 16,
    fontFamily: FontFamily.soraSemiBold
  },
})