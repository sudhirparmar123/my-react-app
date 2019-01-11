import express from 'express';
const userRouter = express.Router();
import User from '../models/userModel';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../config/config';

userRouter
    .post('/login', (req, res) => {
        let password = req.body.password.trim();
        let username = req.body.username.trim();
        let passwordMD5 = crypto.createHash('md5').update(password).digest("hex");

        let errorMessage='';
        //check if username or password is incorrect
        if(username.trim()==='' || password.trim()===''){
            errorMessage = 'Username and Password can not be blank';
            return res.status(200).send({
                success: false,
                message: errorMessage
            });
        }

        //call mongoose find method after validation
        User.find({ username: username, password: passwordMD5 }, (err, user) => {
            if (user.length > 0) {
                let token = jwt.sign({ username: username },
                    config.secret,
                    {
                        expiresIn: '24h' // expires in 24 hours
                    });

                res.status(200).send({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
            } else {
                res.status(200).send({
                    success: false,
                    message: 'Wrong username or password!'
                });
            }
        })
    })

export default userRouter;