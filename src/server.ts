import OrderController from './controllers/order';
import App from './app';
import { port, uri } from './config/index';
import AuthenticationController from './controllers/authentication';
import ProductController from './controllers/product';
import UserController from './controllers/user';
const app = new App(
  [new AuthenticationController(), new UserController(), new ProductController(), new OrderController()],
  port,
  uri,
);

app.listen();
