import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import ExampleHome from '../component/home/ExampleHome'
import OnboardingScreen from '../component/onboarding/OnboardingScreen.component'
import Login from '../component/login/Login.component'
import SignUp from '../component/sign-up/SignUp.component'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignUpSuccess from '../component/sign-up/SignUpSuccess.component'
import HomeManager from '../component/home-manager/HomeManager.component'
import { BottomNavigation } from 'react-native-paper'
import BottomTab from '../component/botton-navigation/BottomTab.component'

const Stack = createNativeStackNavigator()

const route = () => {
  
  return (
    <NavigationContainer>
        <Stack.Navigator 
        initialRouteName='Onboarding'
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          animation: 'ios'
        }}
        >
            <Stack.Screen name='Onboarding' options={{headerShown: false}} component={OnboardingScreen}/>
            <Stack.Screen name='Login' options={{headerShown: false}} component={Login}/>
            <Stack.Screen name='SignUp' options={{headerShown: false}} component={SignUp}/>
            <Stack.Screen name='SignUpSuccess' options={{headerShown: false}} component={SignUpSuccess}/>
            <Stack.Screen name='HomeManager' options={{headerShown: false}} component={HomeManager}/>
            <Stack.Screen name='BottomTab' options={{headerShown: false}} component={BottomTab}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default route