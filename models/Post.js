const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Post'
  }
);

module.exports = Post;
