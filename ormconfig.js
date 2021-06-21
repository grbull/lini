const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DATABASE,
    synchronize: false,
    logging: false,
    entities: [path.join(__dirname, 'dist/server/**/*.entity.js')],
    migrations: [path.join(__dirname, 'dist/server/migrations/*.js')],
    cli: {
      migrationsDir: 'src/server/migrations',
    },
  },
  {
    name: 'test',
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_DATABASE_TEST,
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [path.join(__dirname, 'src/server/**/*.entity.ts')],
  },
];
