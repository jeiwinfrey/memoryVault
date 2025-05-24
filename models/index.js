const User = require('./user');
const Memory = require('./memory');
const Image = require('./image');

// Define relationship between Memory and Image
Memory.hasMany(Image, { 
  foreignKey: 'memoryId',
  onDelete: 'CASCADE',
  hooks: true
});

Image.belongsTo(Memory, { 
  foreignKey: 'memoryId'
});

module.exports = {
  User,
  Memory,
  Image
};
