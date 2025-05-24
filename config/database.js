const { Sequelize } = require('sequelize');
require('dotenv').config();
const path = require('path');

// Create a new Sequelize instance using SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false
});

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

module.exports = sequelize;
