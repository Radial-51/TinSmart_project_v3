import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../hooks/useTheme';

const PhotoScreen: React.FC = () => {
  const { theme } = useTheme();
  const [selectedPhoto, setSelectedPhoto] = useState('photo_user.jpg');

  const handlePhotoSelect = (photoName: string) => {
    setSelectedPhoto(photoName);
  };

  const updatePhoto = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');

      const response = await fetch(`http://localhost:3000/api/v2/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          photo: selectedPhoto,
        }),
      });

      if (response.ok) {
        Alert.alert('Foto actualizada exitosamente');
      } else {
        Alert.alert('Error al actualizar la foto. Inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      console.error('Error al actualizar la foto del usuario:', error);
      Alert.alert('Error al actualizar la foto. Inténtalo de nuevo más tarde.');
    }
  };

  const getPhotoSource = (photoName: string) => {
    switch (photoName) {
      case 'photo1.jpg':
        return require('../../assets/photo1.jpg');
      case 'photo2.jpg':
        return require('../../assets/photo2.jpg');
      case 'photo3.jpg':
        return require('../../assets/photo3.jpg');
      case 'photo4.jpg':
        return require('../../assets/photo4.jpg');
      case 'photo5.jpg':
        return require('../../assets/photo5.jpg');
      case 'photo6.jpg':
        return require('../../assets/photo6.jpg');
      case 'photo7.jpg':
        return require('../../assets/photo7.jpg');
      case 'photo8.jpg':
        return require('../../assets/photo8.jpg');
      case 'photo9.jpg':
        return require('../../assets/photo9.jpg');
      case 'photo10.jpg':
        return require('../../assets/photo10.jpg');
      case 'photo11.jpg':
        return require('../../assets/photo11.jpg');
      case 'photo12.jpg':
        return require('../../assets/photo12.jpg');
      case 'photo13.jpg':
        return require('../../assets/photo13.jpg');
      case 'photo14.jpg':
        return require('../../assets/photo14.jpg');
      case 'photo15.jpg':
        return require('../../assets/photo15.jpg');
      case 'photo16.jpg':
        return require('../../assets/photo16.jpg');
      case 'photo17.jpg':
        return require('../../assets/photo17.jpg');
      case 'photo18.jpg':
        return require('../../assets/photo18.jpg');
      case 'photo19.jpg':
        return require('../../assets/photo19.jpg');
      case 'photo20.jpg':
        return require('../../assets/photo20.jpg');  
      default:
        return require('../../assets/photo_user.jpg');
    }
  };

  return (
    <View style={[theme.styles.container, { paddingHorizontal: 20, paddingTop: 20 }]}>
      <Text style={{ ...theme.styles.text, fontSize: 30 }}>Cambia tu foto</Text>
      <View style={{...theme.styles.containerSet, width: "95%", height: "90%", borderRadius: 10,}}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg', 'photo5.jpg', 'photo6.jpg', 'photo7.jpg', 'photo8.jpg', 'photo9.jpg', 'photo10.jpg',
            'photo11.jpg', 'photo12.jpg', 'photo13.jpg', 'photo14.jpg', 'photo15.jpg','photo16.jpg','photo17.jpg','photo18.jpg','photo19.jpg','photo20.jpg',].map((photoName) => (
              <TouchableOpacity key={photoName} onPress={() => handlePhotoSelect(photoName)}>
                <View style={[styles.photoOptionContainer, { borderColor: selectedPhoto === photoName ? theme.colors.text : 'transparent', }]}>
                  <Image source={getPhotoSource(photoName)} style={styles.photoOption} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <TouchableOpacity style={{margin: 10, backgroundColor: theme.colors.text, width: 150, height: 40, alignContent: 'center', 
    alignItems: 'center', borderRadius: 14,}} onPress={updatePhoto}>
        <Text style={styles.updateButtonText}>Actualizar Foto</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoOptionContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    margin: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoOption: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  updateButton: {
    backgroundColor: '#26A69A',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,

  },
  updateButtonText: {
    marginVertical: 7,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default PhotoScreen;
