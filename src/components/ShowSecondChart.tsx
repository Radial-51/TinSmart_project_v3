import React from 'react';
import { View, Text, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import useApiYesterdayHook from '../hooks/useApiYesterdayHook';
import { BarChart } from 'react-native-chart-kit';
import { useTheme } from '../hooks/useTheme';

const ShowSecondChart = () => {
  const { theme } = useTheme();
  const [containersData, loading, error] = useApiYesterdayHook();

  const chartConfig = {
    backgroundColor: 'white',
    backgroundGradientFrom: 'green',
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

  let reversedLabels = [];
  let data = [];

  if (containersData && containersData.containers) {
    // Seleccionar solo los últimos 10 elementos
    const lastTenContainers = containersData.containers.slice(-10);
    reversedLabels = lastTenContainers.map(container => {
      // Formatear la fecha para mostrar solo la hora en formato de 24 horas
      const date = new Date(container.timestamp);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    }).reverse();
    data = lastTenContainers.map(container => container.level).reverse();
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Información de Ayer</Text>
        <View style={styles.cardContent}>
          {loading ? (
            <ActivityIndicator size="large" color="blue" />
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : (
            <View style={{backgroundColor: theme.colors.background, borderRadius: 10, alignContent: 'center', 
            alignItems: 'center', width: "100%", padding: 10}}>
              <Text style={styles.infoText}>Primer Registro: {containersData?.firstDay}</Text>
              <Text style={styles.infoText}>Último Registro: {containersData?.lastDay}</Text>
              <Text style={styles.infoText}>Nivel más alto registrado: {containersData?.highestLevel}</Text>
              <Text style={styles.infoText}>Nivel más bajo registrado: {containersData?.lowestLevel}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Gráfico de Ayer</Text>
        <View style={styles.cardContent}>
          {!loading && !error && containersData && containersData.containers ? (
            <BarChart
              data={{
                labels: reversedLabels,
                datasets: [
                  {
                    data: data,
                  },
                ],
              }}
              width={width * 0.9}
              height={height * 0.3}
              yAxisLabel="$"
              yAxisInterval={1}
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

export default ShowSecondChart;
