import React from "react";
import 'react-native-gesture-handler';
import { View, Text } from "react-native";

import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "../screens/HomeScreen";
import ZooDitails from "../screens/ZooDitails";

const Stack = createStackNavigator();



const HomeRoute = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ZooDitails" component={ZooDitails} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
};

export default HomeRoute;