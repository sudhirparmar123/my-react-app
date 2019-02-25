import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../Modules/api.js';
import { withRouter } from 'react-router';
import { ToastStore } from 'react-toasts';
import Particles from 'react-particles-js';
import  * as config  from "../../ParticleConfig";

class Login extends Component {
    constructor(props) {
        super(props);
        this.api = new api({ url: 'http://localhost:5656/api' });
        this.api.createEntity({ name: 'user' });
        this.state = {
            disableLoginBtn: true,
            invalidForm: false,
            username: '',
            password: '',
            errors:{}
        }
    }

    validateForm() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;
        
        if (!fields["username"] || fields["username"]==='') {
          formIsValid = false;
          errors.username = "*Please enter your username.";
        }
  
        if (fields["username"] !== undefined) {
          if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errors.username = "*Please enter alphabet characters only.";
          }
        }
   
        if (!fields["password"] || fields["password"]==='') {
          formIsValid = false;
          errors.password = "*Please enter your password.";
        }
  
        this.setState({
          errors: errors
        });
        return formIsValid; 
      }


    loginUser(e) {
        e.preventDefault();
        let isFromValid = this.validateForm();

        if(!isFromValid){
            return;
        }

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
                    ToastStore.error(responseData.message)
                }
            }).catch(error => {
                ToastStore.error(error.response.data.message)
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
                <Particles config={config}/>
                <div className="row">
                    <div className="col-md-6 div-center">
                        <div className="card">
                            <div className="card-header">
                                <strong>Login</strong>
                            </div>
                            <form className="form-horizontal" action="" onSubmit={(event) => this.loginUser(event)} method="post">
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label" htmlFor="hf-email">Email</label>
                                        <div className="col-md-9">
                                            <input className="form-control" id="hf-email" value={this.state.username || ''} type="text" name="username" onChange={(event) => this.handleUserInput(event)} placeholder="Enter Email.." />
                                            <span className="text-danger">{this.state.errors.username}</span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label" htmlFor="hf-password">Password</label>
                                        <div className="col-md-9">
                                            <input className="form-control" id="hf-password" value={this.state.password || ''} type="password" name="password" onChange={(event) => this.handleUserInput(event)} placeholder="Enter Password.." />
                                            <span className="text-danger">{this.state.errors.password}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button className="btn btn-sm btn-primary" type="submit">
                                        <i className="fa fa-dot-circle-o"></i> Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Login);