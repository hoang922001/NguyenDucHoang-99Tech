import { Table, Model, Column, PrimaryKey, AutoIncrement, DataType, AllowNull, IsEmail, Unique, HasMany, Index } from 'sequelize-typescript';
import { TaskModel } from './task.model';
import { Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  token?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'token'> {}

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class UserModel extends Model<UserAttributes, UserCreationAttributes> {
  @AutoIncrement
  @PrimaryKey
  @Index
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  username!: string;

  @IsEmail
  @Unique
  @Index
  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @HasMany(() => TaskModel)
  tasks!: TaskModel[]
}