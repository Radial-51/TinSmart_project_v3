import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWaterLevel } from '../hooks/useWaterLevelHook';
import useNotification from '../hooks/useNotifications';
import { ThemeContext } from './../hooks/ThemeProvider';

const DEFAULT_ALARM_PERCENTAGE = '30'; // Porcentaje predeterminado

const AlarmScreen: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { expoPushToken } = useNotification();
  const { waterLevel } = useWaterLevel();
  const [alarmPercentage, setAlarmPercentage] = useState<string>(DEFAULT_ALARM_PERCENTAGE);
  const [currentWaterLevel, setCurrentWaterLevel] = useState<number | null>(null);

  useEffect(() => {
    loadAlarmPercentage();
    const intervalId = setInterval(fetchWaterLevel, 2000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log('Nivel de agua actual:', currentWaterLevel);
    checkWaterLevelForNotification();
  }, [currentWaterLevel]);

  const loadAlarmPercentage = async () => {
    try {
      const percentage = await AsyncStorage.getItem('alarmPercentage');
      if (percentage !== null) {
        setAlarmPercentage(percentage);
      }
    } catch (error) {
      console.error('Error loading alarm percentage:', error);
    }
  };

  const saveAlarmPercentage = async (percentage: string) => {
    try {
      await AsyncStorage.setItem('alarmPercentage', percentage);
      setAlarmPercentage(percentage);
      console.log('Porcentaje de alarma guardado:', percentage);
    } catch (error) {
      console.error('Error saving alarm percentage:', error);
    }
  };

  const handleSaveAlarmPercentage = () => {
    if (isNaN(Number(alarmPercentage))) {
      Alert.alert('Error', 'Ingrese un valor numérico válido.');
      return;
    }
    saveAlarmPercentage(alarmPercentage);
  };

  const fetchWaterLevel = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v2/containers');
      const data = await response.json();
      if (data.length > 0) {
        setCurrentWaterLevel(data[0].level);
      }
    } catch (error) {
      console.error('Error fetching water level:', error);
    }
  };

  const checkWaterLevelForNotification = () => {
    const percentage = parseFloat(alarmPercentage);
    if (!isNaN(percentage) && currentWaterLevel !== null && currentWaterLevel <= percentage) {
      sendWaterLevelNotification();
    }
  };

  const sendWaterLevelNotification = () => {
    if (expoPushToken) {
      sendPushNotification(expoPushToken);
    } else {
      console.error('No se ha podido obtener el expoPushToken');
    }
  };

  const sendPushNotification = async (expoPushToken: string) => {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Nivel de Agua Bajo',
      body: `El nivel de agua es ${currentWaterLevel}% y está por debajo del límite configurado.`,
    };

    try {
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
    } catch (error) {
      console.error('Error al enviar la notificación:', error);
    }
  };

  const { container, switchContainer, text, input, button, buttonText } = theme.styles;

  return (
    <View style={[theme.styles.container, { paddingHorizontal: 20, paddingTop: 20 }]}>
      <Text style={{ ...theme.styles.text, fontSize: 30, }}>Configura la Alarma</Text>
      <View style={{...theme.styles.containerSet, width: "95%", height: "90%", borderRadius: 10,}}>
        <TextInput
          style={[input, styles.input]}
          placeholder="Porcentaje de alarma"
          keyboardType="numeric"
          value={alarmPercentage}
          onChangeText={setAlarmPercentage}
        />
        <TouchableOpacity style={{ ...styles.button, backgroundColor: theme.colors.text, }} onPress={handleSaveAlarmPercentage}>
          <Text style={[buttonText, styles.buttonText]}>Guardar Porcentaje de Alarma</Text>
        </TouchableOpacity>
        <Text style={[text, styles.waterLevelText]}>
          Nivel de agua actual: {currentWaterLevel !== null ? `${currentWaterLevel}%` : 'Cargando...'}
        </Text>
        <Text style={[text, styles.alarmPercentageText]}>
          Porcentaje de alarma actual: {alarmPercentage}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  containerSet: {
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: 200,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#26A69A',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  waterLevelText: {
    marginTop: 10,
  },
  alarmPercentageText: {
    marginTop: 10,
  },
});

export default AlarmScreen;
