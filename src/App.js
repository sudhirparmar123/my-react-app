import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch,Redirect} from 'react-router-dom';
import Login from './Components/Login/Login';
import Header from './Components/Common/Header';
import AddEmployee from './Components/Employees/Add';
import EmployeeList from './Components/Employees/List';
import SVGtest from './SVGtest/SVGtest';
import PrivateRoute from './Components/Common/PrivateRoute';
import {ToastContainer, ToastStore} from 'react-toasts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {pageName:'Employee Management'};
  }

  render() {
    let header='';
    if(sessionStorage.token!=='' && sessionStorage.token!==undefined){
      header = <Header pageName={this.state.pageName}/>
    }else{
      header = <Header pageName={this.state.pageName}/>
    }
    return (
      <div className="App">
        <div>
          <ToastContainer store={ToastStore} lightBackground />
        </div>
        {header}
        <Switch>
          <Route exact path="/login" component={Login}/>
          <PrivateRoute exact path="/employee/list" component={EmployeeList}/>
          <PrivateRoute exact path="/employee/add" component={AddEmployee}/>
          <PrivateRoute exact path="/employee/edit/:id" component={AddEmployee}/>
          <PrivateRoute exact path="/svgtest" component={SVGtest}/>
          <Redirect to="/employee/list" />
        </Switch> 
      </div>
    );
  }
}

export default App;


