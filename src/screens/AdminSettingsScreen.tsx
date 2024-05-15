import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from "../hooks/useTheme";
import AdminForgotPasswordComponent from "../components/AdminForgotPasswordComponent";
import UsersList from "../components/UsersListComponent";

export const AdminSettingsScreen = () => {
  const { theme } = useTheme();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showUserList, setShowUserList] = useState(false);

  const handleToggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  const handleToggleUserList = () => {
    setShowUserList(!showUserList);
  };

  return (
    <View style={[theme.styles.container, { paddingHorizontal: 20, paddingTop: 20, }]}>
      <Text style={{ ...theme.styles.text, fontSize: 30 }}>Panel de Administrador</Text>
      <View style={{...theme.styles.containerSet, width: "95%", height: "90%",}}>
      <SafeAreaView>
        <View style={{flexDirection: "row",}}>
        <TouchableOpacity onPress={handleToggleUserList}>
        <View style={{backgroundColor: theme.colors.text, width: 150, height: 50,
          borderRadius: 15, alignContent: 'center', alignItems: 'center', margin: 8, }}>
          <Text style={{ ...theme.styles.text, fontWeight: 'bold', color: 'white', marginTop: 10,  }}>Usuarios</Text>
        </View> 
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleForgotPassword}>
          <View style={{backgroundColor: theme.colors.text, width: 150, height: 50,
          borderRadius: 15, alignContent: 'center', alignItems: 'center', margin: 8, }}>
          <Text style={{ ...theme.styles.text, fontWeight: 'bold', color: 'white', fontSize: 15, marginHorizontal: 19, }}>Recupera Contraseñas</Text>
          </View>
        </TouchableOpacity>
        </View>
        {showUserList && (
              <ScrollView>
                <UsersList/>
              </ScrollView>
        )}
        {showForgotPassword && (
            <AdminForgotPasswordComponent />
        )}
        </SafeAreaView>
      </View>
    </View>
  );
};
