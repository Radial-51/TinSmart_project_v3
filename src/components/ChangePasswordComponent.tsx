import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../hooks/useTheme';
import { AuthContext } from './../context/AuthContext';

const ChangePasswordComponent: React.FC = () => {
  const { theme } = useTheme();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { logout } = useContext(AuthContext);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId');

      const response = await fetch(`http://localhost:3000/api/v2/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      });

      if (response.ok) {
        Alert.alert('Contraseña actualizada exitosamente');
        logout(); // Cerrar sesión después de actualizar la contraseña con éxito
        setNewPassword(''); // Limpiar el campo de texto después de la actualización exitosa
        setConfirmPassword('');
      } else {
        Alert.alert('Error al actualizar la contraseña. Inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      console.error('Error al actualizar la contraseña del usuario:', error);
      Alert.alert('Error al actualizar la contraseña. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.text, fontWeight: 'bold', fontSize: 20, marginBottom: 7, }}>Cambiar Contraseña</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text }]}
        placeholder="Nueva contraseña"
        placeholderTextColor={theme.colors.text}
        secureTextEntry
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />
      <TextInput
        style={[styles.input, { color: theme.colors.text }]}
        placeholder="Confirmar contraseña"
        placeholderTextColor={theme.colors.text}
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={{ ...styles.button, backgroundColor: theme.colors.text, }} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Actualizar Contraseña</Text>
      </TouchableOpacity>
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
});

export default ChangePasswordComponent;
