import React, { useState } from 'react';
import { StyleSheet, Image, ImageBackground, Text, View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';

const Home = () => {
  const [codigo, setCodigo] = useState('');
  const navigation = useNavigation();

  function handleNavigateToTrace(){
      navigation.navigate('Traceability', {
        codigo: codigo.toUpperCase(),
      });
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined }>
    <ImageBackground source={require('../../assets/home-background.png')} 
      resizeMode="contain"
      style={styles.container}
      imageStyle={{ width: 187, height: 500 }}
      >
      <View style={styles.main}> 
        <Image source={require('../../assets/logo.png')} />
        <View>
          <Text style={styles.description}>Consulta de Selo Fiscal Eletrônico.</Text>
        </View>
      </View>
      
      <View style={styles.footer}>

          <TextInput secureTextEntry={false} style={styles.input} placeholder="Código do Selo" 
            value={codigo} 
            autoCorrect={false}
            onChangeText={setCodigo}
          />

          <RectButton style={styles.button} onPress={handleNavigateToTrace}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Consultar</Text>
          </RectButton>
        </View>

    </ImageBackground>
  </KeyboardAvoidingView>
    )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#00243C',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
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

export default Home;