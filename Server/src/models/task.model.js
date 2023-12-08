'use strict';
var dbConn= require('../../config/db.config');
const util = require('util');
const queryAsync = util.promisify(dbConn.query).bind(dbConn);

module.exports = {
    create: async(data,callBack) =>{
        try {
            const query = `insert into task(taskName,taskDesc,taskDeadline,isTaskComplete)values(?,?,?,?)`;
            const results = await queryAsync(query,[data.taskName,data.taskDesc,data.taskDeadline,'no']);
            return callBack(null,results)
        } catch (error) {
            return callBack(error)
        }
    },
    complete:async(data,callBack) =>{
        try {
            const query = `update task set isTaskComplete = 'yes' where taskID = ?`;
            const results = await queryAsync(query,data.taskID);
            return callBack(null,results)
        } catch (error) {
            return callBack(error)
        }
    },
    list:async callBack =>{
        try {
            const query = `select * from task`;
            const results = await queryAsync(query);
            const tasks = results.map(row => {
                return {
                  taskID: row.taskID,
                  userID: row.userID,
                  teamID: row.teamID,
                  taskName: row.taskName,
                  taskDesc: row.taskDesc,
                  taskDeadline: row.taskDeadline,
                  isTaskComplete: row.isTaskComplete
                };
              });
            return callBack(null,tasks)
        } catch (error) {
            return callBack(error)
        }
    },
    update:async(data,callBack) =>{
        try {
            const query = `update task set taskName=?,taskDesc=?,taskDeadline=? where taskID=?`;
            const results = await queryAsync(query,[data.taskName,data.taskDesc,data.taskDeadline,data.taskID]);
            return callBack(null,results)
        } catch (error) {
            return callBack(error)
        }
    }

}