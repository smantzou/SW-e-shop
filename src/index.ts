import * as express from 'express';
import { port } from './config/index';
import { initExpress } from './loaders/index';
import { serverLogger } from './loggers/server';

function startServer() {
  const app = express();
  initExpress(app);

  app.listen(port, () => {
    serverLogger.info(`Server is running on port ${port}`);
  });
}

startServer();

//connected to db test out models implements controllers and services
