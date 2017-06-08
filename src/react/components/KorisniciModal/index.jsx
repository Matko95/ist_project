import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editData, addData } from '../../actions/editData';
import Modal from 'react-modal';

class KorisniciModal extends Component{
    constructor(props){
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFormAdd = this.handleFormAdd.bind(this)
    }
    handleFormSubmit(e){
        e.preventDefault();

        let data = {
            id_korisnik: this.props.data.id_korisnik,
            korisnicko_ime: this.refs.korisnicko_ime.value,
            lozinka: this.refs.lozinka.value
        };

        this.props.editData('korisnici', data, this.props.data.index);
        this.props.closeModal('korisnik');
    }
    handleFormAdd(e){
        e.preventDefault();

        let data = {
            korisnicko_ime: this.refs.korisnicko_ime.value,
            lozinka: this.refs.lozinka.value
        };

        this.props.addData('korisnici', data);
        this.props.closeModal('korisnik');
    }
    render(){
        const { isAdd } = this.props;
        const { korisnicko_ime, lozinka } = this.props.data;
        return (
            <Modal
                isOpen={this.props.openModal}
                onRequestClose={()=>{this.props.closeModal('korisnik')}}
                style={customStyle}
                contentLabel="Modal"
            >
                <form onSubmit={isAdd ? this.handleFormAdd : this.handleFormEdit}>
                    <input type="text" ref="korisnicko_ime" defaultValue={korisnicko_ime} placeholder="Korisnicko ime"/>
                    <input type="text" ref="lozinka" defaultValue={lozinka} placeholder="Lozinka"/>
                    <input onClick={isAdd ? this.handleFormAdd : this.handleFormEdit}
                           type="submit"
                           value={isAdd ? "Dodaj" : "Izmeni"}/>
                </form>
            </Modal>
        )
    }
};


const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch) => bindActionCreators({editData, addData}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(KorisniciModal);

const customStyle = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(0, 0, 0, 0.75)'
    },
    content : {
        position                   : 'absolute',
        top                        : '10%',
        left                       : '10%',
        right                      : '10%',
        bottom                     : '10%',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '20px'

    }
}