import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Me from "../screens/Me";
import Profile from "../screens/Profile";
import Login from "../screens/LogIn";
const Stack = createStackNavigator();


export default function StackNavFactory({screenName}) {
    return(
        <Stack.Navigator
        screenOptions={{
            headerBackTitleVisible: false,
            headerTintColor: "white",
            headerStyle: {
              shadowColor: "rgba(255, 255, 255, 0.3)",
              backgroundColor: "black",
            },
          }}
        >
            { screenName === "Home" ? (
                <Stack.Screen name={"Home"} component={Home} /> ) : null
            }
            { screenName === "Search" ? (
                <Stack.Screen name={"Search"} component={Search} /> ) : null
            }
            { screenName === "Me" ? (
                <Stack.Screen name={"Me"} component={Me} /> ) : null
            }
            { screenName === "Profile" ? (
                <Stack.Screen name={"Profile"} component={Me} /> ) : null
            }
            <Stack.Screen name={"Login"} component={Login} />
        </Stack.Navigator>
    );
}