import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from '../hooks/useTheme'; 
import { FontAwesome } from '@expo/vector-icons'; // Importa FontAwesome
import ThemeScreen from '../screens/ThemeScreen'; 
import PhotoScreen from '../screens/PhotoScreen';
import AlarmScreen from '../screens/AlarmScreen';

const Tab = createMaterialTopTabNavigator();

const ConfigTopTabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.text,
        labelStyle: { fontSize: 16 },
        style: { backgroundColor: theme.colors.background },
      }}
    >
      <Tab.Screen 
        name="Theme" 
        component={ThemeScreen} 
        options={{
          title: 'Tema',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="paint-brush" size={24} color={color} /> // Icono de pincel
          ),
        }} 
      />
      <Tab.Screen 
        name="Photo" 
        component={PhotoScreen} 
        options={{
          title: 'Foto',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="camera" size={24} color={color} /> // Icono de cámara
          ),
        }} 
      />
      <Tab.Screen 
        name="Alarm" 
        component={AlarmScreen} 
        options={{
          title: 'Alarma',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bell" size={24} color={color} /> // Icono de campana
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default ConfigTopTabs;
