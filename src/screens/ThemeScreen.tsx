import React, { useState, useEffect } from 'react';
import { View, Text, Switch } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useFetchContainers } from '../hooks/useContainerHook'; // Importa el hook useFetchContainers
import ChangeNameComponent from '../components/ChangeNameComponent';
import ChangePasswordComponent from '../components/ChangePasswordComponent';

const ThemeScreen = () => {
  const { theme, toggleTheme } = useTheme(); // Obtén el tema actual y la función para cambiarlo
  const { containers, fetchContainers } = useFetchContainers(); // Obtén los contenedores y la función para obtenerlos

  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(theme.isDarkMode); // Estado local para el switch

  const toggleSwitch = () => {
    setIsDarkModeEnabled(previousState => !previousState); // Cambia el estado local del switch
    toggleTheme(); // Cambia el tema global
  };

  useEffect(() => {
    fetchContainers(); // Consulta los contenedores al montar el componente

    // Establece un intervalo para actualizar los contenedores cada 3 segundos
    const intervalId = setInterval(() => {
      fetchContainers();
    }, 3000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Elimina fetchContainers del array de dependencias

  return (
    <View style={[theme.styles.container, { paddingHorizontal: 20, paddingTop: 20 }]}>
      <Text style={{ ...theme.styles.text, fontSize: 36 }}>Configura tu Cuenta</Text>
      <View style={{...theme.styles.containerSet, width: "95%", height: "80%",}} > 
      <ChangeNameComponent/>
        <ChangePasswordComponent/>
      </View>
      
    </View>
  );
};

export default ThemeScreen;
