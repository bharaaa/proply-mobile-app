import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import ExampleHome from '../component/home/ExampleHome'
import OnboardingScreen from '../component/onboarding/OnboardingScreen.component'
import Login from '../component/login/Login.component'

const Stack = createNativeStackNavigator()

const route = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Onboarding'>
            <Stack.Screen name='Onboarding' options={{headerShown: false}} component={OnboardingScreen}/>
            <Stack.Screen name='Login' options={{headerShown: false}} component={Login}/>
            <Stack.Screen name='Home' options={{headerShown: false}} component={ExampleHome}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default route