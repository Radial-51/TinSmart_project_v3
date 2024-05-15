import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useFetchContainers } from '../hooks/useContainerHook';
import { format } from 'date-fns';

const LogScreen = () => {
  const { theme } = useTheme();
  const { containers, fetchContainers } = useFetchContainers();
  const [recentContainers, setRecentContainers] = useState([]);

  useEffect(() => {
    fetchContainers();

    const intervalId = setInterval(() => {
      fetchContainers();
    }, 800);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const sortedContainers = [...containers].sort((a, b) => b.id - a.id);
    const recentContainers = sortedContainers.slice(0, 10);

    setRecentContainers(recentContainers);
  }, [containers]);

  return (
    <View style={[theme.styles.container, { paddingHorizontal: 20, paddingTop: 20 }]}>
      <Text style={{ ...theme.styles.text, fontSize: 36, marginBottom: 1 }}>Últimos Registros</Text>
      <View style={{ ...theme.styles.containerSet, width: "95%", height: "90%", borderRadius: 17, margin: 10, padding: 5, }}>
        <ScrollView>
          {recentContainers.length === 0 ? (
            <Text style={{ color: 'white' }}>Cargando...</Text>
          ) : (
            recentContainers.map((container) => (
              <View
                key={container.id}
                style={{ marginVertical: 5, backgroundColor: theme.colors.text, borderRadius: 10, padding: 10 }}
              >
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>
                  Nivel de Agua: {container.level}
                </Text>
                <Text style={{ color: 'white', marginBottom: 5 }}>Estado: {container.status}</Text>
                <Text style={{ color: 'white', marginBottom: 5 }}>
                  Fecha: {format(new Date(container.timestamp), 'dd/MM/yyyy')}
                </Text>
                <Text style={{ color: 'white', marginBottom: 5 }}>
                  Hora: {format(new Date(container.timestamp), 'h:mm:ss a')}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default LogScreen;
