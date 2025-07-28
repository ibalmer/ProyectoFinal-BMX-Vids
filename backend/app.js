import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
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

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://192.168.0.36:3000',
      'http://localhost:5175',
      'http://localhost:5174',
      'http://localhost:5173'
    ],
    credentials: true
  })
);

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