const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');

class Comment extends Model {}

Comment.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Comment'
  }
);

module.exports = Comment;
