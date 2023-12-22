module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("task", {
    taskID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "userID"
      }
    },
    teamID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "teams",
        key: "teamID"
      }
    },
    taskName: {
      type: Sequelize.STRING(50),
    //   allowNull: false
    },
    taskDesc: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    taskDeadline :{
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: true
    },
    isTaskComplete:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
  })

  return Task
}