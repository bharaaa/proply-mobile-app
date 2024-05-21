import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FontFamily } from '../../../GlobalStyles'

const NotificationScreen = () => {
  return (
    <>
    <StatusBar barStyle="default" backgroundColor="#313131" />
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <View style={styles.helloContainer}>
                <Text style={styles.helloText}>Notification</Text>
            </View>
        </View>
    </View>
    </>
  )
}

export default NotificationScreen

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
        fontFamily: FontFamily.soraSemiBold,
        fontSize: 25,
        color: '#FFFFFF'
    },
    helloContainer: {
        flexDirection: 'row',
        height: 60,
        borderRadius: 10,
        marginHorizontal: 30,
        marginVertical: 20,
        alignItems: 'center'
    },
})