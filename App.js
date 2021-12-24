import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import {Asset} from 'expo-asset';
import { Ionicons } from '@expo/vector-icons';
import * as Font from "expo-font";
import Navigation from './navigators/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';

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
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </ApolloProvider>
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
