import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { editData, addData } from '../../actions/editData';
import Modal from 'react-modal';

class PopravkeModal extends Component{
    constructor(props){
        super(props);

        this.handleFormEdit = this.handleFormEdit.bind(this);
        this.handleFormAdd = this.handleFormAdd.bind(this);
    }
    handleFormEdit(e){
        e.preventDefault();

        let data = {
            id_popravka: this.props.data.id_popravka,
            cena_dela: this.refs.cena_dela.value,
            deo: this.refs.deo.value
        };

        this.props.editData('popravke', data, this.props.data.index);
        this.props.closeModal('popravka');
    }
    handleFormAdd(e){
        e.preventDefault();

        let data = {
            cena_dela: this.refs.cena_dela.value,
            deo: this.refs.deo.value
        };

        this.props.addData('popravke', data);
        this.props.closeModal('popravka');
    }
    render(){
        const { isAdd } = this.props;
        const { deo, cena_dela } = this.props.data;
        return (
            <Modal
                isOpen={this.props.openModal}
                onRequestClose={()=>{this.props.closeModal('popravka')}}
                style={customStyle}
                contentLabel="Modal"
            >
                <form onSubmit={isAdd ? this.handleFormAdd : this.handleFormEdit}>
                    <input type="text" ref="deo" defaultValue={deo} placeholder="Deo"/>
                    <input type="number" ref="cena_dela" defaultValue={cena_dela} placeholder="Cena dela"/>
                    <input onClick={isAdd ? this.handleFormAdd : this.handleFormEdit}
                           type="submit"
                           value={isAdd ? "Dodaj" : "Izmeni"}/>
                </form>
            </Modal>
        )
    }
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => bindActionCreators({editData, addData}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PopravkeModal);

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