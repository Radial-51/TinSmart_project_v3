import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { register, RegisterCredentials } from '../api/auth'; // Importa la función de registro y las interfaces necesarias

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const credentials: RegisterCredentials = { name, email, password }; // Crea un objeto con las credenciales
      const response = await register(credentials); // Llama a la función de registro

      // Si el registro es exitoso, puedes mostrar un mensaje o redirigir a otra pantalla
      console.log('Registro exitoso:', response);
    } catch (error) {
      // Si ocurre un error durante el registro, muestra un mensaje de error
      setError('Error al registrar el usuario. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Registrar" onPress={handleRegister} />
      <View style={styles.switchAuthContainer}>
        <Text style={styles.switchAuthText}>Ya tengo cuenta</Text>
        <Button
          title="Iniciar Sesión"
          onPress={() => navigation.navigate('Login')}
          color="green"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  switchAuthContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  switchAuthText: {
    marginRight: 10,
  },
});

export default RegisterScreen;
