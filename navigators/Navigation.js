import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Me from "../screens/Me";
import Profile from "../screens/Profile";
import { Ionicons } from "@expo/vector-icons";
import StackNavFactory from "./StackNavFactory.";
import { isLoggedInVar } from "../apollo";
import { useReactiveVar } from "@apollo/client";
import Login from "../screens/LogIn";

const Tabs = createBottomTabNavigator();

export default function Navigation() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    console.log(isLoggedIn);
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

            <Tabs.Screen name="MeRoot" 
            options={{
                tabBarIcon: ({focused, color, size}) => (
                    <Ionicons name="person" color={color} size={focused? 24: 20} />
                ),
            }}>
            {(props) => isLoggedIn ? <Me {...props}/> : <Login /> }
            </Tabs.Screen>

        </Tabs.Navigator>
    )
}