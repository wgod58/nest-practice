import { Module } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Quiz } from './quiz.entity';
import { Question } from './question.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: '35.226.216.187',
        port: 3306,
        username: 'root',
        password: '7&Y:zPKOJ:];m{,r',
        database: 'test',
        define: {
          underscored: false,
          freezeTableName: true,
          charset: 'utf8',
          timestamps: true,
        },
        sync: { force: true },
        // dialectOptions: {
        //   collate: 'utf8_general_ci',
        // },
      });
      sequelize.addModels([Quiz, Question]);

      await sequelize.sync();
      return sequelize;
    },
  },
];

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
