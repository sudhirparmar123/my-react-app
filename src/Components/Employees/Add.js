import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import className from 'classnames';
import api from '../../Modules/api.js';
import * as actionTypes from '../../Store/actions';
import {connect} from 'react-redux';
import {ToastStore} from 'react-toasts';
class Add extends Component{
    constructor (props) {
        super(props);
        this.state = {
            employee:{
                email: '',
                name: '',
                age:'',
                gender:'',
                title:'',
                department:''  
            },
            alertVisible:false,
            disableSave:false,
            errors:{}
        }
        this.api = new api({ url:'http://localhost:5656/api'});
        this.api.createEntity({ name: 'employee' });
    }
    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        let employee = {...this.state.employee,[name]: value};    //creating copy of object
        this.setState({employee});

        //this.setState({employee:{[name]: value}});
    }

    componentWillReceiveProps(nextProps)
    {
        if(nextProps.match.params.length===undefined){
            this.setState({employee:{ email: '',
            name: '',
            age:'',
            gender:'',
            title:'',
            department:''  }});
        }
    }

    componentDidMount(){
        if(this.props.match.params.id){
            this.getEmployee(this.props.match.params.id);
        }
        this.props.onHeaderTitleChange({pageName:'Add Employee'});
    }

    getEmployee = (empID="") =>{
        this.api.endpoints.employee.getOne(empID)
            .then(response => {
                this.setState({
                    employee:{ 
                        name: response.data.name, 
                        email:response.data.email, 
                        age:response.data.age,
                        title:response.data.title,
                        department:response.data.department,
                        gender:response.data.gender,
                        id:response.data._id 
                    }})
            });
    }

    validateForm() {
        let fields = this.state.employee;
        let errors = {};
        let formIsValid = true;

        if (fields["name"] === undefined || fields["name"] === '') {
            formIsValid = false;
            errors.name = "*Please enter name of the employee.";
        }

        // if (fields["name"] !== undefined) {
        //     let reg = /^[a-zA-Z ]*$/;
        //     if (!reg.test(fields["name"])) {
        //         formIsValid = false;
        //         errors.name = "*Please enter alphabet characters only.";
        //     }
        // }

        if (!fields["email"] || fields["email"]==='') {
          formIsValid = false;
          errors.email = "*Please enter email of the employee.";
        }

        if (fields["email"]!=='') {
            var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(!re.test(fields["email"])){
                formIsValid = false;
                errors.email = "*Please enter valid email address.";
            }  
        }
        if (fields["age"] === undefined || fields["age"] === '') {
            formIsValid = false;
            errors.age = "*Please enter age of the employee.";
        }

        if (fields["age"] !== undefined) {
            let reg = /^0|[1-9]\d*$/;
            if (!reg.test(fields["age"])) {
                formIsValid = false;
                errors.age = "*Please enter numeric values only.";
            }
        }

        if (fields["gender"] === undefined || fields["gender"] === '') {
            formIsValid = false;
            errors.gender = "*Please select gender of the employee.";
        }

        if (fields["department"] === undefined || fields["department"] === '') {
            formIsValid = false;
            errors.department = "*Please enter department of the employee.";
        }

        if (fields["title"] === undefined || fields["title"] === '') {
            formIsValid = false;
            errors.title = "*Please enter title of the employee.";
        }

        this.setState({
          errors: errors
        });
        return formIsValid; 
      }

    //this method will be called when user clicks on the submit button
    updateEmployee = () =>{
        let isFromValid = this.validateForm();
        if(!isFromValid){
            return;
        }

        this.setState({updateBusy:true});
        var employeeObj = this.state.employee;
        let data = {
            name: employeeObj.name,
            email: employeeObj.email,
            gender: employeeObj.gender,
            title: employeeObj.title,
            age: employeeObj.age,
            department: employeeObj.department,
            id: employeeObj.id
        };
        if(employeeObj.id){
            this.api.endpoints.employee.update(data)
            .then(
                (response) => {
                    this.setState({updateBusy:false})
                    this.props.onEditEmployee(response.data);
                    this.setState({employee:{email: '', name: ''}});
                    this.setState({ alertVisible: false});
                    ToastStore.success("Employee updated successfully!")
                    window.location.href="/employee/list";
                }
              ).catch(error => {
                    this.setState({updateBusy:false})
                    ToastStore.error(error.response.data.message)
              });
        }else{
            this.api.endpoints.employee.create(data)
            .then(
                (response) => {
                    this.setState({updateBusy:false})
                    this.props.onAddEmployee(response.data);
                    ToastStore.success("Employee added successfully!")
                    window.location.href="/employee/list";
                }
              ).catch(error => {
                this.setState({updateBusy:false})
                ToastStore.error(error.response.data.message)
            });
        }
    }
    render(){
        let alertClass = className(
            'alert alert-success',
            {
                'fadeIn':this.state.alertVisible,
                'fadeOut':!this.state.alertVisible
            }
        )
        return (   
            <div className="container">
                <div className={alertClass}>
                    <strong>Success!</strong> Employee data updated successfully.
                </div>
                <div className="card">
                    <div className="card-header"><i className="fa fa-align-justify"></i><strong>Add Employee</strong></div>
                    <div className="card-body">
                        <div className="col-md-12">
                            <div className="row">
                                <form onSubmit={this.handleSubmit} className="form">
                                    <div className="form-group">
                                        <label>
                                        Name:
                                        </label>
                                        <input type="text" className="form-control" value={this.state.employee.name || ''} name="name" onChange={(event) => this.handleUserInput(event)} />
                                        <span className="text-danger">{this.state.errors.name}</span>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                        Email:
                                        </label>
                                        <input type="text" className="form-control" value={this.state.employee.email || ''} name="email" onChange={(event) => this.handleUserInput(event)} />
                                        <span className="text-danger">{this.state.errors.email}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>
                                        Age:
                                        </label>
                                        <input type="text" className="form-control" value={this.state.employee.age || ''} name="age" onChange={(event) => this.handleUserInput(event)} />
                                        <span className="text-danger">{this.state.errors.age}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>
                                        Gender:
                                        </label>
                                        <select className="form-control" value={this.state.employee.gender || ''} name="gender" onChange={(event) => this.handleUserInput(event)} >
                                            <option value="0">Select</option>
                                            <option value="1">Male</option>
                                            <option value="2">Female</option>
                                        </select>
                                        <span className="text-danger">{this.state.errors.gender}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>
                                        Department:
                                        </label>
                                        <input type="text" className="form-control" value={this.state.employee.department || ''} name="department" onChange={(event) => this.handleUserInput(event)} />
                                        <span className="text-danger">{this.state.errors.department}</span>
                                    </div>

                                    <div className="form-group">
                                        <label>
                                        Title:
                                        </label>
                                        <input type="text" className="form-control" value={this.state.employee.title || ''} name="title" onChange={(event) => this.handleUserInput(event)} />
                                        <span className="text-danger">{this.state.errors.title}</span>
                                    </div>
                                    <button type="button" onClick={() => this.updateEmployee()} className="btn btn-primary">
                                        {this.state.updateBusy?'Saving...':'Save'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        )
    }
}
const mapStateToProps = state => {
    return {
        employees: state.Employees
    };
};

const mapDispatchToProps = dispatch =>{
    return {
        onAddEmployee :(empData) => dispatch({type:actionTypes.ADD_EMP,data:empData}),
        onEditEmployee :(empData) => dispatch({type:actionTypes.EDIT_EMP,data:empData}),
        onHeaderTitleChange :(data) => dispatch({type:actionTypes.CHANGE_HEADER_TITLE,data:data})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Add);