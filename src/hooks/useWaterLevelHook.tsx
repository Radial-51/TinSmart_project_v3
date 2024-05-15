// useWaterLevelHook.tsx
import { useState, useEffect } from 'react';

export const useWaterLevel = () => {
  const [waterLevel, setWaterLevel] = useState<number | null>(null);

  const fetchWaterLevel = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v2/containers'); // Ajusta la ruta según tu API
      const data = await response.json();

      // Supongo que 'data' es un array y el valor más reciente está en el primer elemento
      if (data.length > 0) {
        setWaterLevel(data[0].level);
      }
    } catch (error) {
      console.error('Error fetching water level:', error);
    }
  };

  useEffect(() => {
    fetchWaterLevel();
  }, []);

  return { waterLevel, fetchWaterLevel };
};
