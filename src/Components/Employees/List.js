import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import api from '../../Modules/api.js';
import * as actionTypes from '../../Store/actions';
import {ToastStore} from 'react-toasts';

class List extends Component {
    constructor(props) {
        super(props);
        //setting a list of employees in the state
        this.api = new api({ url: 'http://localhost:5656/api' });
        this.api.createEntity({ name: 'employee' });
    }

    componentDidMount() {
        this.getEmployee();
        this.props.onHeaderTitleChange({ pageName: 'All Employees' });
    }

    getEmployee = () => {
        this.api.endpoints.employee.getAll()
            .then(response => {
                this.props.onGetEmployee(response.data)
            })
    }

    //method to delete employee for the list
    deleteEmployee = (empID) => {
        confirmAlert({
            title: '',
            message: 'Are you sure to delete this record ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        this.api.endpoints.employee.delete(empID)
                            .then(response => {
                                this.props.onDeleteEmployee(empID)
                                ToastStore.success("Employee deleted successfully!")
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => false
                }
            ]
        })
    }

    render() {
        return (
            
            <div className="container">
                <div className="card">
                    <div className="card-header"><i className="fa fa-align-justify"></i><strong>All Employees</strong></div>
                    <div className="card-body">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="table-responsive">
                                    <table className="table Employee-list table-bordered">
                                        
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Age</th>
                                                <th>Gender</th>
                                                <th>Title</th>
                                                <th>Department</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.props.employees.map((Emp) => {
                                                    return (
                                                        <tr key={Emp._id}>
                                                            <td>{Emp._id}</td>
                                                            <td>{Emp.name}</td>
                                                            <td>{Emp.email}</td>
                                                            <td>{Emp.age}</td>
                                                            <td>{Emp.gender==1?'Male':'Female'}</td>
                                                            <td>{Emp.title}</td>
                                                            <td>{Emp.department}</td>
                                                            <td>
                                                                <div>
                                                                    <button className="btn btn-default btn-sm btn-space" onClick={() => this.deleteEmployee(Emp._id)}>Delete</button>
                                                                    <Link to={`/employee/edit/${Emp._id}`}>
                                                                        <button type="button" className="btn btn-default btn-sm btn-space">
                                                                            <span className="glyphicon glyphicon-pencil"></span> Edit
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
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

const mapDispatchToProps = dispatch => {
    return {
        onDeleteEmployee: (empID) => dispatch({ type: actionTypes.DELETE_EMP, empID: empID }),
        onGetEmployee: (empData) => dispatch({ type: actionTypes.GET_EMP, data: empData }),
        onHeaderTitleChange: (data) => dispatch({ type: actionTypes.CHANGE_HEADER_TITLE, data: data })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(List);