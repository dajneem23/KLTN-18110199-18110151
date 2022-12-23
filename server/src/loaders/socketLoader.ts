import { Server } from 'socket.io';
import Container, { Token } from 'typedi';

export const IoToken = new Token<Server>('_socketIO');

const socketLoader = (io: Server) => {
  Container.set(IoToken, io);
};
export default socketLoader;
