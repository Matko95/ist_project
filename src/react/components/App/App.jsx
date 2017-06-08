import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getData, deleteData } from '../../actions/getData';
import { checkLogin } from '../../actions/login';

import Header from '../Header/';
import AutomobiliModal from '../AutomobiliModal/';
import KorisniciModal from '../KorisniciModal/';
import PopravkeModal from '../PopravkeModal/';
import DataWidget from '../DataWidget/';

class App extends Component{
    constructor(props){
        super(props);

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.state = {
            automobil: {
                openModal: false,
                data: {}
            },
            korisnik: {
                openModal: false,
                data: {}
            },
            popravka: {
                openModal: false,
                data: {}
            }
        }
    }
    componentWillMount(){
        this.props.checkLogin();
        this.props.getData('automobili');
        this.props.getData('korisnici');
        this.props.getData('popravke');
    }
    openModal(type, data, isAdd){
        this.setState({
            [type]: {
                openModal: true,
                data: data,
                isAdd
            }
        })
    }
    closeModal(type){
        this.setState({
            [type]: {
                openModal: false,
                data: {}
            }
        })
    }
    render(){

        if(localStorage.getItem("jwt") === null){
            return (
                <Redirect to="/login"/>
            )
        }
        return(
            <div className="app">
                <Header>
                </Header>
                <DataWidget title="Automobili"
                            form="automobil"
                            deleteData={this.props.deleteData}
                            openModal={this.openModal}
                            data={this.props.api.data['automobili']}/>
                <DataWidget title="Korisnici"
                            form="korisnik"
                            deleteData={this.props.deleteData}
                            openModal={this.openModal}
                            data={this.props.api.data['korisnici']}/>
                <DataWidget title="Popravke"
                            form="popravka"
                            deleteData={this.props.deleteData}
                            openModal={this.openModal}
                            data={this.props.api.data['popravke']}/>
                <AutomobiliModal {...this.state.automobil} closeModal={this.closeModal}/>
                <KorisniciModal {...this.state.korisnik} closeModal={this.closeModal}/>
                <PopravkeModal {...this.state.popravka} closeModal={this.closeModal}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => bindActionCreators({getData, deleteData, checkLogin}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);