import { Hono } from 'hono';
import users from './routes/userRoutes';
import blogrouter from './routes/blog';
import blogInteractionsRouter from "./routes/blogInteractions";
import savedBlogsRouter from "./routes/savedBlogs";
import { cors } from 'hono/cors'
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
app.use('*',cors());
app.route('/api/v1/users', users);
app.route('/api/v1/blog', blogrouter);
app.route('/api/v1/blog/interactions', blogInteractionsRouter);
app.route('/api/v1/blog/saved', savedBlogsRouter);



export default app;
