import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../hooks/useTheme';

const ChangeNameComponent: React.FC = () => {
  const { theme } = useTheme();
  const [newName, setNewName] = useState('');

  const handleChangeName = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');

      const response = await fetch(`http://localhost:3000/api/v2/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newName,
        }),
      });

      if (response.ok) {
        Alert.alert('Nombre actualizado exitosamente');
        setNewName(''); // Limpiar el campo de texto después de la actualización exitosa
      } else {
        Alert.alert('Error al actualizar el nombre. Inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      console.error('Error al actualizar el nombre del usuario:', error);
      Alert.alert('Error al actualizar el nombre. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={{ color: theme.colors.text, fontWeight: 'bold', fontSize: 20, marginBottom: 7, }}>Cambiar Nombre</Text>
      <TextInput
        style={[styles.input, { color: theme.colors.text }]}
        placeholder="Nuevo nombre"
        placeholderTextColor={theme.colors.text}
        value={newName}
        onChangeText={(text) => setNewName(text)}
      />
      <TouchableOpacity style={{ ...styles.button, backgroundColor: theme.colors.text, }} onPress={handleChangeName}>
        <Text style={styles.buttonText}>Actualizar Nombre</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 15,
    margin: 15,
    width: "90%",
    height: "37%",
    alignItems: 'center',
    justifyContent: 'center',
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

export default ChangeNameComponent;
