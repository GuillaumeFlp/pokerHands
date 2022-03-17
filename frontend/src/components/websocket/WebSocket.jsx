import React, { createContext } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';

const WebSocketContext = createContext(null);

export { WebSocketContext };

const WebSocket = ({ children }) => {
  const dispatch = useDispatch();
  let socket;
  let webSocketContext;

  if (!socket) {
    socket = io(window.env.socketUrl, {
      transports: ['websocket'],
      reconnection: true,
      forceNew: true,
      reconnectionDelayMax: 1000,
      reconnectionAttempts: Infinity,
      autoConnect: true
    });

    socket.on('connect', () => {
      console.log('WebSocket connected !');
    });

    socket.on('disconnect', (reason) => {
      console.log(`WebSocket disconnected: ${reason}`);
    });

    socket.on('users_logged', (recevData) => {
      dispatch({ type: 'UPDATE_USERSLOGGED', data: recevData });
    });

    socket.on('result', (recevData) => {
      dispatch({ type: 'UPDATE_RESULT', data: recevData });
    });

    socket.open();

    webSocketContext = {
      socket: socket
    };
  }

  return (
    <WebSocketContext.Provider value={webSocketContext}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocket;
