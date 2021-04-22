import App from './app';
import { port, uri } from './config/index';
import AuthenticationController from './controllers/authentication';
import ProductController from './controllers/product';
import UserController from './controllers/user';
const app = new App([new AuthenticationController(), new UserController(), new ProductController()], port, uri);

app.listen();

//https://wanago.io/2018/12/24/typescript-express-registering-authenticating-jwt/
//ftiakse to auth middleware
