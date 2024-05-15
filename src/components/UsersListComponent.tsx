import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Switch, Image } from 'react-native';
import { useTheme } from '../hooks/useTheme'; // Importa el hook useTheme

interface User {
  id: number;
  name: string;
  email: string;
  rol: string;
  photo: string;
}

interface UserCardProps {
  user: User;
  onRoleChange: (userId: number, newRole: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onRoleChange }) => {
    const { theme } = useTheme(); // Obtiene el tema actual

  const handleRoleChange = (newRole: string) => {
    onRoleChange(user.id, newRole);
  };

  const cardStyle = user.rol === 'admin' ? styles.adminCard : styles.userCard;

  const getPhotoSource = (photoName: string) => {
    switch (photoName) {
      case 'photo1.jpg':
        return require('../../assets/photo1.jpg');
      case 'photo2.jpg':
        return require('../../assets/photo2.jpg');
      case 'photo3.jpg':
        return require('../../assets/photo3.jpg');
      case 'photo4.jpg':
        return require('../../assets/photo4.jpg');
      case 'photo5.jpg':
        return require('../../assets/photo5.jpg');
      case 'photo6.jpg':
        return require('../../assets/photo6.jpg');
      case 'photo7.jpg':
        return require('../../assets/photo7.jpg');
      case 'photo8.jpg':
        return require('../../assets/photo8.jpg');
      case 'photo9.jpg':
        return require('../../assets/photo9.jpg');
      case 'photo10.jpg':
        return require('../../assets/photo10.jpg');
      case 'photo11.jpg':
        return require('../../assets/photo11.jpg');
      case 'photo12.jpg':
        return require('../../assets/photo12.jpg');
      case 'photo13.jpg':
        return require('../../assets/photo13.jpg');
      case 'photo14.jpg':
        return require('../../assets/photo14.jpg');
      case 'photo15.jpg':
        return require('../../assets/photo15.jpg');
      case 'photo16.jpg':
        return require('../../assets/photo16.jpg');
      case 'photo17.jpg':
        return require('../../assets/photo17.jpg');
      case 'photo18.jpg':
        return require('../../assets/photo18.jpg');
      case 'photo19.jpg':
        return require('../../assets/photo19.jpg');
      case 'photo20.jpg':
        return require('../../assets/photo20.jpg');  
      default:
        return require('../../assets/photo_user.jpg');
    }
  };


  return (
    <View style={[styles.card, cardStyle]}>
        <View style={{flexDirection: 'row',}}>
            <Image source={getPhotoSource(user.photo)} style={{...styles.photo, marginTop:30, marginRight: 20, marginBottom: 20, }} />
            <View style={{flexDirection: 'column', alignContent: 'center', alignItems: 'center',}}>
                <Text style={styles.info} > {user.name}</Text>
                <Text style={styles.info}> {user.email}</Text>
                <Text style={styles.info} > {user.rol}</Text>
                <Switch
        value={user.rol === 'admin'}
        onValueChange={(value) => handleRoleChange(value ? 'admin' : 'user')}
      />
            </View>
        </View>

      
      
    </View>
  );
};

const UsersList: React.FC = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v2/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    const intervalId = setInterval(fetchUsers, 6000);

    return () => clearInterval(intervalId);
  }, []);

  const handleRoleChange = async (userId: number, newRole: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v2/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rol: newRole,
        }),
      });

      if (response.ok) {
        setUsers(users.map(user => user.id === userId ? { ...user, rol: newRole } : user));
      } else {
        console.error('Failed to update user role');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <View>
          {users.map(user => (
            user && <UserCard key={user.id} user={user} onRoleChange={handleRoleChange} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  adminCard: {
    backgroundColor: 'red', // Cambia el color de fondo a rojo si es admin
  },
  userCard: {
    backgroundColor: 'blue', // Cambia el color de fondo a azul si es user
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginLeft: 10,
  },
  info: {
    fontSize: 15,
    fontWeight: 'bold', 
    margin: 5, 
    marginHorizontal: 4, 
    color: 'white',
  },
});

export default UsersList;
