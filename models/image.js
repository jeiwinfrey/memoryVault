const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Image = sequelize.define('Image', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false
  },
  memoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Relationships will be defined in index.js to avoid circular dependencies

module.exports = Image;
