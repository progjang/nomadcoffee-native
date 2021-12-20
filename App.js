import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Asset} from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);

  const preload = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map(font=> Font.loadAsync(font));
    console.log(fontPromises);
    const imagesToLoad = [require("./assets/coffee-logo.png")];
    const imagePromises = imagesToLoad.map(image=> Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  }
  if(loading){
    return <AppLoading onError={console.warn} onFinish={onFinish} startAsync={preload} />;
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
