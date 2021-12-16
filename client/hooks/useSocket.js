import io from 'socket.io-client';
import { useCallback, useEffect, useRef } from 'react';

const useSocket = (server) => {
  const socketRef = useRef();

  const createSocket = useCallback(() => {
    if (!socketRef?.current) {
      socketRef.current = io(server);
    }

    return socketRef.current;
  }, [server]);

  useEffect(() => {
    createSocket();

    return () => createSocket().disconnect();
  }, [createSocket]);

  return socketRef;
};

export default useSocket;
