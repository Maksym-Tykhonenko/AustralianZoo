import React, {useState} from "react";
import { Text, View } from "react-native";

import Entypo from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


import HomeRoute from "./routes/HomeRoute";
import ProfileRoute from "./routes/ProfileRoute";
import OtherWorldRout from "./routes/OtherWorldRoute";

const App = () => {
  const [turn, sutTern] = useState('app')
  

  ///////////////////////// апка
  const Route = ({ isFatch }) => {
  
    if (isFatch) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Prodact...</Text>
        </View>
      )
        
    } return (
      <Tab.Navigator initialRouteName="Australia">
        
        <Tab.Screen
          name="Profile"
          component={ProfileRoute}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarActiveBackgroundColor: '#fe6233',
            tabBarInactiveBackgroundColor: '#123a46',
            tabBarLabelStyle: { color: '#ccc' },
            tabBarIcon: ({  }) => {
              return (
                <Entypo name='user' style={{ fontSize: 25 , color: '#fff'}} />
              )
            }
          }} />
        <Tab.Screen
          name="Australia"
          component={HomeRoute}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarActiveBackgroundColor: '#fe6233',
            tabBarInactiveBackgroundColor: '#123a46',
            tabBarIcon: ({  }) => {
              return (
                <MaterialCommunityIcons name='kangaroo' style={{ fontSize: 30, color: '#fff' }} />
              )
            }
          }} />
        <Tab.Screen
          name="World"
          component={OtherWorldRout}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarActiveBackgroundColor: '#fe6233',
            tabBarInactiveBackgroundColor: '#123a46',
            tabBarIcon: ({  }) => {
              return (
                <Fontisto name='world-o' style={{ fontSize: 25 , color: '#fff'}} />
              )
            }
          }} />
      </Tab.Navigator>
    );
    
  };

  return (
    <NavigationContainer>

      {turn === 'app' && <Route isFatch={false}/>}
        
    </NavigationContainer>
  );
};



export default App;