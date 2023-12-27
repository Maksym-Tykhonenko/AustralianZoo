import React, {useState, useEffect} from "react";
import { Text, View, TouchableOpacity, ImageBackground,Image, ScrollView, Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { uid } from 'uid';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MapView, { Marker } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ZooDitails = ({ navigation, route }) => {
    //console.log('route===>', route.params);
    const [zoo, setZoo] = useState(route.params);
    const { address, description, id, latitude, longitude, logo, name, nearbyHotel, rarestMostInterestingAnimal, } = zoo;
    const [selectPhoto, setSelectPhoto] = useState([]);
    //console.log('selectPhoto==>', selectPhoto);

    useEffect(() => {
        if (selectPhoto.length >= 10) {
            Alert.alert("Congratulations!!!You have collected a collection of 10 animals!!!")
        }
    }, [selectPhoto]);

     useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    setData();
  }, [selectPhoto])

  const setData = async () => {
    try {
      const data = {
        selectPhoto,
      }
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem("ZooDitails", jsonData);
      console.log('Дані збережено в AsyncStorage')
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('ZooDitails');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setSelectPhoto(parsedData.selectPhoto);
        
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };
  

    const ImagePicer = () => {
        let options = {
            storageOptios: {
                path: 'image',
            }
        };
        
        launchImageLibrary(options, response => {
            if (!response.didCancel) {
                //console.log('response==>', response.assets[0].uri);
                setSelectPhoto([response.assets[0].uri, ...selectPhoto]);

            } else {
                console.log('Вибір скасовано');
            }
        });
    };

    return (
        <View style={{ flex: 1, position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          
            <ImageBackground
                source={require('../accets/bgr2.jpeg')}
                style={{ flex: 1, width: '100%' }}
            >
                <ScrollView style={{ flex: 1, }}>
                    <View style={{ marginTop: 40, marginHorizontal: 20, marginBottom: 10 }}>

                        <Text style={{ fontWeight: 'bold', color: '#fe6233', fontSize: 28, marginBottom: 10 }}>{name}</Text>
                        
                        <MapView
                            style={{ flex: 1, height: 200, marginBottom: 10, borderRadius: 10 }}
                            initialRegion={{
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}>
                            <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
                        </MapView>

                        <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: '#fe6233' }}>
                            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18, }}>Address: <Text style={{ fontWeight: 'normal' }}>{address}</Text></Text>
                        </View>
                        <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: '#fe6233' }}>
                            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Description: <Text style={{ fontWeight: 'normal' }}>{description}</Text></Text>
                        </View>
                        <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: '#fe6233' }}>
                            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Nearby hotel: <Text style={{ fontWeight: 'normal' }}>{nearbyHotel}</Text></Text>
                        </View>
                        <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: '#fe6233' }}>
                            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Rarest most interesting animal: <Text style={{ fontWeight: 'normal' }}>{rarestMostInterestingAnimal}</Text></Text>
                        </View>

                        <View style={{flexDirection: 'row',flexWrap: 'wrap', marginTop: 5}}>
                            {selectPhoto && selectPhoto.map((img) => {
                                return (
                                    <Image
                                        key={uid()}
                                        style={{ width: '48%', height: 100, borderRadius: 10, marginRight: 5,marginTop: 5, borderWidth: 1, borderColor: '#fe6233'}}
                                        source={{ uri: img }} />
                                )
                            })}
                       </View>
                            
                      
                        
                        
                        <View style={{ marginTop: 10 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    ImagePicer();
                                }}
                                style={{ height: 100, width: 100, borderWidth: 1, borderRadius: 10,borderColor: '#fe6233', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                            >
                                <Text style={{ color: '#fe6233', fontWeight: 'bold' }}>ADD AN ANIMAL PHOTO</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
                
                
                
                <TouchableOpacity
                    style={{ position: 'absolute', bottom: 10, right: 10 }}
                    onPress={() => navigation.navigate('HomeScreen')}
                >
                    <Ionicons name='arrow-undo-sharp' style={{ color: '#fe6233', fontSize: 35 }} />
                </TouchableOpacity>

            </ImageBackground>
          
        </View>
    );
};

{/**

*/}

export default ZooDitails;