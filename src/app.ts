import express, { Application, Request, Response } from 'express';
import { booksRouter } from './app/controllers/book.Controller';


const app: Application = express();

app.use(express.json());


app.use("/api/books", booksRouter)
// app.use("/users", usersRouter)




app.get('/', (req: Request, res: Response) => {
    res.send('hello sirr');
});

export default app;
