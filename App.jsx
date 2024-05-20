import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreenView from './SplashScreenView';
import { useEffect, useState } from 'react';
import Route from './src/route/route';
import { useFonts } from "expo-font";

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false)
    }, 2000);
  })

  // const [hideSplashScreen, setHideSplashScreen] = useState(true);

  const [fontsLoaded, error] = useFonts({
    "Sora-Regular": require("./assets/fonts/Sora/Sora-Regular.ttf"),
    "Sora-Medium": require("./assets/fonts/Sora/Sora-Medium.ttf"),
    "Sora-SemiBold": require("./assets/fonts/Sora/Sora-SemiBold.ttf"),
    "Sora-Bold": require("./assets/fonts/Sora/Sora-Bold.ttf"),
    
    "PlusJakartaSans-Regular": require("./assets/fonts/Plus_Jakarta_Sans/PlusJakartaSans-Regular.ttf"),
    "PlusJakartaSans-Medium": require("./assets/fonts/Plus_Jakarta_Sans/PlusJakartaSans-Medium.ttf"),
    "PlusJakartaSans-SemiBold": require("./assets/fonts/Plus_Jakarta_Sans/PlusJakartaSans-SemiBold.ttf"),
    "PlusJakartaSans-Bold": require("./assets/fonts/Plus_Jakarta_Sans/PlusJakartaSans-Bold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
    {isShowSplash ? (<SplashScreenView/>) : (<Route/>)}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
