
import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';

import APIRouter from '../router'

config();

const app = express();
app.set('port', process.env.PORT || 3003)

if (process.env.NODE_ENV === 'dev') {
    app.use(morgan('tiny'))
}

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/v1', APIRouter.v1)

app.listen(app.get('port'), () => {
    console.log(`[App] Running on port ${app.get('port')}`)
})

export default app;
