
import express from 'express';
import cors from 'cors';

import APIRouter from '../router'
import { initMongoConnection, MongoConnectionConf } from '../shared/infra/mongodb';


const app = express();
app.set('port', process.env.PORT || 3003)

let mongoConfig: MongoConnectionConf;

if (process.env.NODE_ENV === 'DEV') {
    const dot = require('dotenv');
    dot.config();
    const morgan = require('morgan');
    app.use(morgan('tiny'))
    mongoConfig = {
        database: process.env.DEV_MONGO_DBNAME,
        user: process.env.DEV_MONGO_USER,
        password: process.env.DEV_MONGO_PASSWORD,
        host: process.env.DEV_MONGO_HOST,
        port: process.env.DEV_MONGO_PORT
    }
} else {
    mongoConfig = {
        database: process.env.MONGO_DBNAME,
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT
    }
}
(async () => {
    try {
        await initMongoConnection(mongoConfig);
        console.log('[DB] MongoDB connection started');
    } catch (err) {
        console.error(`[DB] ${err.message}`)
        console.log('[DB] Could not connect to database');
    }
})()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/api/v1', APIRouter.v1)

app.listen(app.get('port'), () => {
    console.log(`[App] Running on port ${app.get('port')}`)
})

export default app;
