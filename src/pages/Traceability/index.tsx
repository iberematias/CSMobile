import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import { RectButton } from 'react-native-gesture-handler';
import { Cell, Section, TableView } from 'react-native-tableview-simple';

interface Item {
    codigo: string;
    dataHoraCriacao: string; 
    uf: string;
    empresa: {
        nome: string;
        cidade:  string;
        endereco: string;
        uf: string;
        latitude: number;
        longitude: number;
    };
    produto: {
        descricao: string;
        detalhe: string;
        marca: {
            nome: string
          }
      };
    
    linhaProducao: {
        descricao: string;
        numero: string;
    }
};
interface Params {
    codigo: string;
  };

const Traceability = () => {
  
    const navigation = useNavigation();
    const [item, setItem] = useState<Item>();
    const [menssages, setMenssages] = useState('Resultado.');
    const route = useRoute();
    const routeParams = route.params as Params;
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
  
    function numberFormatBR(value: any): any {  
      return new Intl.NumberFormat('pt-BR',{maximumFractionDigits:2}).format(value);
    };
  
  
    useEffect(() => {

      async function fetchData() {
        try {
          api.get(`produto/${routeParams.codigo}`).then(response => {
                setItem(response.data);
            }).catch((error) => {
                handleNavigateBack();
                setMenssages('Produto Não Encontrado');
          });
        } catch (error) {
            handleNavigateBack();
        }
      }  
      fetchData();   
      
    }, []); 
  
    function handleNavigateBack() {
      navigation.goBack();
    };

    function handleNavigateToLocality(){
        navigation.navigate('Locality', {
            latitude: item?.empresa.latitude,
            longitude: item?.empresa.longitude,
        });
    };
    
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.title}>Bem Vindo ao Sistema-{item?.uf}</Text>

        </View>
            <ScrollView contentContainerStyle={styles.stage} >
          
            <Text>{menssages}</Text>

                <TableView >
                    <Section>
                        <Cell cellStyle="RightDetail" title="Código :" detail={item?.codigo}/>  
                        <Cell cellStyle="RightDetail" title="Produto :" detail={item?.produto.descricao} />
                        <Cell cellStyle="RightDetail" title="Marca :" detail={item?.produto.marca.nome} />
                        <Cell cellStyle="RightDetail" title="Detalhes :" detail={item?.produto.detalhe} /> 
                        <Cell cellStyle="RightDetail" title="Fabricado em :" detail={item?.dataHoraCriacao} />
                        <Cell cellStyle="RightDetail" title="Produzido por :" detail={item?.empresa.nome} />
                        <Cell cellStyle="RightDetail" title="Cidade :" detail={item?.empresa.cidade} />
                        <Cell cellStyle="RightDetail" title="Endereço :" detail={item?.empresa.endereco} />
                        <Cell cellStyle="Basic"
                            title="Ver a Localização no Mapa."
                            accessory="DisclosureIndicator"
                            onPress={handleNavigateToLocality}
                        />
                    </Section>
                </TableView>                  
          </ScrollView>

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
      flex: 1,
      paddingHorizontal: 32,
      paddingTop: 20 + Constants.statusBarHeight,
    },
  
    stage: {
        paddingHorizontal: 32,
        backgroundColor: '#EFEFF4', 
        paddingTop: 5,
        paddingBottom: 5,
    },

    title: {
      fontSize: 18,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 5,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 18,
      marginTop: 4,
      fontFamily: 'Roboto_400Regular',
    },
  
    itemsContainer: {
      flexDirection: 'column',
      marginTop: 50,
      marginBottom: 32,
      alignContent: 'center',
      alignSelf: 'center',
    },
  
    item: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#eee',
      height: 60,
      width: 300,
      borderRadius: 8,
      // textAlign: 'center',
      alignContent: 'center',
      //alignItems: 'center',
      //justifyContent: 'space-between',
    },
  
    selectedItem: {
      borderColor: '#34CB79',
      borderWidth: 2,
    },
  
    itemTitle: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      textAlignVertical: 'center',
      fontFamily: 'Roboto_400Regular',
      fontSize: 17,
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
    }
    
  });
  
  export default Traceability;