// models/User.js

import Sequelize from 'sequelize';
import sequelize from '../sequelize.js'; // Importe a instância do Sequelize

const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE, // Defina o tipo de dados como DATETIME ou TIMESTAMP, dependendo do seu banco de dados
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE, // Defina o tipo de dados como DATETIME ou TIMESTAMP, dependendo do seu banco de dados
    allowNull: false,
  },
});

export default User;
