// En tu componente ConfigScreen

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import FunButton from '../components/FunBotton'; // Asegúrate de importar FunButton correctamente
import ChangePhotoScreen from './ChangePhotoScreen'; // Asegúrate de importar ChangePhotoScreen correctamente

const ConfigScreen = () => {
  const navigation = useNavigation();

  return (
    <FunButton
      navigateTo="ChangePhoto"
      text="Cambia tu foto"
    />
  );
};

export default ConfigScreen;
