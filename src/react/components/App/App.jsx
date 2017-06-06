import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getData, deleteData } from '../../actions/getData';

import Header from '../Header/';
import DataWidget from '../DataWidget/';

class App extends Component{
    constructor(props){
        super(props);

        this.openModal = this.openModal.bind(this);
    }
    componentWillMount(){
        this.props.getData('automobili');
        this.props.getData('korisnici');
        this.props.getData('popravke');
    }
    openModal(type){

    }
    render(){
        return(
            <div className="app">
                <Header>
                </Header>
                <DataWidget title="Automobili"
                            deleteData={this.props.deleteData}
                            openModal={this.openModal}
                            data={this.props.api.data['automobili']}/>
                <DataWidget title="Korisnici"
                            deleteData={this.props.deleteData}
                            openModal={this.openModal}
                            data={this.props.api.data['korisnici']}/>
                <DataWidget title="Popravke"
                            deleteData={this.props.deleteData}
                            openModal={this.openModal}
                            data={this.props.api.data['popravke']}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => bindActionCreators({getData, deleteData}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

