'use strict';
var dbConn= require('../../config/db.config');


var User = function (user) {
    this.userName = user.userName;
    this.userEmail = user.userEmail;
    this.userPassword = user.userPassword;
    this.userDateCreated = new Date();
};

// Create method for User model
User.create = function (newUser, result) {
    newUser.userDateCreated = new Date(); // Set the userDateCreated property before insertion
    dbConn.query("INSERT INTO user_table SET ?", newUser, function (err, res) {
        if (err) {
            console.log("error:", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};


User.findById = function (id,result){
    dbConn.query("SELECT * from user_table where user_ID = ?", id ,function(err,res){
        if(err){
            console.log("error:",err);
            result(err,null);
        }
        else{
            result(null,res);
        }
    });
};

User.findAll= function(result){
    dbConn.query("SELECT * from user_table", function(err,res){
        if (err) {
            console.log("error: ", err);
            result(null,err);
        }
        else{
            console.log('users : ', res);
            result(null, res);
        }
    });
};

User.update = function(id, user, result){
    dbConn.query("UPDATE user_table SET userName=?,userEmail=?, userPassword=?,userDateCreated=? WHERE user_ID =?",[user.userName,user.userEmail,user.userPassword,user.userDateCreated, id], function(err,res){
        if(err){
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};

User.delete = function(id,result){
    dbConn.query("DELETE FROM user_table WHERE user_ID =?",[id], function(err, res){
        if(err){
            console.log("error: ",err);
            result(null,err);
        }
        else{
            result(null, res);
        }
    });
};

User.findByEmail = function (email, result) {
    dbConn.query("SELECT * FROM user_table WHERE userEmail = ?", [email], function (err, res) {
        if (err) {
            console.log("error:", err);
            result(err, null);
        } else {
            if (res.length > 0) {
                result(null, res[0]);
            } else {
                result(null, null);
            }
        }
    });
};
module.exports= User;
