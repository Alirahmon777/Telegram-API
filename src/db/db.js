import { Sequelize } from 'sequelize';
import { DB } from '../config/config.js';

export const sq = new Sequelize(DB._URI, { logging: false });

export const testConnection = async () => {
  try {
    await sq.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
