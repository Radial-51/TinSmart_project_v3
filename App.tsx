import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigation';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/hooks/ThemeProvider'; // Importa el ThemeProvider desde la ubicación correcta


const App = () => {
    return (
        <ThemeProvider>
            
                <AppState>
                    <DrawerNavigator/>
                </AppState>
                
        </ThemeProvider>
    );
}

const AppState = ( { children }: {children: React.ReactNode} ) => {
    return(
        <AuthProvider>
            { children }
        </AuthProvider>
    );
}

export default App;
