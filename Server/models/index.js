const dbConfig = require("../configs/db.config.js")

const Sequelize = require("sequelize")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    timestamps: false
  }
})

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize
}

module.exports = db;

//connecting to all models
// db.user = require("./models/user/user.model.js")(sequelize, Sequelize)
db.user = require("./user/user.model.js")(sequelize, Sequelize)
db.task = require("./task/task.model.js")(sequelize, Sequelize)
db.subtask = require("./subtask/subtask.model.js")(sequelize, Sequelize)
db.memberlist = require("./memberlist/memberlist.model.js")(sequelize, Sequelize)
db.team = require("./team/team.model.js")(sequelize, Sequelize)
db.roletype = require("./roletype/roletype.model.js")(sequelize, Sequelize)

//RELATIONS

// task
db.task.belongsTo(db.user, { foreignKey: 'userID' });
db.user.hasMany(db.task, { foreignKey: 'userID' });

// subtask
db.subtask.belongsTo(db.task, { foreignKey: 'taskID' });
db.task.hasMany(db.subtask, { foreignKey: 'taskID' });

// memberlist
db.memberlist.belongsTo(db.user, { foreignKey: 'userID' });
db.user.hasOne(db.memberlist, { foreignKey: 'userID' });

// team
db.team.hasMany(db.task, { foreignKey: 'teamID' });
db.task.belongsTo(db.team, { foreignKey: 'teamID' });

db.team.hasMany(db.memberlist, { foreignKey: 'teamID' });
db.memberlist.belongsTo(db.team, { foreignKey: 'teamID' });

// roletype
db.roletype.hasMany(db.memberlist, { foreignKey: 'roleID' });
db.memberlist.belongsTo(db.roletype, { foreignKey: 'roleID' });

// roletype to team? idek if i dont need it wont be used ig
db.roletype.belongsTo(db.team, { foreignKey: 'teamID' });
db.team.hasMany(db.roletype, { foreignKey: 'teamID' });