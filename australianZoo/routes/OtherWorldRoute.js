import React from "react";
import 'react-native-gesture-handler';
import { View, Text } from "react-native";

import { createStackNavigator } from '@react-navigation/stack';

import OtherWorld from "../screens/OtherWorld";
import OtherWorldDitails from "../screens/OtherWorldDitails";
import OtherWorldZooDitails from "../screens/OtherWorldZooDitails";

const Stack = createStackNavigator();

const OtherWorldRout = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="OtherWorld" component={OtherWorld} options={{ headerShown: false }} />
            <Stack.Screen name="OtherWorldDitails" component={OtherWorldDitails} options={{ headerShown: false }} />
            <Stack.Screen name="OtherWorldZooDitails" component={OtherWorldZooDitails} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
};

export default OtherWorldRout;