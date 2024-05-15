import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { FontAwesome } from '@expo/vector-icons'; // Importa FontAwesome
import LogoutButtonComponent from './LogoutButtonComponent'; // Importa el nuevo componente de botón de cierre de sesión
import ShowImageHookComponent from './ShowImageHookComponent';

const DrawerContent = () => {
    const navigation = useNavigation();
    const { theme, toggleTheme } = useTheme();

    const handlePress = (screen: string) => {
        navigation.navigate(screen);
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ShowImageHookComponent/>
            <TouchableOpacity onPress={() => handlePress('Level')} style={{...styles.drawerItem2, 
                backgroundColor: theme.styles.button.backgroundColor || theme.colors.buttonBackground,}}>
                <Text style={{...styles.drawerItemText, color: theme.colors.buttonText,}}>Nivel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('Log')} style={{...styles.drawerItem2, 
                backgroundColor: theme.styles.button.backgroundColor || theme.colors.buttonBackground,}}>
                <Text style={{...styles.drawerItemText, color: theme.colors.buttonText,}}>Registros</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('Config')} style={{...styles.drawerItem2, 
                backgroundColor: theme.styles.button.backgroundColor || theme.colors.buttonBackground,}}>
                <Text style={{...styles.drawerItemText, color: theme.colors.buttonText,}}>Configuraciones</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleTheme} style={{...styles.drawerItem2, 
                backgroundColor: theme.styles.button.backgroundColor || theme.colors.buttonBackground,}}>
                <Text style={{...styles.drawerItemText, color: theme.colors.buttonText,}}>Cambia Tema</Text>
            </TouchableOpacity>
            <LogoutButtonComponent buttonStyle={styles.drawerItem} textStyle={styles.drawerItemText} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    toggleButton: {
        borderRadius: 17,
        alignContent: 'center',
        alignItems: 'center',
        width: "90%",
        margin: 20,
        padding: 10,
        backgroundColor: '#063175',
    },
    toggleButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    drawerItem: {
        padding: 10,
    },
    drawerItem2: {
        borderWidth: 1, 
        margin: 15,
        alignItems: 'center',   
        alignContent: 'center',
        borderRadius: 17,
        width: "90%",
        padding: 10,
    },
    drawerItemText: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default DrawerContent;
