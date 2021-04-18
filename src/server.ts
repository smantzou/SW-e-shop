import App from './app';
import CustomerController from './controllers/customer';
import { port, uri } from './config/index';

const app = new App([new CustomerController()], port, uri);

app.listen();

//connected to db test out models implements controllers and services
