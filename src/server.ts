import UserController from './controllers/user';
import App from './app';

import { port, uri } from './config/index';
import AuthenticationController from './controllers/authentication';

const app = new App([new AuthenticationController(), new UserController()], port, uri);

app.listen();

//https://wanago.io/2018/12/24/typescript-express-registering-authenticating-jwt/
//spase to customer resource me to authentication
//synexise sto part 5
