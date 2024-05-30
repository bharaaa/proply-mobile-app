import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import ExampleHome from "../component/home/ExampleHome";
import OnboardingScreen from "../component/onboarding/OnboardingScreen.component";
import Login from "../component/login/Login.component";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeManager from "../component/home-manager/HomeManager.component";
import { BottomNavigation } from "react-native-paper";
import BottomTab from "../component/bottom-navigation/BottomTab.component";
import HomeEmployee from "../component/home-employee/HomeEmployee.component";
import BottomTabEmployee from "../component/bottom-navigation/BottomTabEmployee.component";
import ProcurementList from "../component/manager/procurement-list/ProcurementList.component";
import ProcurementListDetail from "../component/manager/procurement-list/ProcurementListDetail.component";
import ProcurementHistory from "../component/manager/procurement-history/ProcurementHistory.component";
import ProcurementHistoryDetail from "../component/manager/procurement-history/ProcurementHistoryDetail.component";
import ProcurementListApproved from "../component/manager/procurement-list/ProcurementListApproved.component";
import ProcurementListRejected from "../component/manager/procurement-list/ProcurementListRejected.component";
import CreateRequest from "../component/employee/create-request/CreateRequest.component";
import CreateRequestGoods from "../component/employee/create-request/CreateRequestGoods.component";
import CreateRequestFunds from "../component/employee/create-request/CreateRequestFunds.component";
import UserApproval from "../component/employee/create-request/UserApproval.component";
import ProcurementRequestSuccess from "../component/employee/create-request/ProcurementRequestSuccess.component";
import RequestHistory from "../component/employee/request-history/RequestHistory.component";
import RequestHistoryDetail from "../component/employee/request-history/RequestHistoryDetail.component";
import TrackRequest from "../component/employee/track-request/TrackRequest.component";
import TrackRequestDetail from "../component/employee/track-request/TrackRequestDetail.component";
import ForgotPassword from "../component/login/ForgotPassword.component";
import ForgotPasswordSuccess from "../component/login/ForgotPasswordSuccess.component";

const Stack = createNativeStackNavigator();

const route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          animation: "ios",
        }}
      >
        <Stack.Screen
          name="Onboarding"
          options={{ headerShown: false }}
          component={OnboardingScreen}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name="ForgotPassword"
          options={{ headerShown: false }}
          component={ForgotPassword}
        />
        <Stack.Screen
          name="ForgotPasswordSuccess"
          options={{ headerShown: false }}
          component={ForgotPasswordSuccess}
        />
        <Stack.Screen
          name="BottomTab"
          options={{ headerShown: false }}
          component={BottomTab}
        />
        <Stack.Screen
          name="HomeManager"
          options={{ headerShown: false }}
          component={HomeManager}
        />
        <Stack.Screen
          name="BottomTabEmployee"
          options={{ headerShown: false }}
          component={BottomTabEmployee}
        />
        <Stack.Screen
          name="ProcurementList"
          options={{ headerShown: false }}
          component={ProcurementList}
        />
        <Stack.Screen
          name="ProcurementListDetail"
          options={{ headerShown: false }}
          component={ProcurementListDetail}
        />
        <Stack.Screen
          name="ProcurementHistory"
          options={{ headerShown: false }}
          component={ProcurementHistory}
        />
        <Stack.Screen
          name="ProcurementHistoryDetail"
          options={{ headerShown: false }}
          component={ProcurementHistoryDetail}
        />
        <Stack.Screen
          name="CreateRequest"
          options={{ headerShown: false }}
          component={CreateRequest}
        />
        <Stack.Screen
          name="CreateRequestGoods"
          options={{ headerShown: false }}
          component={CreateRequestGoods}
        />
        <Stack.Screen
          name="CreateRequestFunds"
          options={{ headerShown: false }}
          component={CreateRequestFunds}
        />
        <Stack.Screen
          name="RequestHistory"
          options={{ headerShown: false }}
          component={RequestHistory}
        />
        <Stack.Screen
          name="RequestHistoryDetail"
          options={{ headerShown: false }}
          component={RequestHistoryDetail}
        />
        <Stack.Screen
          name="TrackRequest"
          options={{ headerShown: false }}
          component={TrackRequest}
        />
        <Stack.Screen
          name="TrackRequestDetail"
          options={{ headerShown: false }}
          component={TrackRequestDetail}
        />
        <Stack.Screen
          name="ProcurementListApproved"
          options={{ headerShown: false }}
          component={ProcurementListApproved}
        />
        <Stack.Screen
          name="ProcurementListRejected"
          options={{ headerShown: false }}
          component={ProcurementListRejected}
        />
        <Stack.Screen
          name="UserApproval"
          options={{ headerShown: false }}
          component={UserApproval}
        />
        <Stack.Screen
          name="ProcurementRequestSuccess"
          options={{ headerShown: false }}
          component={ProcurementRequestSuccess}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default route;
