import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import api from '../../Modules/api.js';
import * as actionTypes from '../../Store/actions';
import { ToastStore } from 'react-toasts';
import DataTable from 'react-data-table-component';

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
        this.props.onLoadingEmployee();
        this.api.endpoints.employee.getAll()
            .then(response => {
                this.props.onGetEmployee(response.data);
                this.props.onEmployeeLoaded();
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

    getRandomImage(){
        var imgNumber = Math.floor(Math.random() * 6) + 1;
        return imgNumber+'.jpg';

    }

    render() {
        var loadingText = <div>Loading...</div>;
        if(!this.props.LoadingEmployee){
            loadingText = "";
            console.log(this.props.employees);
        }
        const columns = [
            {
                name: 'Picture',
                left:true,
                cell: row => <div>
                                <img width="60px" src={process.env.PUBLIC_URL + '/'+this.getRandomImage()}/>
                            </div>
            },
            {
                name: 'ID',
                selector: '_id',
                sortable: true,
            },
            {
                name: 'Name',
                selector: 'name',
                sortable: true,
            },
            {
                name: 'Email',
                selector: 'email',
                sortable: true,
            },
            {
                name: 'Age',
                selector: 'age',
                sortable: true,
            },
            {
                name: 'Gender',
                selector: 'gender',
                sortable: true,
            },
            {
                name: 'Department',
                selector: 'department',
                sortable: true,
            },
            {
                name: 'Actions',
                left:true,
                cell: row => <div>
                                <button className="btn btn-default btn-sm btn-space" onClick={() => this.deleteEmployee(row._id)}>Delete</button>
                                <Link to={`/employee/edit/${row._id}`}>
                                    <button type="button" className="btn btn-default btn-sm btn-space">
                                        <span className="glyphicon glyphicon-pencil"></span> Edit
                                    </button>
                                </Link>
                            </div>
            }
        ];
        return (

            <div className="container col-md-10">
                <div className="card">
                    <div className="card-header"><i className="fa fa-align-justify"></i><strong>All Employees</strong></div>
                    <div className="card-body">
                        <div className="col-md-12">
                            <div className="row">
                                {loadingText}
                                {
                                    <DataTable
                                        columns={columns}
                                        data={this.props.employees}
                                        pagination={true}
                                        paginationPerPage={10}
                                        noHeader={true}
                                    />                                    
                                }                        
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
        employees: state.Employees,
        LoadingEmployee:state.LoadingEmployee
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDeleteEmployee: (empID) => dispatch({ type: actionTypes.DELETE_EMP, empID: empID }),
        onGetEmployee: (empData) => dispatch({ type: actionTypes.GET_EMP, data: empData }),
        onLoadingEmployee: () => dispatch({ type: actionTypes.LOADING_EMP}),
        onEmployeeLoaded: () => dispatch({ type: actionTypes.LOADED_EMP}),
        onHeaderTitleChange: (data) => dispatch({ type: actionTypes.CHANGE_HEADER_TITLE, data: data })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(List);