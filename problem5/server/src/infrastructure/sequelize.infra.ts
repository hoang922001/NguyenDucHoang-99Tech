import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv'
import { UserModel } from '~/model/user.model';
import { TaskModel } from '~/model/task.model';
dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME ?? 'db_dev',
  dialect: 'mysql',
  username: process.env.DATABASE_USER ?? 'root',
  password: process.env.DATABASE_PASSWORD ?? 'password',
  host: process.env.DATABASE_HOST ?? '127.0.0.1',
  models: [TaskModel, UserModel],
  repositoryMode: true,
  // logging: true,
})

export default sequelize;