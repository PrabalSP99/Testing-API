const express = require('express');
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const todoRoute = require('./routes/todo')
const ConnectDB = require('./config/mongoose')

dotenv.config();


// middlewares
app.use(bodyParser.json());
app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).json({
        message: "welcome to the todo app"
    })
})
app.use('/api', todoRoute)

// ConnectDB();
const Port = process.env._PORT
app.listen(Port, () => {
    console.log(`server is running on port ${Port}`)
})

module.exports = app // export index for tesing..