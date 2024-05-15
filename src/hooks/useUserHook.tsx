import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserHook = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Obtener el id del usuario del AsyncStorage
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          return; // Si no hay id de usuario, salimos de la función
        }

        // Hacer la petición al servidor para obtener los datos del usuario
        const response = await fetch(`http://localhost:3000/api/v2/users/${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }
        const userData = await response.json();
        
        // Obtener la foto del usuario del AsyncStorage
        const userPhoto = await AsyncStorage.getItem('userPhoto');

        // Si la foto del usuario está disponible en AsyncStorage, agregamos la propiedad photo al objeto de datos del usuario
        if (userPhoto) {
          userData.photo = userPhoto;
        }

        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // Se ejecuta solo una vez al montar el componente

  return { user };
};
