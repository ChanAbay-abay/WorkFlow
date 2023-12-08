const { create,list,complete,update } = require('../models/task.model');

module.exports = {
    createTask:async(req,res) =>{
        const data = req.body;
        console.log(data)
        create(data,(err,results) =>{
            if(err){
                return res.status(500).json({
                    message: 'Internal Server Error',
                    error: err.message
                })
            }else{
                list((err,results) =>{
                    if(err){
                        return res.status(500).json({
                            message: 'Internal Server Error',
                            error: err.message
                        })    
                    }
                    return res.json(results)
                })
            }
        })
    },
    taskDone:async(req,res) =>{
        const data = req.body
        complete(data,(err,results) =>{
            if(err){
                return res.status(500).json({
                    message: 'Internal Server Error',
                    error: err.message
                })    
            }else{
                list((err,results) =>{
                    if(err){
                        return res.status(500).json({
                            message: 'Internal Server Error',
                            error: err.message
                        })    
                    }
                    return res.json(results)
                })
            }
        })
    },
    taskList:async(req,res) =>{
        list((err,results) =>{
            if(err){
                return res.status(500).json({
                    message: 'Internal Server Error',
                    error: err.message
                })    
            }else{
                list((err,results) =>{
                    if(err){
                        return res.status(500).json({
                            message: 'Internal Server Error',
                            error: err.message
                        })    
                    }
                    return res.json(results)
                })
            }           
        })
    },
    UpdateTask:async(req,res) =>{
        const data = req.body;
        update(data,(err,results)=>{
            if(err){
                return res.status(500).json({
                    message: 'Internal Server Error',
                    error: err.message
                })   
            }else{
                list((err,results) =>{
                    if(err){
                        return res.status(500).json({
                            message: 'Internal Server Error',
                            error: err.message
                        })    
                    }
                    return res.json(results)
                })
            }
        })
    }
}