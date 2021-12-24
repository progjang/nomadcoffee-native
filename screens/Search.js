import { useReactiveVar } from "@apollo/client";
import React from "react";
import { Text, View } from "react-native";
import { isLoggedInVar, logUserOut } from "../apollo";

function Search() {
    // const isLoggedIn = useReactiveVar(isLoggedInVar);
    // if(isLoggedIn){
    //     logUserOut();
    // }
    return <View
    style={{
        backgroundColor: "black",
        flex:1,
        alignItems: "center",
        justifyContent: "center",
    }}
><Text style={{ color: "white"}}>Search</Text></View>
}

export default Search;