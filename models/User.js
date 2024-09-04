const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');  
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User'
  }
);

User.beforeCreate(async (user) => {
  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
});

module.exports = User;
