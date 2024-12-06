import * as SQLite from 'expo-sqlite';

const connectDB = async()=>{
    return await SQLite.openDatabaseAsync('messages.db');
}

interface Message{
    text:string, 
    sender:string, 
    receiver:string, 
    timestamp:string,
    status:string,
    image:string   
}

export const initMessageDB = async () => {
  const db  = await connectDB();
  await db.execAsync(`CREATE TABLE IF NOT EXISTS Messages (
    id INTEGER PRIMARY KEY NOT NULL,
    text TEXT NOT NULL,
    sender TEXT NOT NULL,
    receiver TEXT NOT NULL,  
    timestamp TEXT NOT NULL,
    status TEXT NOT NULL, 
    image TEXT 
  );`);
};

// Function to save a message
export const syncMessage = async (message:Message) => {
    const db  = await connectDB();
    await db.runAsync('INSERT INTO Messages (text, sender, receiver, timestamp, status, image) VALUES (?, ?, ?, ?, ?, ?)', 
    message.text, 
    message.sender, 
    message.receiver, 
    message.timestamp,
    message.status,
    message.image 
  );
};

// Function to get all messages
export const getSyncMessages = async () => {
  const db  = await connectDB();
  const allRows = await db.getAllAsync('SELECT * FROM Messages');
  return allRows; 
};

// Function to delete a message 
export const deleteMessage = async (id:string) => {
  const db  = await connectDB();
  await db.runAsync('DELETE FROM Messages WHERE id = ?;', [id]);
};


// Call the example usage function
// exampleUsage()