import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
    logOut = () =>{
        sessionStorage.clear();
        window.location.href = '/';
    }
    render() {
        let headerContent  = <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                                <a className="logo" href="/"><span>DEMO APP</span></a>
                                <span className="navbar-brand mx-auto">Administrator Login</span>
                             </nav>

        if(sessionStorage.token!=='' && sessionStorage.token!==undefined){
            headerContent  = <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                                    <a className="logo" href="/"><span>DEMO APP</span></a>
                                    <ul className="navbar-nav mrgn-left20">
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/employee/list">Employee List</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/employee/add">Add new</Link>
                                        </li>
                                    </ul>
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <a className="nav-link" href="/" onClick={this.logOut}>LogOut</a>
                                        </li>
                                    </ul>
                                </nav>
        }
        return (
            <div>
                {headerContent}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        pageName: state.pageName
    };
};
export default connect(mapStateToProps)(Header);
