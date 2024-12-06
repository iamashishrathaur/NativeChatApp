import * as SQLite from 'expo-sqlite';

const connectDB = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('user.db');
    return db;
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};


interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export const initAuthDB = async () => {
  const db = await connectDB();
  if(!db){
    return
  }
  // await db.runAsync('DROP TABLE IF EXISTS User');
  
  await db.execAsync(`
      CREATE TABLE IF NOT EXISTS User (
        _id TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      );
    `);
};

export const insertAuthUser = async (user: User) => {
  const db = await connectDB();
  if(!db){
    return
  }
  try {
    const result = await db.runAsync(
      'INSERT OR REPLACE INTO User (_id, name, email) VALUES (?, ?, ?)',
      user._id,
      user.name,
      user.email,
    );
    return result;
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
};

export const fetchAuthUser = async (): Promise<User | null> => {
  const db = await connectDB();
  if (!db) {
    return null;
  }
  try {
    const user = await db.getFirstAsync('SELECT * FROM User');
    return user ? (user as User) : null;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const logoutAuthUser = async () => {
  const db = await connectDB();
  if(!db){
    return
  }
  try {
    const result = await db.runAsync('DELETE FROM User');
    return result;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};
