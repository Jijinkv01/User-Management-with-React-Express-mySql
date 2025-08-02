const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');


const User = sequelize.define('User', {
    username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  profilePic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
},{  tableName: 'users',
})


module.exports = User;