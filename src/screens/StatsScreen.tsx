import React, { useContext, useState } from 'react';
import { View, Text, Dimensions, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';
import ShowFirstChart from '../components/ShowFirstChart';
import ShowSecondChart from '../components/ShowSecondChart';
import ShowThirdChart from '../components/ShowThirdChart';

const StatsScreen = () => {
  const { authState } = useContext(AuthContext);
  const { theme } = useTheme();
  const [selectedDay, setSelectedDay] = useState(1); // Estado para almacenar el día seleccionado (1, 2, 3)

  const renderChart = () => {
    switch (selectedDay) {
      case 1:
        return <ShowFirstChart />;
      case 2:
        return <ShowSecondChart />;
      case 3:
        return <ShowThirdChart />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ ...theme.styles.container }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={{ height: "10%", alignItems: 'center', alignContent: 'center' }}>
          <Text style={{ color: theme.colors.text, fontSize: 30, fontWeight: 'bold', alignSelf: 'center' }}>Graficas de Dias Recientes</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.buttonBackground }, selectedDay === 1 && theme.styles.buttonSelected]}
            onPress={() => setSelectedDay(1)}
          >
            <Text style={selectedDay === 1 ? theme.styles.buttonTextSelected : theme.styles.buttonText}>Hoy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.buttonBackground }, selectedDay === 2 && theme.styles.buttonSelected]}
            onPress={() => setSelectedDay(2)}
          >
            <Text style={selectedDay === 2 ? theme.styles.buttonTextSelected : theme.styles.buttonText}>Ayer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.buttonBackground }, selectedDay === 3 && theme.styles.buttonSelected]}
            onPress={() => setSelectedDay(3)}
          >
            <Text style={selectedDay === 3 ? theme.styles.buttonTextSelected : theme.styles.buttonText}>Antier</Text>
          </TouchableOpacity>
        </View>
        {renderChart()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 50,
    paddingTop: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default StatsScreen;
