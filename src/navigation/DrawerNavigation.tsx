import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './../components/DrawerContent';
import BottomNavigation from './BottomNavigation';
import LoginScreen from '../screens/LoginScreen';
import { AuthContext } from '../context/AuthContext'; // Asegúrate de importar correctamente tu contexto de autenticación
import StackNavigationMain from './StackNavigationMain';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { authState } = useContext(AuthContext); // Obtén el estado de autenticación del contexto

  // Verifica si el usuario está autenticado
  if (authState.isLoggedIn) {
    // Si está autenticado, muestra la navegación del cajón
    return (
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="TinSmart" component={BottomNavigation} />
          {/* Agrega más pantallas de Drawer si es necesario */}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    // Si no está autenticado, redirige a la pantalla de inicio de sesión o muestra algún otro comportamiento deseado
    return <LoginScreen />;
  }
}

export default DrawerNavigator;
