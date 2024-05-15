import { useEffect, useState } from 'react';

const useApiYesterdayHook = () => {
    const [containersData, setContainersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v2/containers/days/yesterday');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();

                if (data.length > 0) {
                    // Obtener el primer y último elemento de la lista de contenedores
                    const firstContainer = data[0];
                    const lastContainer = data[data.length - 1];

                    // Encontrar el nivel más alto y más bajo
                    let highestLevel = Number.MIN_VALUE;
                    let lowestLevel = Number.MAX_VALUE;
                    data.forEach(container => {
                        if (container.level > highestLevel) {
                            highestLevel = container.level;
                        }
                        if (container.level < lowestLevel) {
                            lowestLevel = container.level;
                        }
                    });

                    // Construir el objeto de respuesta con los datos requeridos
                    const responseObj = {
                        firstDay: formatTime(firstContainer.timestamp),
                        lastDay: formatTime(lastContainer.timestamp),
                        highestLevel: highestLevel,
                        lowestLevel: lowestLevel,
                        containers: data
                    };

                    setContainersData(responseObj);
                } else {
                    setContainersData([]);
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Función para formatear la hora en formato de PM/AM
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convertir horas de 24 a 12
        return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    };

    return [containersData, loading, error];
};

export default useApiYesterdayHook;
