import path from 'path';
import { env } from 'process';
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
    // const { Storage } = await import('@google-cloud/storage');
    // const storage = new Storage({
    //   projectId: env.GOOGLE_CLOUD_PROJECT_ID,
    //   keyFilename: path.join(__dirname, '../zinc-union-365709-1e0f101db822.json'),
    // });
    // storage.getBuckets().then(console.log);
    // For more information on ways to initialize Storage, please see
    // https://googleapis.dev/nodejs/storage/latest/Storage.html

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
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
