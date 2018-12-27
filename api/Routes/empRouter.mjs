import express from 'express';
const empRouter = express.Router();
import Employee from '../models/empModel';
import assert from 'assert' 

empRouter
//This api will get list of employees or a single employee data from MongoDB and send in the api response
.get('/:id?', (req, res) => {
    if(req.params.id){
        Employee.findById(req.params.id, (err, employee) => {
            res.json(employee)
        }) 
    }else{
        Employee.find({}, (err, employee) => {
            res.json(employee)
        }) 
    }
})

//This api will add/update data of an employee in Database
.post('/', (req, res) => {
    let employee = new Employee({name: req.body.name, email: req.body.email, status:true});
    employee.save(
        function(error){
            if(error!==null) {
                assert.equal(error.errors['name'].message,
                'Path `name` is required.');
                error = employee.validateSync();
                assert.equal(error.errors['name'].message,
                    'Path `name` is required.');
                res.data.type='error';
                res.data.message=error.message;
                res.status(500).send(res.data);
            } else {
                res.data.data=employee;
                res.data.message='Employee added successfully';
                res.status(201).send(employee)
            }
        }
    );
})

.put('/', (req, res) => {
    if(req.body.id){
        let employee = new Employee({name: req.body.name, email: req.body.email, status:true});
        Employee.findById(req.body.id, (err, emp) => {
            emp.name = req.body.name;
            emp.email = req.body.email;
            emp.save(
                function(error){
                    if(error!==null) {
                        assert.equal(error.errors['name'].message,
                        'Path `name` is required.');
                        error = employee.validateSync();
                        assert.equal(error.errors['name'].message,
                            'Path `name` is required.');
                            res.data.type='error';
                            res.data.message=error.message;
                        res.status(500).send(res.data);
                    } else {
                        res.status(201).send(emp)
                    }
                }
            )
        }) 
    }
})

//This api will delete an employee from Database
.delete('/:id?', (req, res) => {
    Employee.findById(req.params.id, (err, emp) => {
        emp.remove(err => {
            if(err){
                res.status(500).send(err)
            }
            else{
                res.status(204).send('removed')
            }
        })
    })
})
export default empRouter;