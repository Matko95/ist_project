import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editData, addData } from '../../actions/editData';
import Modal from 'react-modal';

class AutomobiliModal extends Component{
    constructor(props){
        super(props);

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleFormAdd = this.handleFormAdd.bind(this);
    }
    handleFormSubmit(e){
        e.preventDefault();

        let data = {
            id_automobil: this.props.data.id_automobil,
            podaci: this.refs.podaci.value,
            status: this.refs.status.value,
            cena_popravke: this.refs.cena_popravke.value
        };

        this.props.editData('automobili', data, this.props.data.index);
        this.props.closeModal('automobil');
    }
    handleFormAdd(e){
        e.preventDefault();

        let data = {
            podaci: this.refs.podaci.value,
            status: this.refs.status.value,
            cena_popravke: this.refs.cena_popravke.value,
            korisnik_id: this.refs.korisnik.value,
            popravka_id: this.refs.popravka.value
        };

        this.props.addData('automobili', data);
        this.props.closeModal('automobili');
    }
    render(){
        const { isAdd } = this.props;
        const { podaci, status, cena_popravke } = this.props.data;
        return (
            <Modal
                isOpen={this.props.openModal}
                onRequestClose={()=>{this.props.closeModal('automobil')}}
                style={customStyle}
                contentLabel="Modal"
            >
                <form onSubmit={isAdd ? this.handleFormAdd : this.handleFormEdit}>
                    <input type="text" ref="podaci" defaultValue={podaci} placeholder="Podaci o popravci"/>
                    <select name="status" defaultValue={status} ref="status" required>
                        <option value="popravlja se">Popravlja se</option>
                        <option value="nije stigao na red">Nije stigao na red</option>
                        <option value="popravljen">Popravljen</option>
                    </select>
                    <input type="number" ref="cena_popravke" defaultValue={cena_popravke} placeholder="Cena popravke"/>
                    {
                        isAdd &&
                        <div>
                            <select ref="korisnik">
                                {
                                    this.props.api.data.korisnici.map((item, i)=> (
                                        <option key={i} value={item.id_korisnik}>{item.korisnicko_ime}</option>
                                    ))
                                }
                            </select>
                            <select ref="popravka">
                                {
                                    this.props.api.data.popravke.map((item, i) => (
                                        <option key={i} value={item.id_popravka}>{item.deo}</option>
                                    ))
                                }
                            </select>
                        </div>
                    }
                    <input
                           onClick={isAdd ? this.handleFormAdd : this.handleFormEdit}
                           type="submit"
                           value={isAdd ? "Dodaj" : "Izmeni"}/>
                </form>
            </Modal>
        )
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = (dispatch) => bindActionCreators({editData, addData}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AutomobiliModal);

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