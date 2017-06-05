import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../Header/';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/login';

class Login extends Component{
    constructor(props){
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }
    handleFormSubmit(e){
        e.preventDefault();
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        console.log(this.refs.username.value, this.refs.password.value);

        this.props.login(username, password);
    }
    render(){

        if(this.props.isAuthenticated){
            return (
                <Redirect to="/" push/>
            )
        }

        return(
            <div className="login">
                <Header/>
                <form className="login-form" onSubmit={this.handleFormSubmit}>
                    <input type="text" ref="username" placeholder="Korisnicko ime"/>
                    <input type="password" ref="password" placeholder="Lozinka"/>
                    <p className="error">{this.props.error}</p>
                    <input onSubmit={this.handleFormSubmit} type="submit" value="Uloguj se"/>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => state.login;
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);