import { Hono } from 'hono';
import users from './routes/userRoutes';
import blogrouter from './routes/blog';

// type EnvBindings = {
//   JWT_SECRET: string;
// };
// Create the main Hono app
const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET:string
  }
}>();
app.route('api/v1/blog',blogrouter);
app.route('api/v1/users',users);



export default app;
