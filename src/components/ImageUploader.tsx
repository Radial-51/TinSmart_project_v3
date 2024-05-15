import React, { useState } from 'react';
import { View, Text, Pressable, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ImageUploaderProps {
  onImageSelected: (uri: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected }) => {
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);

  const pickImageAsync = async () => {
    try {
      // Siempre solicitar permisos
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission denied', 'Please grant permission to access the media library.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImageUri(result.uri);
        onImageSelected(result.uri);
      } else {
        Alert.alert('You did not select any image.');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick an image. Please try again later.');
    }
  };

  return (
    <View>
      <Pressable style={styles.button} onPress={pickImageAsync}>
        <Text style={styles.buttonText}>Choose a photo</Text>
      </Pressable>
      {selectedImageUri && (
        <View>
          <Text style={styles.imageText}>Selected Image:</Text>
          <Image source={{ uri: selectedImageUri }} style={styles.image} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#26A69A',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  imageText: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});

export default ImageUploader;
