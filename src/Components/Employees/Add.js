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
            email: '',
            name: '',
            visible:false,
            disableSave:false
        }
        this.api = new api({ url:'http://localhost:5656/api'});
        this.api.createEntity({ name: 'employee' });
    }
    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    componentWillReceiveProps(nextProps)
    {
        if(nextProps.match.params.length===undefined){
            this.setState({email : '',name:''});
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
                this.setState({ name: response.data.name, email:response.data.email, id:response.data._id })
            });
    }

    //this method will be called when user clicks on the submit button
    updateEmployee = () =>{
        this.setState({updateBusy:true});
        let data = {
            name: this.state.name,
            email: this.state.email,
            id: this.state.id
        };
        if(this.state.id){
            this.api.endpoints.employee.update(data)
            .then(
                (response) => {
                    this.setState({updateBusy:false})
                    this.setState({ visible: true })
                    this.props.onEditEmployee(response.data);
                    this.setState({ visible: false,email: '', name: ''});
                    ToastStore.success("Employee updated successfully!")
                    window.location.href="/employee/list";
                }
              )
        }else{
            this.api.endpoints.employee.create(data)
            .then(
                (response) => {
                    this.setState({updateBusy:false})
                    this.setState({ visible: true })
                    this.props.onAddEmployee(response.data);
                    ToastStore.success("Employee added successfully!")
                    window.location.href="/employee/list";
                }
              )
        }
    }
    render(){
        let alertClass = className(
            'alert alert-success',
            {
                'fadeIn':this.state.visible,
                'fadeOut':!this.state.visible
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
                                        <input type="text" className="form-control" value={this.state.name || ''} name="name" onChange={(event) => this.handleUserInput(event)} />
                                    </div>
                                    <div className="form-group">
                                        <label>
                                        Email:
                                        </label>
                                        <input type="text" className="form-control" value={this.state.email || ''} name="email" onChange={(event) => this.handleUserInput(event)} />
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