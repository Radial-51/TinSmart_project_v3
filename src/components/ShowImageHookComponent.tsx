import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from './../hooks/useTheme'; // Asegúrate de importar useTheme desde la ubicación correcta

const ShowImageHookComponent = () => {
  const { theme } = useTheme(); // Obtén el tema actual a través del hook useTheme
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Obtener el ID del usuario almacenado en AsyncStorage
        const userId = await AsyncStorage.getItem('userId');
        
        // Realizar la solicitud GET a la API con el ID del usuario
        const response = await fetch(`http://localhost:3000/api/v2/users/${userId}`);
        const userData = await response.json();
        
        // Actualizar el estado con la información del usuario
        setUserData(userData);
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    // Llamar a fetchUserData() inicialmente y luego cada 2 segundos
    fetchUserData();
    const intervalId = setInterval(fetchUserData, 5000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  const getPhotoSource = () => {
    // Determinar la ruta de la foto del usuario según el nombre de la foto
    switch (userData.photo) {
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
    <View>
      {userData && (
        <View style={{alignItems: 'center'}}>
          <Text style={{ color: theme.colors.text, fontSize: 30, fontWeight: 'bold', margin: 15, paddingTop: 30,} }>{userData.name}</Text>
          
          <Image
            source={getPhotoSource()}
            style={{ width: 170, height: 170, borderRadius: 100, marginBottom: 30, }}
          />
        </View>
      )}
    </View>
  );
};

export default ShowImageHookComponent;
