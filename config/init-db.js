// Database initialization script
const sequelize = require('./database');
const User = require('../models/user');
const Memory = require('../models/memory');
const Image = require('../models/image');

// Import all models to ensure they're registered with Sequelize
// The relationships are defined in the model files

const initDatabase = async () => {
  try {
    // Sync all models with the database
    // force: true will drop tables if they exist
    // Use with caution in production!
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
};

// Run the initialization
initDatabase();
