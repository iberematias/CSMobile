import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';

interface Params {
    latitude: number;
    longitude: number;
  }

const Locality = () => {
    const navigation = useNavigation();
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
    const route = useRoute();
    const routeParams = route.params as Params;

    function handleNavigateBack(){
        navigation.goBack();
    }

    useEffect(() => {
        setInitialPosition([routeParams.latitude, routeParams.longitude]);
    }, []); 

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Localização do Produtor.</Text>
            </View>

            <View style={styles.mapContainer}>
            { initialPosition[0] !== 0 && (
                <MapView style={styles.map}
                    initialRegion={{
                    latitude: initialPosition[0],
                    longitude: initialPosition[1],
                    latitudeDelta: 0.064,
                    longitudeDelta: 0.064,
                    }} 
                >        
                <Marker 
                  style={styles.mapMarker}
                  coordinate = {{ 
                    latitude: Number(initialPosition[0]), 
                    longitude: Number(initialPosition[1]), 
                  }} 
                >
                </Marker>
            </MapView>
          )}
          
        </View>

            <View>
                <RectButton style={styles.button} onPress={handleNavigateBack}>
                <View style={styles.buttonIcon}>
                    <Text>
                    <Icon name="arrow-left" color="#FFF" size={24} />
                    </Text>
                </View>
                <Text style={styles.buttonText}>
                    Voltar
                </Text>
                </RectButton>
            </View>
        </>
    );
    
};

const styles = StyleSheet.create({
    container: {
      //flex: 1,
      paddingHorizontal: 32,
      paddingTop: 20 + Constants.statusBarHeight,
    },
  
    title: {
      fontSize: 18,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 5,
    },
  
  
    button: {
      backgroundColor: '#00243C',
      height: 40,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginBottom:20,
      marginRight: 40,
      marginLeft: 40,
    },
  
    buttonIcon: {
      height: 35,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    },

    mapContainer: {
        flex: 1,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 16,
      },
    
      map: {
        width: '100%',
        height: '90%',
      },
    
      mapMarker: {
        width: 90,
        height: 80, 
      },
    
      mapMarkerContainer: {
        width: 90,
        height: 70,
        backgroundColor: '#34CB79',
        flexDirection: 'column',
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center'
      },
    
      mapMarkerImage: {
        width: 90,
        height: 45,
        resizeMode: 'cover',
      },
    
      mapMarkerTitle: {
        flex: 1,
        fontFamily: 'Roboto_400Regular',
        color: '#FFF',
        fontSize: 13,
        lineHeight: 23,
      }
    
  });

export default Locality;