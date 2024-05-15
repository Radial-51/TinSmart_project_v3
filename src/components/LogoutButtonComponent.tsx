import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { AuthContext } from './../context/AuthContext';

interface LogoutButtonProps {
  buttonStyle?: any;
  textStyle?: any;
}

const LogoutButtonComponent: React.FC<LogoutButtonProps> = ({ buttonStyle, textStyle }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { logout } = React.useContext(AuthContext);

  const handleLogout = () => {
    // Realizar la acción de cierre de sesión
    logout();
    // Navegar a la pantalla de inicio de sesión
    navigation.navigate('Login');
  };

  return (
    <TouchableOpacity
      onPress={handleLogout}
      style={[styles.button, { backgroundColor: 'red', }, buttonStyle]}
    >
      <Text style={[styles.text, { color: 'white' }, textStyle]}>Cerrar Sesión</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 230,
    height: 70,
    margin: 40,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default LogoutButtonComponent;
