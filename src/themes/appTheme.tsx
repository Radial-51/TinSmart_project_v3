import { StyleSheet } from 'react-native';


export const lightTheme = {
    colors: {
        primary: 'black', // Azul claro para representar el agua
        text: '#011137', // Azul oscuro para el texto
        background: '#5A87CE', // Color de fondo
        buttonBackground: '#00B59C', // Verde azulado para botones o acciones positivas
        buttonText: 'white', // Color del texto de los botones
        content: '#5B88CF',
    },
    styles: StyleSheet.create({
        container: {
            borderRadius: 10,
            margin: 8,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#6B99E3',
        },
        containerSet: {
            borderRadius: 10,
            margin: 8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#B8D1F8',
        },
        text: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#37474F',
        },
        button: {
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
            backgroundColor: '#26A69A',
        },
        buttonText: {
            fontWeight: 'bold',
            color: 'white',
        },
    }),
};

export const darkTheme = {
    colors: {
        primary: '#BE006B', // Gris oscuro para el fondo en modo oscuro
        text: '#7E0047', // Gris claro para el texto en modo oscuro
        background: '#DF67AB', // Gris oscuro para el fondo en modo oscuro
        buttonBackground: '#F62199', // Gris azulado para botones o acciones positivas en modo oscuro
        buttonText: 'white', // Color del texto de los botones
        content: '#02255C',
    },
    styles: StyleSheet.create({
        container: {
            borderRadius: 10,
            margin: 8,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ED69B4',
        },
        containerSet: {
            borderRadius: 10,
            margin: 8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#B40066',
        },
        text: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#CFD8DC',
        },
        button: {
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
            backgroundColor: '#F30089',
        },
        buttonText: {
            fontWeight: 'bold',
            color: 'white',
        },
    }),
};
