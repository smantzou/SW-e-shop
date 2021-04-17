import * as express from 'express';
import { loadExpress } from './express';
import connectToMongoDB from './mongoose';

export function initExpress(app: express.Application): express.Application {
  app = loadExpress(app);
  if (!connectToMongoDB()) {
    process.exit(1);
  }
  return app;
}
