import React, { useState, useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../hooks/useTheme';
import HomeScreen from '../screens/HomeScreen';
import LevelScreen from '../screens/LevelScreen';
import LogScreen from '../screens/LogScreen';
import ConfigScreen from '../screens/ConfigScreen';
import PhotoScreen from './../screens/PhotoScreen';
import ThemeScreen from '../screens/ThemeScreen';
import AlarmScreen from '../screens/AlarmScreen';
import { AdminSettingsScreen } from '../screens/AdminSettingsScreen'; // Importa la pantalla AdminSettingsScreen
import StatsScreen from '../screens/StatsScreen';

const BottomTab = createMaterialBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const BottomNavigation = () => {
    const { theme } = useTheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            shifting={true}
            activeColor={theme.colors.primary}
            inactiveColor={theme.colors.text}
            barStyle={{ backgroundColor: theme.colors.background }}
        >
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="home" color={color} size={26} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Level"
                component={LevelScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="flask" color={color} size={26} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Log"
                component={LogScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="file-alt" color={color} size={26} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Stats"
                component={StatsScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="chart-line" color={color} size={26} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Config"
                component={ConfigTopTabNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="cog" color={color} size={26} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
};

const ConfigTopTabNavigator = () => {
    const { theme } = useTheme();
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
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
        <TopTab.Navigator
            initialRouteName="Theme"
            tabBarOptions={{
                activeTintColor: theme.colors.primary,
                inactiveTintColor: theme.colors.text,
                style: { backgroundColor: theme.colors.background },
                indicatorStyle: { backgroundColor: theme.colors.primary },
            }}
        >
            <TopTab.Screen
                name="Theme"
                component={ThemeScreen}
                options={{
                    tabBarLabel: 'Cuenta',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="id-card" color={color} size={22} />
                    ),
                }}
            />
            <TopTab.Screen
                name="Photo"
                component={PhotoScreen}
                options={{
                    tabBarLabel: 'Foto',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="camera" color={color} size={22} />
                    ),
                }}
            />
            <TopTab.Screen
                name="Alarm"
                component={AlarmScreen}
                options={{
                    tabBarLabel: 'Alarma',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="bell" color={color} size={22} />
                    ),
                }}
            />
            {userRole === 'admin' && (
                <TopTab.Screen
                    name="Admin"
                    component={AdminSettingsScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5 name="user-tie" color={color} size={26} />
                        ),
                    }}
                />
            )}
        </TopTab.Navigator>
    );
};

export default BottomNavigation;
