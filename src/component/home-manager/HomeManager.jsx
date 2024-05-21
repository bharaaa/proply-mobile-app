import { StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { FontFamily } from '../../../GlobalStyles'
import { Button } from 'react-native-paper'

const HomeManager = () => {
  return (
    <>
    <StatusBar barStyle="default" backgroundColor="#313131" />
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <View style={styles.searchInputContainer}>
                <Text style={styles.helloText}>Hello!</Text>
            </View>
        </View>
        <View style={styles.ButtonContainer}>
          <Button 
          mode="contained" 
          style={styles.listButton}
          onPress={() => console.log('Pressed')}
          >
            <Text style={styles.listButtonText}>Procurement List</Text>
          </Button>
          <Button 
          mode="contained" 
          style={styles.listButton}
          onPress={() => console.log('Pressed')}
          >
            <Text style={styles.listButtonText}>Procurement History</Text>
          </Button>
        </View>
    </View>
    </>
  )
}

export default HomeManager

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9'
    },
    headerContainer: {
        backgroundColor: '#313131',
        height: 120,
        justifyContent: 'center'
    },
    helloText: {
        marginLeft: 20,
        fontFamily: FontFamily.soraRegular,
        fontSize: 14,
        color: '#FFFFFF'
    },
    searchInputContainer: {
        backgroundColor: '#2A2A2A',
        flexDirection: 'row',
        height: 60,
        borderRadius: 10,
        marginHorizontal: 30,
        marginVertical: 20,
        alignItems: 'center'
    },
    ButtonContainer: {
        marginTop: 30,
        marginHorizontal: 30,
        justifyContent: 'center'
      },
    listButton: {
        backgroundColor: '#4D869C',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        height: 60
      },
    listButtonText: {
        fontSize: 16,
        fontFamily: FontFamily.soraSemiBold
    },
})