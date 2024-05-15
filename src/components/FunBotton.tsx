import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme'; // Importa el hook useTheme

interface FunButtonProps {
  width?: number;
  height?: number;
  navigateTo?: string;
  textColor?: string;
  text?: string;
}

const FunButton: React.FC<FunButtonProps> = ({
  width = 80,
  height = 40,
  navigateTo = 'Home',
  textColor = 'white',
  text = 'Press Me',
}) => {
  const navigation = useNavigation();
  const { theme } = useTheme(); // Obtén el tema actual

  const handlePress = () => {
    navigation.navigate(navigateTo);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        {
          width,
          height,
          backgroundColor: theme.styles.button.backgroundColor || theme.colors.buttonBackground, // Utiliza el color del botón del tema como color de fondo predeterminado
          borderRadius: 8,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
        },
      ]}
      onPress={handlePress}
    >
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});

export default FunButton;
