module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    userID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    userName: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    userEmail: {
      type: Sequelize.STRING(50),
      unique: true,
      allowNull: false
    },
    userPassword: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createDate :{
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
  })

  return User
}