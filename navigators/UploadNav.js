import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

export default function UploadNav(){
    const Tabs = createMaterialTopTabNavigator();
    const Stack = createStackNavigator();

    return (
        <Tabs.Navigator 
            tabBarPosition="bottom"
            screenOptions={{
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "black",
                tabBarIndicatorStyle: {
                    backgroundColor: "white",
                },
            }}
        >
            <Tabs.Screen name="Select">
                {() => (
                    <Stack.Navigator 
                        screenOptions={{
                            headerTintColor: "white",
                            headerBackImage: ({tintColor}) => (
                                <Ionicons color={tintColor} name="close" size={28} />
                            ),
                            headerStyle: {
                                backgroundColor: "black",
                                shadowOpacity: 0.3,
                            }
                        }}
                    >
                        <Stack.Screen 
                            name="SelectPhoto"
                            options={{title: "Choose a photo"}}
                            component={SelectPhoto} />
                    </Stack.Navigator>
                    )
                }
            </Tabs.Screen>
            <Tabs.Screen name="TakePhoto" component={TakePhoto} />
        </Tabs.Navigator>
    )
}