import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();
import empRouter from './Routes/empRouter';
import userRouter from './Routes/userRouter';
import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 5656;
const db = mongoose.connect('mongodb://localhost:27017/employees');
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.data = {
        type:'success',
        data:{},
        message:'Success'
    };
    next();
});
//admin related routs
app.use('/api/user', userRouter);

//use the employee roues in out app
app.use('/api/employee', empRouter);

// routes go here
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

