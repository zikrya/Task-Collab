export interface ClientToServerEvents {
    clientMsg: (data: { room: string; message: string }) => void;
  }

  export interface ServerToClientEvents {
    serverMsg: (data: { room: string; message: string }) => void;
  }
