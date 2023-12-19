module.exports = (sequelize, Sequelize) => {
  const Subtask = sequelize.define("subtask", {
    subtaskID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    taskID: {
      type: Sequelize.INTEGER,
      references: {
        model: "tasks",
        key: "taskID"
      }
    },
    subtaskName: {
      type: Sequelize.STRING(50),
    //   allowNull: false
    },
    subtaskDesc: {
      type: Sequelize.STRING(50),
    },
    subtaskDeadline :{
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    isSubtaskComplete:{
        type: Sequelize.BOOLEAN,
    }
  })

  return Subtask
}