/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { databaseLogger } from './loggers/database';
import { appLogger } from './loggers/app';
import * as mongoose from 'mongoose';
import errorMiddleware from './middleware/error';
import * as cookieParser from 'cookie-parser';

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers, port, uri) {
    this.app = express();
    this.port = port;
    this.connectToTheDatabase(uri);
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
  private connectToTheDatabase(uri) {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    databaseLogger.info('Database connection established successfully!');
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
  public listen() {
    this.app.listen(this.port, () => {
      appLogger.info(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
