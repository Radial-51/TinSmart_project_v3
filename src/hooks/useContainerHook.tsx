import { useState, useEffect } from 'react';

interface Container {
  id: number;
  level: number;
  timestamp: Date;
  status: string;
  deletedAt?: Date;
}

export const useFetchContainers = () => {
  const [containers, setContainers] = useState<Container[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);

  const fetchContainers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v2/containers');
      const data = await response.json();
      setContainers(data);
      setTotalRecords(data.length); // Establecer la cantidad total de registros
    } catch (error) {
      console.error('Error fetching containers:', error);
    }
  };

  useEffect(() => {
    fetchContainers();
  }, []);

  return { containers, fetchContainers, totalRecords }; // Incluir totalRecords en el retorno del hook
};
