const User = require('./User');
const Stock = require('./Stock')
// ASSOCIATIONS HERE

module.exports = {
  User,
  Stock
};

User.hasMany(Stock, {
    foreignKey: 'investor_id',
});

Stock.belongsTo(User, {
  foreignKey: 'investor_id',
});
