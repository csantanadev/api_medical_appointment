import "dotenv/config"
import express, { Request, Response } from 'express';

import { specialityRoutes } from "./routes/speciality.routes";
import { userRoutes } from './routes/user.routes';
import { doctorRoutes } from "./routes/doctor.routes";

import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';


const app = express();

app.use(express.json())

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(userRoutes)
app.use(specialityRoutes)
app.use(doctorRoutes)

app.get('/', (request: Request, response: Response) => {

    return response.send("ping")
});


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})

process.on('uncaughtException', (err) => {
    console.log(`erro no servidor ${err}`)
})