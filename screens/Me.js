import React from "react";
import { useEffect } from "react";
import { Image, Text, StyleSheet, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { logUserOut } from "../apollo";
import { colors } from "../colors";
import useMe from "../hooks/useMe";

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });

const LinkedButton = styled.View`
    background-color: ${colors.blue};
    border-radius: 5px;
    margin: 0 auto;
    margin-top: 20px;
    padding: 5px 20px;

`;

const SText = styled.Text`
    color: white;
`;
function Me({navigation}) {
    const data = useMe();
    useEffect(() => {
      navigation.setOptions({
        headerTitle: data?.me?.username,
      })
    }, []);

    return (
        <View style={{
                backgroundColor: "black",
                flex:1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
      <Image
        style={styles.tinyLogo}
        source={{
          uri: data?.me?.avatarURL,
        }}
      />
        
            <SText>{data?.me?.username}</SText>
            <SText>{data?.me?.email}</SText>
            <SText>{data?.me?.avatarURL}</SText>
            <TouchableOpacity onPress={() => logUserOut()}>
            <LinkedButton><Text style={{ color: "white"}}>Log out</Text></LinkedButton>
            </TouchableOpacity>
        </View>
    )
}

export default Me;