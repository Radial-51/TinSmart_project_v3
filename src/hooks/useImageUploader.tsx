import { useState } from 'react';

interface ImageUploaderResult {
  uploadImage: (photoName: string) => Promise<void>;
  error: Error | null;
}

const useImageUploader = (userId: number): ImageUploaderResult => {
  const [error, setError] = useState<Error | null>(null);

  const uploadImage = async (photoName: string) => {
    try {
      const formData = new FormData();
      formData.append('photo', photoName); // Agrega el nombre de la foto como parámetro

      const response = await fetch(`http://localhost:3000/api/v2/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', // Cambia el tipo de contenido a application/json
        },
        body: JSON.stringify({ photo: photoName }), // Envía el nombre de la foto en formato JSON
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      console.log('Image uploaded successfully');
    } catch (error) {
      setError(error);
    }
  };

  return { uploadImage, error };
};

export default useImageUploader;
