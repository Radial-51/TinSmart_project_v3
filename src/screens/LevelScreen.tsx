import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Svg, Rect } from 'react-native-svg';
import { useWaterLevel } from '../hooks/useWaterLevelHook';

const LevelScreen = () => {
  const { theme } = useTheme();
  const { waterLevel, fetchWaterLevel } = useWaterLevel();

  const totalHeight = 220;
  const containerWidth = 320;
  const waterHeight = (totalHeight * (waterLevel ?? 0)) / 100;

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchWaterLevel();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={[theme.styles.container, { paddingHorizontal: 20, paddingTop: 20 }]}>
      <Text style={{ ...theme.styles.text, fontSize: 36 }}>Nivel de Agua</Text>
      <View style={{ ...theme.styles.containerSet, width: "95%", height: "90%", borderRadius: 17, margin: 10 }}>
        <View style={{ margin: 20, flexDirection: 'column', marginTop: 15, marginBottom: 20 }}>
          <Text style={theme.styles.text}>%{waterLevel}</Text>
        </View>
        <Svg height={totalHeight} width={containerWidth}>
          <Rect x={(containerWidth - 50) / 2} y="0" width="50" height={totalHeight} fill="#d9d9d9" />
          <Rect x={(containerWidth - 50) / 2} y={totalHeight - waterHeight} width="50" height={waterHeight} fill="#26a69a" />
        </Svg>
      </View>
    </View>
  );
};

export default LevelScreen;
