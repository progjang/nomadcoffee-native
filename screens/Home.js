import React from "react";
import { Text, View } from "react-native";

function Home() {
    return <View
        style={{
            backgroundColor: "black",
            flex:1,
            alignItems: "center",
            justifyContent: "center",
        }}
    ><Text style={{ color: "white"}}>Home</Text></View>
}

export default Home;