import * as mongoose from 'mongoose';
import { uri } from '../config/index';
import { databaseLogger } from '../loggers/database';

async function connectToMongoDB(): Promise<boolean> {
  try {
    mongoose.set('useFindAndModify', false);
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    databaseLogger.info('Database connection established successfully!');
    return true;
  } catch (error) {
    databaseLogger.error(`Error during database connection :${error}`);
    return false;
  }
}

export default connectToMongoDB;
