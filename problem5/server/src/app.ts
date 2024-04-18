import express from 'express';
import dotenv from 'dotenv'
import database from './infrastructure/sequelize.infra'
import { router } from './router';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
dotenv.config();

//PARSE AND READ BODY
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//DEV LOGGING
app.use(morgan('dev'));
app.use(cors());
router(app);

const port = process.env.PORT ?? 3000;
app.listen(port, async () => {
  await database.authenticate()
  console.log('Connect Database successfully!');
  await database.sync()
  console.log('Sync database successfully!')
  console.log(`App is listening at 127.0.0.1:${port}`)
})