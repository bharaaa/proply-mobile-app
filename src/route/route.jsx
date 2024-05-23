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
import BottomTab from '../component/bottom-navigation/BottomTab.component'
import HomeEmployee from '../component/home-employee/HomeEmployee.component'
import BottomTabEmployee from '../component/bottom-navigation/BottomTabEmployee.component'
import ProcurementList from '../component/manager/procurement-list/ProcurementList.component'
import ProcurementListDetail from '../component/manager/procurement-list/ProcurementListDetail.component'
import CreateRequest from '../component/employee/create-request/CreateRequest'
import CreateRequestMoney from '../component/employee/create-request/CreateRequestMoney'
import CreateRequestItems from '../component/employee/create-request/CreateRequestItems'

const Stack = createNativeStackNavigator()

const route = () => {
  
  return (
    <NavigationContainer>
        <Stack.Navigator 
        initialRouteName='BottomTabEmployee'
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          animation: 'ios'
        }}
        >
            <Stack.Screen name='Onboarding' options={{headerShown: false}} component={OnboardingScreen}/>
            <Stack.Screen name='Login' options={{headerShown: false}} component={Login}/>
            <Stack.Screen name='SignUp' options={{headerShown: false}} component={SignUp}/>
            <Stack.Screen name='BottomTab' options={{headerShown: false}} component={BottomTab}/>
            <Stack.Screen name='HomeManager' options={{headerShown: false}} component={HomeManager}/>
            <Stack.Screen name='BottomTabEmployee' options={{headerShown: false}} component={BottomTabEmployee}/>
            <Stack.Screen name='ProcurementList' options={{headerShown: false}} component={ProcurementList}/>
            <Stack.Screen name='ProcurementListDetail' options={{headerShown: false}} component={ProcurementListDetail}/>
            <Stack.Screen name='CreateRequest' options={{headerShown: false}} component={CreateRequest}/>
            <Stack.Screen name='CreateRequestItems' options={{headerShown: false}} component={CreateRequestItems}/>
            <Stack.Screen name='CreateRequestMoney' options={{headerShown: false}} component={CreateRequestMoney}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default route