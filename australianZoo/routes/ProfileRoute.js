import React from "react";
import 'react-native-gesture-handler';
import { View, Text } from "react-native";

import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();

const ProfileRoute = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
};

export default ProfileRoute;