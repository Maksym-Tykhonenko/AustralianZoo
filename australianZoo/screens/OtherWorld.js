import React,{useState, useEffect} from "react";
import { Modal, Text, View, TouchableOpacity, ImageBackground, ScrollView, TextInput } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { uid } from 'uid';
import Entypo from 'react-native-vector-icons/Entypo';
import { countries } from "../data/countru";

const OtherWorld = ({ navigation }) => {
  const [countryList, setCountryList] = useState(countries);

  //console.log(country);
  const [newCounryList, setNewCounryList] = useState([]);
  console.log('newCounryList==>', newCounryList)
  const [isVisible, setIsVisible] = useState(false);
  const [countryName, setCountryName] = useState('');

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    setData();
  }, [newCounryList])

  const setData = async () => {
    try {
      const data = {
        newCounryList,
      }
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem("OtherWorldNewCounryList", jsonData);
      console.log('Дані збережено в AsyncStorage')
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('OtherWorldNewCounryList');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setNewCounryList(parsedData.newCounryList);
        
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const handlAddCountry = () => {
    if (countryName === '') return;
    let newArr = [...newCounryList];
    newArr.push({ country: countryName });
    setNewCounryList(newArr);
    setCountryName("");
    togleModal();
    
  };

  const togleModal = () => {
    setIsVisible(!isVisible);
  };

  const handleCloseModal = () => {
    setCountryName("");
    togleModal();
  };

  return (
    <View style={{ flex: 1, }}>
         
      <ImageBackground
        style={{ flex: 1, width: '100%' }}
        source={require('../accets/bgr2.jpeg')}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ScrollView style={{ marginTop: 60 }}>
            {newCounryList && newCounryList.map((item) => {
              return (
                <TouchableOpacity
                  style={{ marginBottom: 10, width: 300, height: 40, borderWidth: 2, borderColor: '#fff', borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.1)', }}
                  onPress={() => navigation.navigate("OtherWorldDitails", item)}
                  key={uid()}>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>{item.country}</Text>
                </TouchableOpacity>
              )
            })}

            {countryList.map((item) => {
              return (
                <TouchableOpacity
                  style={{ marginBottom: 10, width: 300, height: 40, borderWidth: 2, borderColor: '#fff', borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.1)', }}
                  onPress={() => navigation.navigate("OtherWorldDitails", item)}
                  key={item.id}>
                  <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>{item.country}</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
        >
          <View style={{ flex: 1, position: 'relative', backgroundColor: '#123a46', marginHorizontal: 30, marginVertical: 250, borderWidth: 2, borderColor: '#fe6233', borderRadius: 10 }}>
            
            <View style={{ marginLeft: 20, marginTop: 10 }}>

              <View style={{ marginBottom: 20 }}>
                <Text style={{ color: '#fe6233', fontWeight: 'bold', fontSize: 30 }}>Add country :</Text>
              </View>

              <TextInput
                placeholderTextColor='rgba(0, 0, 0, 0.5)'
                placeholder="Country name..."
                value={countryName}
                onChangeText={setCountryName}
                multiline={true}
                style={{
                  shadowOffset: { width: 3, height: 4 },
                  shadowOpacity: .8,
                  elevation: 9,
                  borderColor: '#fe6233', marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 1, borderRadius: 10, color: '#fff', width: 250, height: 40,color: '#000', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                }}
              />
            </View>
            



            <TouchableOpacity
              onPress={() => { handleCloseModal() }}
              style={{ position: 'absolute', right: 10, top: 10, height: 40, width: 40, borderWidth: 2, borderRadius: 10, borderColor: '#fe6233', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
              <Text style={{  fontSize: 30 }}>X</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => { handlAddCountry() }}
              style={{ position: 'absolute', right: 10, bottom: 10, height: 40, width: 40, borderWidth: 2, borderRadius: 10, borderColor: '#fe6233', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
              <Entypo name='check' style={{  fontSize: 25 }} />
            </TouchableOpacity>
          </View>

        </Modal>



        <TouchableOpacity
          onPress={() => {
            setIsVisible(true)
          }}
          style={{ position: 'absolute', top: 20, right: 10 }}
        >
          <Text style={{ color: '#fe6233', fontSize: 45 }}>+</Text>
        </TouchableOpacity>
        
      </ImageBackground>
          
    </View>
  );
};



export default OtherWorld;