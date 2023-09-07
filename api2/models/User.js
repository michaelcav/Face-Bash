// models/User.js
import Sequelize from 'sequelize';
import sequelize from '../sequelize.js'; // Importe a instância do Sequelize

const User = sequelize.define('User', {
   id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  coverPic: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  profilePic: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  bio: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  civilStatus: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  createdAt: {
    type: Sequelize.DATE, 
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE, 
   
    allowNull: true,
  },
});

export default User;



// import Sequelize, { Model } from 'sequelize';
//  // .Importe a instância do Sequelize
// class User extends Model {
//   static init(sequelize) {
//     super.init(
//       {
//         username: Sequelize.STRING,
//         email: Sequelize.STRING,
//         password: Sequelize.STRING,
//         name: Sequelize.STRING,

//       },
//       {
//         sequelize,
//       }

//     );

//     // this.addHook('beforeSave', async user => {
//     //   if (user.password) {
//     //     user.password_hash = await bcrypt.hash(user.password, 8);
//     //   }
//     // });

//     return this;
//   }

//   // static associate(models) {
//   //   this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
//   // }

//   // checkPassword(password) {
//   //   return bcrypt.compare(password, this.password_hash);
//   // }
// }

// export default User;
