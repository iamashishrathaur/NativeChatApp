import { io } from 'socket.io-client';


const socket = io(process.env.BASE_URL,{query:{userId:UserActivation._id}});

export const sendMessage = (message) => {
  socket.emit('new_message', message);
};

export const receiveMessages = (callback) => {
  socket.on('new_message', (message) => {
    callback(message);
  });
};

export default socket;
