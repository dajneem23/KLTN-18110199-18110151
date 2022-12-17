import 'reflect-metadata';

(async () => {
  try {
    // ----------------------------------------------------------------
    // Load modules
    // ----------------------------------------------------------------

    // Logger
    (await import('./loaders/loggerLoader')).default();
    // Database (mongodb)
    await (await import('./loaders/mongoDBLoader')).default();
    // Caching (Redis)
    // await (await import('./loaders/redisClientLoader')).default();
    // Express application
    const app = (await import('./loaders/expressLoader')).default();
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { createServer } = await import('http');
    const { Server } = await import('socket.io');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const httpServer = createServer(app);
    const io = new Server(httpServer, { cors: { origin: '*' } });
    io.on('connection', ({ id }) => {
      // console.log('Connection established', id);
      // getApiAndEmit(socket);
      // socket.on('disconnect', () => {
      //   console.log('Disconnected');
      // });
    });

    const getApiAndEmit = (socket: any) => {
      const response = 'response you need';
      socket.emit('FromAPI', response);
    };
    // Creates a client using Application Default Credentials
    // ----------------------------------------------------------------
    // Start server
    // ----------------------------------------------------------------

    app.listen(app.get('port'), () => {
      console.info(`
#################################################################
  - Name: ${app.get('name')}
  - Version: ${app.get('version')}
  - Environment: ${app.get('env')}
  - Host: ${app.get('host')}:${app.get('port')}
  - Database (Mongodb): WIBU_BLOG
#################################################################
      `);
    });
    httpServer.listen(3000, function () {
      // console.log('Running on : ', httpServer.address());
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
