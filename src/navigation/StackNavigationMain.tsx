import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import LevelScreen from '../screens/LevelScreen';
import LogScreen from '../screens/LogScreen';
import ConfigScreen from '../screens/ConfigScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PhotoScreen from '../screens/PhotoScreen';
import ThemeScreen from '../screens/ThemeScreen';
import AlarmScreen from '../screens/AlarmScreen';
import StatsScreen from '../screens/StatsScreen';
import { AdminSettingsScreen } from '../screens/AdminSettingsScreen';

const Stack = createStackNavigator();

const StackNavigationMain: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="Level" component={LevelScreen} options={{ title: 'Level' }} />
        <Stack.Screen name="Log" component={LogScreen} options={{ title: 'Log' }} />
        <Stack.Screen name="Config" component={ConfigScreen} options={{ title: 'Config' }} />
        <Stack.Screen name="Photo" component={PhotoScreen} options={{ title: 'Photo' }} />
        <Stack.Screen name="Theme" component={ThemeScreen} options={{ title: 'Theme' }} />
        <Stack.Screen name="Alarm" component={AlarmScreen} options={{ title: 'Alarm' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name="Stats" component={StatsScreen} options={{ title: 'Stats' }} />

        <Stack.Screen name="AdminSettings" component={AdminSettingsScreen} options={{ title: 'AdminSettings' }} /> 
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigationMain;
