import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import { AuthContext } from '../context/AuthContext';
import FunButton from '../components/FunBotton';
import { useTheme } from '../hooks/useTheme'; // Importa el hook useTheme

const HomeScreen = () => {
  const { authState } = useContext(AuthContext); // Obtén el estado de autenticación desde el contexto
  const { theme } = useTheme(); // Obtén el tema actual y la función para cambiarlo
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Obtener el rol del usuario almacenado en AsyncStorage
    const getUserRole = async () => {
      try {
        const storedUserRole = await AsyncStorage.getItem('userRol');
        if (storedUserRole !== null) {
          setUserRole(storedUserRole);
        }
      } catch (error) {
        console.error('Error al obtener el rol del usuario:', error);
      }
    };
    getUserRole();
  }, []);

  return (
    <View style={[theme.styles.container, { paddingHorizontal: 20, paddingTop: 20 }]}>
      <Text style={{ ...theme.styles.text, fontSize: 36 }}>TinSmart</Text>
        {userRole === 'admin' ? (
          <View style={{ ...theme.styles.containerSet, width: "95%", height: "90%", borderRadius: 17, margin: 10 }}>
            <Text style={{ ...theme.styles.text, fontSize: 30, marginBottom: 20, marginHorizontal: 30, }}>Bienvenido Administrador!</Text>
            <Text style={{...theme.styles.text, fontSize: 20, margin: 20, paddingTop: 1,}}>Como Administrador tienes acceso a la 
            configuracion de Administrador</Text>
            <FunButton navigateTo='Admin' text='Configuración de administrador' width={300} height={50} />
            <Text style={{...theme.styles.text, fontSize: 20, marginHorizontal: 20, paddingTop: 10,}}>En tinsmart estaremos mostrandote el contenido de tu contenedor de agua en tienmpo real,
                y puedes revisar los ultimos registros existentes. Un registro se crea cuando la cantidad de agua sube o baja.</Text>
                <FunButton navigateTo='Level' text='Nivel del agua' backgroundColor={theme.styles.button} width={300} height={50}/>
                <FunButton navigateTo='Log' text='Últimos registros' backgroundColor={theme.styles.button} width={300} height={50}/>
          </View>
        ) : (
            <View style={{ ...theme.styles.containerSet, width: "95%", height: "90%", borderRadius: 17, margin: 10 }}>
              <View style={{margin: 20, flexDirection: 'column', marginTop: 15, marginBottom: 10,}}>
              <Text style={{ ...theme.styles.text, fontSize: 30, marginHorizontal: 100, }}>Bienvenido Usuario</Text>
                <Text style={{...theme.styles.text, fontSize: 20, margin: 20, paddingTop: 1,}}>En tinsmart estaremos mostrandote el contenido de tu contenedor de agua en tienmpo real,
                y puedes revisar los ultimos registros existentes. Un registro se crea cuando la cantidad de agua sube o baja.</Text>
                <FunButton navigateTo='Level' text='Nivel del agua' backgroundColor={theme.styles.button} width={300} height={50}/>
                <FunButton navigateTo='Log' text='Últimos registros' backgroundColor={theme.styles.button} width={300} height={50}/>
              </View>
                <Text style={{...theme.styles.text, fontSize: 20, margin: 20,}}>Si no te gusta tu foto de perfil, cambialo.</Text>  
                <FunButton navigateTo='Photo' text='Cambiar foto' backgroundColor={theme.styles.button} width={300} height={50}   />
            </View>
        )}
        
    </View>
  );
};

export default HomeScreen;


          {/*
            <View style={{ ...theme.styles.containerSet, marginBottom: 20 }}>
              <Text style={{ ...theme.styles.text, fontSize: 20, marginBottom: 20 }}>Contenido para ambos roles</Text>
              Aquí puedes agregar cualquier contenido que sea común para ambos roles 
              <FunButton navigateTo='Photo' text='Cambiar foto' width={300} height={50} />            
            </View>
          */}