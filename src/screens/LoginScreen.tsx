import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { login } from '../api/auth'; // Importa la función de inicio de sesión desde tu API
import AuthStackNavigation from '../navigation/AuthStackNavigation';
import { useTheme } from '../hooks/useTheme'; // Importa el hook useTheme para utilizar el ThemeProvider

const LoginScreen = () => {
    const { signIn } = useContext(AuthContext);
    const [id, setId] = useState('');
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = AuthStackNavigation();
    const { theme } = useTheme(); // Obtiene el theme del ThemeProvider

    const handleLogin = async () => {
        try {
            // Llama a la función de inicio de sesión de tu API
            const response = await login({ email, password });
            // Maneja la respuesta de la API
            signIn(response); // Envía los datos de inicio de sesión al contexto de autenticación
        } catch (error) {
            // Maneja los errores de inicio de sesión
            setError('Hubo un error al iniciar sesión. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <View style={[theme.styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={[theme.styles.text, { fontSize: 44, marginBottom: 20, fontWeight: "bold", margin: 10, }]}>Iniciar Sesión</Text>
            <TextInput
                style={[theme.styles.buttonBackground, { marginBottom: 10, width: 300, height: 60, backgroundColor: '#98B8EC', borderRadius: 15, }]} // Utiliza el estilo del theme para el input
                placeholder="Correo Electrónico"
                onChangeText={text => setEmail(text)}
                value={email}
                keyboardType="email-address"
            />
            <TextInput
                style={[theme.styles.buttonBackground, { marginBottom: 10, width: 300, height: 60, backgroundColor: '#98B8EC', borderRadius: 15, }]} // Utiliza el estilo del theme para el input
                placeholder="Contraseña"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry
            />
            {error ? <Text style={[theme.styles.errorText, { marginBottom: 10 }]}>{error}</Text> : null}
            <TouchableOpacity
                style={[theme.styles.button, { marginBottom: 10, width: 200, height: 60, alignItems: "center", }]} // Personaliza los estilos del botón aquí
                onPress={handleLogin}
            >
                <Text style={{...theme.styles.buttonText, fontSize: 26,}}>Iniciar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
};


export default LoginScreen;