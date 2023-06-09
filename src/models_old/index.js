import { Sequelize } from 'sequelize';
import dbConfig from '../config/db.config.js'

let sequelize = new Sequelize(dbConfig.development);

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize;