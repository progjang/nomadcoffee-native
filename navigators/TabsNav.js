import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Me from "../screens/Me";
import Profile from "../screens/Profile";
import Upload from "../screens/Upload";
import { Ionicons } from "@expo/vector-icons";
import StackNavFactory from "./StackNavFactory.";
import { isLoggedInVar } from "../apollo";
import { useReactiveVar } from "@apollo/client";
import Login from "../screens/LogIn";
import useMe from "../hooks/useMe";
import { Image, View } from "react-native";

const Tabs = createBottomTabNavigator();

export default function TabsNav() {
    const data = useMe();
    return (
        <Tabs.Navigator
            screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                borderTopColor: "rgba(255, 255, 255, 0.3)",
                backgroundColor: "black",
                },
            }}>

            <Tabs.Screen name="HomeRoot" 
            options={{
                tabBarIcon: ({focused, color, size}) => (
                    <Ionicons name="home" color={color} size={focused? 24: 20} />
                ),
            }}>
            {()=><StackNavFactory screenName="Home" />}
            </Tabs.Screen>

            <Tabs.Screen name="SearchRoot" 
            options={{
                tabBarIcon: ({focused, color, size}) => (
                    <Ionicons name="search" color={color} size={focused? 24: 20} />
                ),
            }}>
            {()=><StackNavFactory screenName="Search" />}
            </Tabs.Screen>

            <Tabs.Screen name="CameraRoot"
            component={View} 
            listeners={({navigation})=>{
                return {
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate("Upload");
                    },
                };

            }}
            options={{
                tabBarIcon: ({focused, color, size}) => (
                    <Ionicons name="camera" color={color} size={focused? 24: 20} />
                ),
            }} />

            <Tabs.Screen name="MeRoot" 
            options={{
                tabBarIcon: ({focused, color, size}) => 
                    data?.me?.avatarURL ? (
                        <Image
                            source={{uri: data.me.avatarURL}}
                            style={{
                                height: 25,
                                width: 25,
                                borderRadius: 10,
                                ...(focused && {borderColor: "white", borderWidth: 1})
                            }}
                        />
                    ) : ( 
                            <Ionicons name="person" color={color} size={focused? 24: 20} />
                    ),
            }}
            >
            {(props) => data ? <Me {...props}/> : <Login /> }
            </Tabs.Screen>

        </Tabs.Navigator>
    )
}