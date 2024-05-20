import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreenView from './SplashScreenView';
import ExampleHome from './ExampleHome';
import { useEffect, useState } from 'react';

export default function App() {
  const [isShowSplash, setIsShowSplash] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false)
    }, 2000);
  })
  return (
    <>
    {isShowSplash ? (<SplashScreenView/>) : (<ExampleHome/>)}
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
