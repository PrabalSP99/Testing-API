const request = require('supertest'); // import req for api testing
const app = require('../index')
const Todo = require('../models/todo')

// Jest automatically replaces all methods of Todo (including .find(), .create(), .findByIdAndUpdate(), etc.) with mock functions.
// So there’s no need to manually write Todo.find = jest.fn();
jest.mock('../models/todo')

Todo.find = jest.fn()
Todo.findById = jest.fn()
Todo.findByIdAndDelete = jest.fn()
Todo.findByIdAndUpdate = jest.fn()

describe('Todo API Unit Tests (Mocked DB)', () => {
    
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });
    test('GET /api/todo - should return all todos', async () => {

        // this mock will return an array of todos
        const mockTodos = [{ _id: '12345', TaskName: 'gym', Status: false, description: 'Exercise' }];
        
        Todo.find.mockResolvedValue(mockTodos); // Mock the find function

        const response = await request(app).get('/api/todo');

        expect(Todo.find).toHaveBeenCalled();
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0].TaskName).toBe('gym');
    });

    test('POST /api/todo - should create a new todo', async () => {
        const MockTodo = { _id: '12345', TaskName: 'gym', Status: false, description: 'Exercise' } // Mocked todo
        
        //Unlike Todo.find(), .save() is not a static method and cannot be directly mocked by jest.mock('../models/todo')
        Todo.mockImplementation(() => ({
            save : jest.fn().mockResolvedValue(MockTodo),
        }));
             
        const newTodo = new Todo({ TaskName: 'gym', Status: false, description: 'Exercise' }); // req body

        const response = await request(app).post('/api/todo').send(newTodo);
        
        expect(response.status).toBe(200);
        expect(response.body.TaskName).toBe('gym');
        
    });

    test('PUT /api/todo/:id - should update a todo', async () => {
         const Mocktodo = {_id: '12345', TaskName: 'gym', Status: true, description: 'Exercise' }
        
         Todo.findByIdAndUpdate.mockResolvedValue(Mocktodo);
         const response = await request(app).put('/api/todo/12345').send({Status : true})

         expect(Todo.findByIdAndUpdate).toHaveBeenCalled();
         expect(response.status).toBe(200);
         expect(response.body.Status).toBe(true);
         
    });

    test('DELETE /api/todo/:id - should delete a todo', async () => {

         Todo.findByIdAndDelete.mockResolvedValue(null);
         const response = await request(app).delete('/api/todo/12345')

         expect(Todo.findByIdAndDelete).toHaveBeenCalled();
         expect(response.status).toBe(200); 
         expect(response.body).toBeNull();

    });


})

