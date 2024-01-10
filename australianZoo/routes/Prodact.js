import React, {useRef, useState, useEffect} from "react";
import { View, Text, SafeAreaView, TouchableOpacity, Modal, Linking, Clipboard } from "react-native";
import { WebView } from 'react-native-webview';
import AntDesign from 'react-native-vector-icons/AntDesign';
//import ReactNativeIdfaAaid, { AdvertisingInfoResponse } from '@sparkfabrik/react-native-idfa-aaid';
//import { LogLevel, OneSignal } from 'react-native-onesignal';
import AsyncStorage from "@react-native-async-storage/async-storage";

//advertisindId  advertisindId
const Prodact = ({ route }) => {
  //console.log('route==>', route.params?.idfa)
  const [idfa, setIdfa] = useState(route.params?.idfa);
  //console.log('idfaProd==>', idfa);
  

  useEffect(() => {
    getData()
  }, []);

  useEffect(() => {
    setData()
  }, [idfa,]);

  const setData = async () => {
    try {
      const data = {
        idfa,
        //modalPermitionVis
      }
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem("Prodact", jsonData);
      console.log('Дані збережено в AsyncStorage')
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('Prodact');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setIdfa(parsedData.idfa);
          
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };
     
  //const product = `https://football.ua?advertising_id=${idfa}`;
  const product = `https://incredible-regal-elation.space/MXXqmZbQ?advertising_id=${idfa}`;
  console.log('product==>', product)
  const refWebview = useRef(null);

  //ф-ція для повернення назад
  const goBack = () => {
    if (refWebview && refWebview.current) {
      refWebview?.current?.goBack();
    }
  };

  //ф-ція для оновлення сторінки
  const reloadPage = () => {
    if (refWebview && refWebview.current) {
      refWebview?.current?.reload();
    }
  };

  // bitcoin litecoin dogecoin tether ethereum bitcoincash
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#191d24' }}>
      <WebView
        originWhitelist={['*']}
        onShouldStartLoadWithRequest={(event) => {
          const { url } = event;
          console.log('Click==>', url)
          if (url.startsWith('mailto:')) {
            Linking.openURL(url);
            return false;
          } else if (url.includes('bitcoin') || url.includes('litecoin') || url.includes('dogecoin') || url.includes('tether') || url.includes('ethereum') || url.includes('bitcoincash')) {
            return false;
          } else {
            return true;
          }
        }}
        textZoom={100}
        allowsBackForwardNavigationGestures={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        source={{ uri: product }}
        allowsInlineMediaPlayback={true}
        setSupportMultipleWindows={false}
        mediaPlaybackRequiresUserAction={false}
        allowFileAccess={true}
        javaScriptCanOpenWindowsAutomatically={true}
        style={{ flex: 1, marginBottom: 7 }}
        ref={refWebview}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: -10 }}>

        <TouchableOpacity
          style={{ marginLeft: 40 }}
          onPress={goBack}>
          <AntDesign name="left" style={{ color: '#fff', fontSize: 20 }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginRight: 40, }}
          onPress={reloadPage}>
          <AntDesign name="reload1" style={{ color: '#fff', fontSize: 20 }} />
        </TouchableOpacity>
                
      </View>
      
    </SafeAreaView>
  );
};

export default Prodact;

