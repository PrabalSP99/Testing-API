const express = require("express");
const router = express.Router();
const Todo = require("../models/todo")

router.get("/todo", async(req, res) => {
    
      const todo = await Todo.find()
     res.status(200).json(todo)
})

router.post("/todo", async (req, res) => {
    try{
        const todo = new Todo({
            TaskName: req.body.TaskName,
            Status: req.body.Status,
            description: req.body.description
        })
        
        const result = await todo.save()
        res.status(200).json(result)
    }
    catch(err){
        console.log(`error while saving todo ${err}`)
        res.status(500).json({
            message: "error while saving todo"
        })
    }
   
})

router.put('/todo/:id', async (req, res) => {
    try{
          const todo = await Todo.findByIdAndUpdate(req.params.id, {Status : true}, {new : true})
          res.status(200).json(todo)
    }
    catch(err){
        console.log(`error while updating todo ${err}`)
        res.status(500).json({
            message: "error while updating todo"
        })
    }
})

router.delete('/todo/:id', async (req, res) => {
    try{
          const todo = await Todo.findByIdAndDelete(req.params.id)
          res.status(200).json(todo)
    }
    catch(err){
        console.log(`error while deleting todo ${err}`)
        res.status(500).json({
            message: "error while deleting todo"
        })
    }
})

module.exports = router