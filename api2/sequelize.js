// sequelize.js

import Sequelize from 'sequelize';

const sequelize = new Sequelize('social', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql', // Use 'mysql' como dialeto para MySQL
});

export default sequelize;