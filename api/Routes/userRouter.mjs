import express from 'express';
const userRouter = express.Router();
import User from '../models/userModel';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../config/config';

userRouter
    .post('/login', (req, res) => {
        let password = crypto.createHash('md5').update(req.body.password).digest("hex");
        let username = req.body.username;
        User.find({ username: req.body.username, password: password }, (err, user) => {
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
                res.status(401).send({
                    success: false,
                    message: 'Incorrect username or password'
                });
            }
        })
    })

export default userRouter;