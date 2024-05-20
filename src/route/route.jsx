import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import ExampleHome from '../component/home/ExampleHome'
import OnboardingScreen from '../component/onboarding/OnboardingScreen.component'
import Login from '../component/login/Login.component'
import SignUp from '../component/sign-up/SignUp.component'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignUpSuccess from '../component/sign-up/SignUpSuccess.component'

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
            <Stack.Screen name='Home' options={{headerShown: false}} component={ExampleHome}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default route