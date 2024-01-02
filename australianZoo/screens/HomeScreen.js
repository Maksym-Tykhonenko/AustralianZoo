import React, {useState, useEffect} from "react";
import { TextInput, Image, ImageBackground, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { uid } from 'uid';
import Entypo from 'react-native-vector-icons/Entypo';
import { zoo } from '../data/zoo';
//import { TextInput } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {
    const [zooList, setZooList] = useState(zoo);
    const [newZooList, setNewZooList] = useState([])
    //////////////////////////////////////////madal state
    const [isVisible, setIsVisible] = useState(false);
    const [zooName, setZooName] = useState('');
    const [zooAdress, setZooAdress] = useState('');
    const [zooDiscr, setZooDiscr] = useState('');
    const [zooNearbyHotel, setZooNearbyHotel] = useState('');
    const [zooMastIntAnimal, setZooMastIntAnimal] = useState('');
    const [selectPhotoInModal, setSelectPhotoInModal] = useState(null);
    console.log('selectPhotoInModal==>', selectPhotoInModal);

    useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    setData();
  }, [newZooList])

  const setData = async () => {
    try {
      const data = {
        newZooList,
      }
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem("newAustraliaZooList", jsonData);
      console.log('Дані збережено в AsyncStorage')
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('newAustraliaZooList');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setNewZooList(parsedData.newZooList);
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
                console.log('response==>', response.assets[0].uri);
                setSelectPhotoInModal(response.assets[0].uri);

            } else {
                console.log('Вибір скасовано');
            }
        });
    };

    const addZoo = () => {
        let newZoo = {
            name: zooName,
            address: zooAdress,
            description: zooDiscr,
            nearbyHotel: zooNearbyHotel,
            rarestMostInterestingAnimal: zooMastIntAnimal,
            logo: selectPhotoInModal,
        };

        setNewZooList([newZoo, ...newZooList]);

        setZooName('');
        setZooAdress('');
        setZooDiscr('');
        setZooNearbyHotel('');
        setZooMastIntAnimal('');
        setSelectPhotoInModal(null);

        setIsVisible(false);
    };

    return (
        <View style={{ flex: 1, position: 'relative' }}>
          
            <ImageBackground
                source={require('../accets/bgr2.jpeg')}
                style={{ flex: 1 }}>
                <ScrollView style={{ marginHorizontal: 40, marginTop: 50 }}>
              
                    {zooList.map((item) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ZooDitails', item)}
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', borderWidth: 1, borderColor: '#000', borderRadius: 10, marginTop: 10, alignItems: 'center', }}
                                key={item.id}
                            >
                                <Text
                                    style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                                    {item.name}</Text>
                                <Image
                                    source={item.logo}
                                    style={{ marginBottom: 5, width: 250, height: 150, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }} />
                      
                            </TouchableOpacity>
                        )
                    })}
                    {newZooList ? (newZooList.map((item) => {
                        return (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ZooDitails', item)}
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', borderWidth: 1, borderColor: '#000', borderRadius: 10, marginTop: 10, alignItems: 'center', }}
                                key={uid()}
                            >
                                <Text
                                    style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                                    {item.name}</Text>
                                <Image
                                    source={{uri: item.logo}}
                                    style={{ marginBottom: 5, width: 250, height: 150, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }} />
                      
                            </TouchableOpacity>
                        )
                    })):(<View></View>)}
                </ScrollView>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={isVisible}
                >

                    <View style={{ flex: 1, position: 'relative', backgroundColor: '#123a46' }}>
                        
                        <ScrollView>

                            <View style={{ marginTop: 40, marginHorizontal: 20 }}>
                                <View>

                               
                                    <TextInput
                                        placeholderTextColor='#000'
                                        placeholder="Zoo name..."
                                        value={zooName}
                                        onChangeText={setZooName}
                                        multiline={true}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            borderColor: '#fe6233', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#fff', width: 250, height: 40
                                        }}
                                    />

                                    <TextInput
                                        placeholderTextColor='#000'
                                        placeholder="Address..."
                                        value={zooAdress}
                                        onChangeText={setZooAdress}
                                        multiline={true}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            borderColor: '#fe6233', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#fff', width: 250, height: 40
                                        }}
                                    />

                                    <TextInput
                                        placeholderTextColor='#000'
                                        placeholder="Description..."
                                        value={zooDiscr}
                                        onChangeText={setZooDiscr}
                                        multiline={true}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            borderColor: '#fe6233', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#fff', width: 250, height: 40
                                        }}
                                    />

                                    <TextInput
                                        placeholderTextColor='#000'
                                        placeholder="Nearby hotel..."
                                        value={zooNearbyHotel}
                                        onChangeText={setZooNearbyHotel}
                                        multiline={true}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            borderColor: '#fe6233', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#fff', width: 250, height: 40
                                        }}
                                    />

                                    <TextInput
                                        placeholderTextColor='#000'
                                        placeholder="Most interesting animal..."
                                        value={zooMastIntAnimal}
                                        onChangeText={setZooMastIntAnimal}
                                        multiline={true}
                                        style={{
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: .8,
                                            elevation: 9,
                                            borderColor: '#fe6233', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#fff', width: 250, height: 40
                                        }}
                                    />
                                </View>

                                {selectPhotoInModal && <Image
                                    //key={}
                                    style={{width: 250, height: 150, borderRadius: 10, marginRight: 5,marginTop: 5, borderWidth: 1, borderColor: '#fe6233'}}
                                    source={{ uri: selectPhotoInModal }} />}
                                <View style={{ marginTop: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            ImagePicer();
                                        }}
                                        style={{ height: 100, width: 100, borderWidth: 1, borderRadius: 50, borderColor: '#fe6233', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                                    >
                                         <Text style={{ color: '#fe6233', fontWeight: 'bold' }}>ADD AN ANIMAL PHOTO</Text>
                                        
                                    </TouchableOpacity>
                                </View>

                                    

                            </View>

                        </ScrollView>

                        <TouchableOpacity
                            onPress={() => {
                                addZoo();
                            }}
                            style={{ position: 'absolute', bottom: 10, right: 10, height: 100, width: 100, borderWidth: 1, borderRadius: 50, borderColor: '#fe6233', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                        >
                           <Entypo name='check' style={{color: '#fe6233',fontSize: 50}} />
                        </TouchableOpacity>


                        <TouchableOpacity
                            onPress={() => { setIsVisible(false) }}
                            style={{ position: 'absolute', right: 10, top: 40,height: 40, width: 40, borderWidth: 2, borderRadius: 50, borderColor: '#fe6233',alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                            <Text style={{ color: '#fe6233',fontSize: 30 }}>X</Text>
                        </TouchableOpacity>
                        
                    </View>
                    
                </Modal>

                <TouchableOpacity
                    onPress={() => { setIsVisible(true) }}
                    style={{ position: 'absolute', top: 30, right: 20 , borderWidth: 2, borderColor: '#fe6233', borderRadius: 50, width: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}
                >
                    <Text style={{ color: '#fe6233', fontSize: 30, fontWeight: 'bold' }}>+</Text>
                </TouchableOpacity>
         
            </ImageBackground>
         
        </View>
    );
};



export default HomeScreen;
