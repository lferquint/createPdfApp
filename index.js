import express, { json } from 'express'
import { urlencoded } from 'express';
import router from './routes/pdfGen.routes.js'
import cors from 'cors'
const app = express();

//Global const
const PORT = 3000;


//Middlewares
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(urlencoded({
    extended: true
}));
app.use(express.json());


//Routes
app.use(router);

//Public
app.use(express.static('models'))


//Port listening and console message
app.listen(PORT);
console.log(`Server on port ${PORT}`)