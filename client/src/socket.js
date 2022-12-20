import { io } from 'socket.io-client';

// Variables for socket.io-client
const socketClient = {};
// Set socket connection
socketClient.setup = function () {
  const baseURL = process.env.VUE_APP_BASE_URL;
  console.log({ baseURL });
  socketClient.io = io(baseURL, {
    closeOnBeforeunload: false, //Prevent close when there is `beforeunload` event
  });
};
socketClient.setup();

// Register a new handler for the given event
socketClient.listen = function (event, callback) {
  console.log({ socketReceiveEvent: event });
  socketClient.io.on(event, callback);
};

socketClient.listen('disconnect', function (reason) {
  console.log({ socketEvent: 'Disconnected! ', reason });
});

// Register sender for the given event
socketClient.send = function (event, data) {
  console.log({ socketSendEvent: event, data });
  socketClient.io.emit(event, data);
};

// Removes the previously registered listener for the given event
socketClient.removeListener = function (event, callback) {
  socketClient.io.off(event, callback);
};

export default socketClient;