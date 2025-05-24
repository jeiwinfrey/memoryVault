const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Memory = sequelize.define('Memory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  caption: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
});

// Define relationship between Memory and User
Memory.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Memory, { foreignKey: 'userId', onDelete: 'CASCADE' });

module.exports = Memory;
