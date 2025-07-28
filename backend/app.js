import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { PostsRouter } from './routes/posts.js';
import { PostRouter } from './routes/post.js';
import { UserRouter } from './routes/user.js';
import { CommentsRouter } from './routes/comments.js'


// CONFIGURACION DE VARIABLES DE ENTORNO//
dotenv.config();

//CREACION DE LA VARIABLE DE RUTAS//
const app = express();

//MIDDLEWARE//
app.use(express.json());

//COKIEPARSER//
app.use(cookieParser());

const allowedOrigins = ['http://localhost:5173'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    return next();
  }
  if (
    req.method === 'GET' &&
    (req.path.startsWith('/post') || req.path.startsWith('/posts'))
  ) {
    res.header('Access-Control-Allow-Origin', origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    return next();
  }
  res.status(403).json({ error: 'CORS policy: Not allowed by server.' });
});
app.get('/', (req, res) => {
  res.send(`
        <h2>BMX-Vids</h2>
        <a href="http://localhost:3048/posts">Posteos</a>
    `)
});

app.use('/posts', PostsRouter)
app.use('/post', PostRouter)
app.use('/users', UserRouter)
app.use('/comments', CommentsRouter)


const server = app.listen(process.env.PORT, () => {
  console.log(`Servidor encendido en http://localhost:${server.address().port}`);
});