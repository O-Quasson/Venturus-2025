import { Sequelize } from 'sequelize';
import sqlite3 from 'sqlite3';

const sequelize = new Sequelize({

    dialect:'sqlite',
    storage:'database.sqlite',
    logging: false,
});

export default sequelize;