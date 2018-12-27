import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../Modules/api.js';
import { withRouter } from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.api = new api({ url: 'http://localhost:5656/api' });
        this.api.createEntity({ name: 'user' });
        this.state = {
            disableLoginBtn: true,
            invalidForm: false,
            username: '',
            password: ''
        }
    }

    loginUser = () => {
        let data = {
            username: this.state.username,
            password: this.state.password
        };
        let url = 'http://localhost:5656/api/user/login'
        this.api.callApi(url, data)
            .then(response => {
                let responseData = response.data;
                if (responseData.success) {
                    sessionStorage.token = response.data.token;
                    this.props.history.push(`/employee/list`)
                } else {
                    console.log('wrong usernama and password')
                    //will set a message here
                }
            });
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 div-center">
                        <div className="card">
                            <div className="card-header">
                                <strong>Login</strong>
                            </div>
                            <div className="card-body">
                                <form className="form-horizontal" action="" method="post">
                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label" htmlFor="hf-email">Email</label>
                                        <div className="col-md-9">
                                            <input className="form-control" id="hf-email" value={this.state.username || ''} type="text" name="username" onChange={(event) => this.handleUserInput(event)} placeholder="Enter Email.." />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label" htmlFor="hf-password">Password</label>
                                        <div className="col-md-9">
                                            <input className="form-control" id="hf-password" value={this.state.password || ''} type="password" name="password" onChange={(event) => this.handleUserInput(event)} placeholder="Enter Password.." />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-sm btn-primary" onClick={() => this.loginUser()} type="submit">
                                    <i className="fa fa-dot-circle-o"></i> Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Login);