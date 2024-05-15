import React from 'react';
import { View, Text, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import useApiBeforeYesterdayHook from '../hooks/useApiBeforeYesterdayesterdayHook';
import { ProgressChart } from 'react-native-chart-kit';
import { useTheme } from '../hooks/useTheme';

const ShowThirdChart = () => {
  const { theme } = useTheme();
  const [containersData, loading, error] = useApiBeforeYesterdayHook();

  const chartConfig = {
    backgroundColor: 'white',
    backgroundGradientFrom: 'blue',
    backgroundGradientTo: 'black',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 20,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: 'white',
    },
  };

  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;

  let progressData = [];

  if (containersData && containersData.containers) {
    progressData = containersData.containers.map(container => container.level);
  }

  // Ajustamos los datos para que el primer punto sea 0 y el último sea 1
  if (progressData.length > 0) {
    const minValue = Math.min(...progressData);
    const maxValue = Math.max(...progressData);
    progressData = progressData.map(value => (value - minValue) / (maxValue - minValue));
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Información de Antier</Text>
        <View style={styles.cardContent}>
          {loading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : (
            <View style={{backgroundColor: theme.colors.background, borderRadius: 10, alignContent: 'center', 
            alignItems: 'center', width: "100%", padding: 10}}>
              <Text style={styles.infoText}>Primer Registro: {containersData?.lastDay}</Text>
              <Text style={styles.infoText}>Último Registro: {containersData?.firstDay}</Text>
              <Text style={styles.infoText}>Nivel más alto registrado: {containersData?.highestLevel}</Text>
              <Text style={styles.infoText}>Nivel más bajo registrado: {containersData?.lowestLevel}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Gráfico de Antier</Text>
        <View style={styles.cardContent}>
          {!loading && !error && containersData && containersData.containers ? (
            <ProgressChart
              data={progressData}
              width={width * 0.9}
              height={height * 0.3}
              chartConfig={chartConfig}
              style={{ borderRadius: 20 }}
            />
          ) : (
            <Text>No hay datos disponibles</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  card: {
    margin: 10,
    width: '95%',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    alignSelf: 'center',
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  cardContent: {
    width: '100%',
  },
  infoText: {
    color: 'white', // o cualquier color que desees
    fontSize: 16,
    marginVertical: 5,
  },
});

export default ShowThirdChart;
