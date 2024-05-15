import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface ForgotPasswordResponse {
  newPassword: string;
}

const AdminForgotPasswordComponent: React.FC = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v2/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.ok) {
        const data: ForgotPasswordResponse = await response.json();
        setNewPassword(data.newPassword);
        Alert.alert('Nueva contraseña generada', `La nueva contraseña es: ${data.newPassword}`);
      } else {
        Alert.alert('Error', 'No se pudo recuperar la contraseña. Inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      console.error('Error al recuperar la contraseña:', error);
      Alert.alert('Error', 'No se pudo recuperar la contraseña. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background, alignSelf: 'center',  }]}>
      <Text style={{ color: theme.colors.text, marginHorizontal: 30, }}>Recuperar Contraseña de Usuarios</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text }]}
        placeholder="Correo electrónico"
        placeholderTextColor={theme.colors.text}
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity style={{ ...styles.button, backgroundColor: theme.colors.text, }} onPress={handleForgotPassword}>
      <Text style={styles.buttonText}>Recuperar Contraseña</Text>
      </TouchableOpacity>
      {newPassword ? (
        <Text style={{ ...styles.text, color: theme.colors.text }}>Nueva Contraseña: {newPassword} {'\n'}Correo: {email}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 15,
    margin: 15,
    width: '90%',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#26A69A',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    marginVertical: 10,
  },
});

export default AdminForgotPasswordComponent;
