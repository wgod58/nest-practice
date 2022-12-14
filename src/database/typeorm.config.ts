import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '35.226.216.187',
  port: 3306,
  username: 'root',
  password: '7&Y:zPKOJ:];m{,r',
  database: 'test',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
