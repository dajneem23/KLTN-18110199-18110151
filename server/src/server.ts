import 'reflect-metadata';
import { errorHandler, notFoundHandler } from './loaders/expressLoader';

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
    const APIRoutesV1 = (await import('@/api/routes/v1')).default;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { createServer } = await import('http');
    const { Server } = await import('socket.io');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const httpServer = createServer(app);
    const io = new Server(httpServer, { cors: { origin: '*' } });
    io.on('connection', async (socket) => {
      console.info('Connection established', socket.id);
      // socket.on('disconnect', () => {
      //   console.log('Disconnected');
      // });
      socket.on('join', ({ room }) => {
        console.info('join', room);
        socket.join(room);
      });
    });
    (await import('./loaders/socketLoader')).default(io);

    // Creates a client using Application Default Credentials
    // ----------------------------------------------------------------
    // Start server
    // ----------------------------------------------------------------

    //     app.listen(app.get('port'), () => {
    //       console.info(`
    // #################################################################
    //   - Name: ${app.get('name')}
    //   - Version: ${app.get('version')}
    //   - Environment: ${app.get('env')}
    //   - Host: ${app.get('host')}:${app.get('port')}
    //   - Database (Mongodb): WIBU_BLOG
    // #################################################################
    //       `);
    //     });
    APIRoutesV1(app);

    // ----------------------------------------------------------------
    // Error handlers
    // ----------------------------------------------------------------

    app.use(notFoundHandler);
    app.use(errorHandler);

    httpServer.listen(app.get('port'), function () {
      // console.log('Running on : ', httpServer.address());
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
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
