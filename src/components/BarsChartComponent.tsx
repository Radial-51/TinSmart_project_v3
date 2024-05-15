import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import useAPIStats from './../hooks/useApiTodayHook';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const BarsWithStats: React.FC = () => {
    const [stats, loading, error] = useAPIStats();

    const [beneficios, setBeneficios] = useState<number[]>([]);
    const [meses, setMeses] = useState<string[]>([]);

    useEffect(() => {
        // Obtener datos de la API y actualizar el estado
        if (stats && Array.isArray(stats)) { // Verificar si stats es un array válido
            const newBeneficios = stats.map(item => item.level);
            const newMeses = stats.map(item => {
                const date = new Date(item.timestamp);
                return date.toLocaleString('es', { month: 'long' });
            });
            setBeneficios(newBeneficios);
            setMeses(newMeses);
        }
    }, [stats]);

    const misoptions = {
        responsive: true,
        animation: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                min: -25,
                max: 100
            },
            x: {
                ticks: { color: 'rgba(0, 220, 195)' }
            }
        }
    };

    const midata = {
        labels: meses,
        datasets: [
            {
                label: 'Beneficios',
                data: beneficios,
                backgroundColor: 'rgba(0, 220, 195, 0.5)'
            }
        ]
    };

    if (loading) {
        return <View><Text>Cargando...</Text></View>;
    }

    if (error) {
        return <View><Text>Error: {error}</Text></View>;
    }

    return (
        <View>
            <Bar data={midata} options={misoptions} />
        </View>
    );
};

export default BarsWithStats;
