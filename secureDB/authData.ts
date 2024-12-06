import { setItemAsync, getItemAsync, deleteItemAsync } from 'expo-secure-store';

export const saveTokenToSecureStore = async (token: string): Promise<void> => {
  try {
    await setItemAsync('authToken', token);
    console.log('Token saved to secure storage.');
  } catch (error) {
    console.error('Failed to save token to secure storage:', error);
  }
};

export const getTokenFromSecureStore = async (): Promise<string | null> => {
  try {
    const token = await getItemAsync('authToken');
    return token;
  } catch (error) {
    console.error('Failed to retrieve token from secure storage:', error);
    return null;
  }
};

// Delete Token
export const deleteTokenFromSecureStore = async (): Promise<void> => {
  try {
    await deleteItemAsync('authToken');
    console.log('Token deleted from secure storage.');
  } catch (error) {
    console.error('Failed to delete token from secure storage:', error);
  }
};
