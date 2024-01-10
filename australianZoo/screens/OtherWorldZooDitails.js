import React,{useState, useEffect} from "react";
import { View, Text, ImageBackground,TouchableOpacity, Image, Alert, ScrollView } from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uid } from 'uid';

const OtherWorldZooDitails = ({ navigation, route }) => {
    
    const [zoo, setZoo] = useState(route.params)
    const { address, description, id, logo, name, nearbyHotel, rarestMostInterestingAnimal } = zoo;
    const [selectPhoto, setSelectPhoto] = useState([]);

    useEffect(() => {
        if (selectPhoto.length >= 10) {
            Alert.alert("Congratulations!!!You have collected a collection of 10 animals!!!")
        }
    }, [selectPhoto]);

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
        <View style={{ flex: 1, }}>
            <ImageBackground
                style={{ flex: 1, width: '100%' }}
                source={require('../accets/backgr.jpg')}
            >
                <ScrollView>
                    <View style={{ flex: 1, position: 'relative', marginTop: 50, marginHorizontal: 20 }}>
                        <Text style={{ color: '#fe6233', fontSize: 30, fontWeight: 'bold' }}>{name}</Text>

                        <Image
                            source={{ uri: logo }}
                            style={{ width: 'auto', height: 200, borderRadius: 10, borderWidth: 1, borderColor: '#fe6233' }} />
                    
                        <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>Address: <Text style={{ fontWeight: 'normal', fontSize: 25 }}>{address}</Text></Text>
                        <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>Description: <Text style={{ fontWeight: 'normal', fontSize: 25 }}>{description}</Text> </Text>
                        <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>Nearby hotel: <Text style={{ fontWeight: 'normal', fontSize: 25 }}>{nearbyHotel}</Text></Text>
                        <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>Rarest most interesting animal: <Text style={{ fontWeight: 'normal', fontSize: 25 }}>{rarestMostInterestingAnimal}</Text></Text>
                
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5 }}>
                            {selectPhoto && selectPhoto.map((img) => {
                                return (
                                    <Image
                                        key={uid()}
                                        style={{ width: '48%', height: 100, borderRadius: 10, marginRight: 5, marginTop: 5, borderWidth: 1, borderColor: '#fe6233' }}
                                        source={{ uri: img }} />
                                )
                            })}
                        </View>
                    
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
                    style={{ position: 'absolute', bottom: 10, right: 10 }}
                    onPress={() => navigation.navigate('OtherWorldDitails')}
                >
                    <Ionicons name='arrow-undo-sharp' style={{ color: '#fe6233', fontSize: 35 }} />
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
};

export default OtherWorldZooDitails;