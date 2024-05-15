// api/auth.ts

interface LoginCredentials {
    email: string;
    password: string;
  }
  
  interface LoginResponse {
    token: string;
    email: string;
  }
  
  export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      // Aquí realizarías la llamada a tu API para realizar el inicio de sesión
      // Por ejemplo, utilizando fetch, axios, u otra librería de tu elección
      const response = await fetch('http://localhost:3000/api/v2/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        // Si la respuesta no es exitosa, lanzar un error
        throw new Error('Error al iniciar sesión');
      }
  
      // Si la respuesta es exitosa, obtener los datos de la respuesta en formato JSON
      const data: LoginResponse = await response.json();
      return data;
    } catch (error) {
      // Manejar los errores de la llamada a la API
      throw new Error('Error al realizar la solicitud');
    }
  };
  