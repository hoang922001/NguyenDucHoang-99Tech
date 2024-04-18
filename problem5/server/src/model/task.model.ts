import { Table, Model, Column, PrimaryKey, AutoIncrement, DataType, AllowNull, Default, BelongsTo, ForeignKey, Index } from 'sequelize-typescript';
import { PriorityEnum } from '~/common/enum/priority.enum';
import { UserModel } from './user.model';
import { Optional } from 'sequelize';
import moment from 'moment';

interface TaskAttributes {
  id: number;
  name: string;
  description: string;
  priority: PriorityEnum;
  completed: boolean;
  due: Date;
  userId: number;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'completed'> {}

@Table({
  tableName: 'tasks',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class TaskModel extends Model<TaskAttributes, TaskCreationAttributes> {
  @Index
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.TEXT)
  description!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  priority!: PriorityEnum;

  @Default(false)
  @Column(DataType.BOOLEAN)
  completed!: boolean;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    get() {
      const rawValue = this.getDataValue('due');
      return moment(rawValue).format(
        'YYYY-MM-DD h:mm:ss a'
      )
    }
  })
  due!: Date;

  @Index('user_id')
  @Column({
    field: 'user_id',
  })
  @ForeignKey(() => UserModel)
  userId!: number;

  @BelongsTo(() => UserModel)
  user!: UserModel;
}