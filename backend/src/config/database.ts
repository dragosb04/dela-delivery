import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    'myexpressdb',   // → numele bazei tale MySQL
    'dela_app',       // → user-ul MySQL
    'pusheen',         // → parola MySQL
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: console.log
    }
);

export default sequelize;