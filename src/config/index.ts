import * as dotenv from 'dotenv';

dotenv.config();
const port: string = process.env.PORT;
const uri: string = process.env.MONGODB_URI;
export { port, uri };
