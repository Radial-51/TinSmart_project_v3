import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const AuthStackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }} // Oculta la barra de navegación para la pantalla de inicio de sesión
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Registro' }} // Define el título para la pantalla de registro
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigation;
