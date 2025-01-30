const request = require('supertest'); // import req for api testing
const app = require('../index') 
const mongoose = require('mongoose'); // import mongoose
const Todo = require('../models/todo') // import todo model
const Test = require('supertest/lib/test');
const dotenv = require('dotenv').config();
// DB connection with differnt DB for testing

// connect to test DB before all tests
beforeAll(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL_TEST)
        console.log("connected to test database")
    } catch (error) {
        console.log(error)
    }
})
// Clear the test database before each test case
beforeEach(async()=>{
    await Todo.deleteMany({})
})
// close DB connection after all tests
afterAll(async () => {
    try {
        await mongoose.connection.close()
    } catch (error) {
        console.log(error)
    }
})

describe('Todo API test',()=>{

    test('POST api/todo-should create a new todo', async() => {
           const newTodo = { TaskName : 'go to gym', Status : false, description : 'go to gym and do some exercise' }
           const response =  await request(app)
           .post('/api/todo')
           .send(newTodo)
           .expect(200)

           expect(response.body).toHaveProperty('_id')
           expect(response.body.TaskName).toBe(newTodo.TaskName)
           expect(response.body.Status).toBe(newTodo.Status)
           expect(response.body.description).toBe(newTodo.description)
    })

    test('GET api/todo-should return all todos', async() => {
        const newTodo = new Todo({ TaskName : 'deadline', Status : false, description : 'The submission of assignment is due at 11:59 pm' })
        await newTodo.save()
        const response =  await request(app).get('/api/todo').expect(200)
        expect(response.body[0].TaskName).toBe(newTodo.TaskName)
        expect(response.body).toHaveLength(1)
        
    })

    test('PUT api/todo-should update a todo', async() => {
        const newTodo = new Todo({ TaskName : 'deadline', Status : false, description : 'The submission of assignment is due at 11:59 pm' })
        await newTodo.save()
        const response = await request(app).put(`/api/todo/${newTodo._id}`).send({ Status : true }).expect(200)
        expect(response.body.Status).toBe(true)
    })

    test('DELETE api/todo-should delete a todo', async() => {
        const newTodo = new Todo({ TaskName : 'deadline', Status : false, description : 'The submission of assignment is due at 11:59 pm' })
         await newTodo.save()
         await request(app).delete(`/api/todo/${newTodo._id}`).expect(200)
         const deleteTodo = await Todo.findById(newTodo._id)
         expect(deleteTodo).toBeNull();


    })
})
