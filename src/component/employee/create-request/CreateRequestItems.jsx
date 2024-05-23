import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { FontFamily } from '../../../../GlobalStyles'
import DropdownPicker from './DropdownPicker'

const CreateRequestItems = () => {
    const navigation = useNavigation()
    const handleHomeEmployee = () => {
        navigation.goBack()
      }
    return (
        <>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.container}>
            <Appbar.Header
            mode='center-aligned'
            style={styles.header}
            >
            <Appbar.BackAction onPress={handleHomeEmployee} />
            <Appbar.Content title="Create Request" titleStyle={styles.title}/>
            </Appbar.Header>
        <Text style={styles.formLabel}>Item Category</Text>
        <DropdownPicker/>
        <Text style={styles.formLabel}>Item Name</Text>
        <DropdownPicker/>
        </View>
        </>
    )
}

export default CreateRequestItems

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
      },
    header: {
        height: 80,
        backgroundColor: '#FFFFFF'
    },
    title: {
        fontFamily: FontFamily.soraSemiBold,
        fontSize: 20,
    },
    formLabel: {
        marginHorizontal: 30,
        fontFamily: FontFamily.soraRegular,
        fontSize: 12,
        marginVertical: 10
    },
    buttonContainer: {
        marginTop: 20,
        marginHorizontal: 30,
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#4D869C',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 80
    },
})