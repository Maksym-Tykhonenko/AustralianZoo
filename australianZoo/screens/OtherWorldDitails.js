import React,{useState,useEffect} from "react";
import { Image, Modal,ScrollView, TextInput, ImageBackground, Text, View, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { uid } from 'uid';

const OtherWorldDitails = ({ navigation, route }) => {
  
  console.log('route==>', route);
  const [item, setItem] = useState(route.params);
  const { country } = item;
  const [zooList, setZooList] = useState([]);
  console.log('ZooList==>', zooList);

  ///////////////////////////////////madal state
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
  }, [zooList])

  const setData = async () => {
    try {
      const data = {
        zooList,
      }
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem("OtherWorldDitails", jsonData);
      console.log('Дані збережено в AsyncStorage')
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('OtherWorldDitails');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setZooList(parsedData.zooList);
        
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
      id: uid(),
    };

    setZooList([...zooList, newZoo]);

    setZooName('');
    setZooAdress('');
    setZooDiscr('');
    setZooNearbyHotel('');
    setZooMastIntAnimal('');
    setSelectPhotoInModal(null);

    setIsVisible(false);
  };

  const handleModalClose = () => {
    setIsVisible(false);
    setZooName('');
    setZooAdress('');
    setZooDiscr('');
    setZooNearbyHotel('');
    setZooMastIntAnimal('');
  }


  return (
    <View style={{ flex: 1, }}>
      <ImageBackground
        style={{ flex: 1, width: '100%' }}
        source={require('../accets/bgr2.jpeg')}
      >
        <View style={{ flex: 1, }}>
          
          <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
            <ScrollView>
              {zooList.length < 1 ? (
                <Text style={{ color: '#fe6233', fontSize: 30, fontWeight: 'bold' }}>Add your first zoo from {country } !!!</Text>
              ) : (
                zooList.map((item) => {
                  console.log('item', item)
                  return (
                    <TouchableOpacity
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', paddingHorizontal: 40, borderWidth: 1, borderColor: '#000', borderRadius: 10, marginTop: 10, alignItems: 'center', }}
                      key={item.id}
                      onPress={() => { navigation.navigate('OtherWorldZooDitails', item) }}>
                      <Text
                        style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                        {item.name}</Text>
                      <Image
                        source={{ uri: item.logo }}
                        style={{ marginBottom: 5, width: 250, height: 150, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }} />
                    </TouchableOpacity>
                  )
                })
              )}
            </ScrollView>
           
            
          </View>

        </View>

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
                    placeholderTextColor='rgba(0, 0, 0, 0.5)'
                    placeholder="Zoo name..."
                    value={zooName}
                    onChangeText={setZooName}
                    multiline={true}
                    style={{
                      shadowOffset: { width: 3, height: 4 },
                      shadowOpacity: .8,
                      elevation: 9,
                      borderColor: '#fe6233', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, width: 250, height: 40,color: '#000', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    }}
                  />

                  <TextInput
                    placeholderTextColor='rgba(0, 0, 0, 0.5)'
                    placeholder="Address..."
                    value={zooAdress}
                    onChangeText={setZooAdress}
                    multiline={true}
                    style={{
                      shadowOffset: { width: 3, height: 4 },
                      shadowOpacity: .8,
                      elevation: 9,color: '#000', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      borderColor: '#fe6233', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#000', width: 250, height: 40
                    }}
                  />

                  <TextInput
                    placeholderTextColor='rgba(0, 0, 0, 0.5)'
                    placeholder="Description..."
                    value={zooDiscr}
                    onChangeText={setZooDiscr}
                    multiline={true}
                    style={{
                      shadowOffset: { width: 3, height: 4 },
                      shadowOpacity: .8,
                      elevation: 9,color: '#000', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      borderColor: '#fe6233', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#000', width: 250, height: 40
                    }}
                  />

                  <TextInput
                    placeholderTextColor='rgba(0, 0, 0, 0.5)'
                    placeholder="Nearby hotel..."
                    value={zooNearbyHotel}
                    onChangeText={setZooNearbyHotel}
                    multiline={true}
                    style={{
                      shadowOffset: { width: 3, height: 4 },
                      shadowOpacity: .8,
                      elevation: 9,color: '#000', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      borderColor: '#fe6233', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#000', width: 250, height: 40
                    }}
                  />

                  <TextInput
                    placeholderTextColor='rgba(0, 0, 0, 0.5)'
                    placeholder="Most interesting animal..."
                    value={zooMastIntAnimal}
                    onChangeText={setZooMastIntAnimal}
                    multiline={true}
                    style={{
                      shadowOffset: { width: 3, height: 4 },
                      shadowOpacity: .8,
                      elevation: 9,color: '#000', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      borderColor: '#fe6233', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#000', width: 250, height: 40
                    }}
                  />
                </View>

                {selectPhotoInModal && <Image
                  //key={}
                  style={{ width: 250, height: 150, borderRadius: 10, marginRight: 5, marginTop: 5, borderWidth: 1, borderColor: '#fe6233' }}
                  source={{ uri: selectPhotoInModal }} />}
                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity
                    onPress={() => {
                      ImagePicer();
                    }}
                    style={{ height: 100, width: 100, borderWidth: 1, borderRadius: 10, borderColor: '#fe6233', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
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
              style={{ position: 'absolute', bottom: 10, right: 10, height: 100, width: 100, borderWidth: 1, borderRadius: 10, borderColor: '#fe6233', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
            >
              <Entypo name='check' style={{ color: '#fe6233', fontSize: 50 }} />
            </TouchableOpacity>


            <TouchableOpacity
              onPress={() => { handleModalClose() }}
              style={{ position: 'absolute', right: 10, top: 40, height: 40, width: 40, borderWidth: 2, borderRadius: 10, borderColor: '#fe6233', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
              <Text style={{ color: '#fe6233', fontSize: 30 }}>X</Text>
            </TouchableOpacity>
                        
          </View>
                    
        </Modal>

        
              
        <TouchableOpacity
          style={{ position: 'absolute', bottom: 10, right: 10 }}
          onPress={() => navigation.navigate('OtherWorld')}
        >
          <Ionicons name='arrow-undo-sharp' style={{ color: '#fe6233', fontSize: 35 }} />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={{
            position: 'absolute',
            alignItems: 'center',
            //justifyContent: 'center',
            top: zooList.length > 0 ? 18 : 60,
            right: zooList.length > 0 ? 8 : 140,
          
            borderRadius: 150
          }}
          onPress={() => setIsVisible(true)}
        >
          <Text style={{
            color: '#fe6233',
            fontSize: zooList.length > 0 ? 45 : 70
          }}>+</Text>
        </TouchableOpacity>

      </ImageBackground>
       
    </View>
  );
};



export default OtherWorldDitails;