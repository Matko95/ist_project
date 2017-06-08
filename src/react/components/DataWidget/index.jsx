import React, { Component } from 'react';

export default class DataWidget extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const { props } = this;

        return (
            <div className="widget">
                <h1 className="widget-title">{props.title}</h1>
                {
                    props.title === 'Automobili' &&
                    props.data.map((item, i) => (
                        <div className="widget-item" key={item.id_automobil}>
                            <div className="left-side">
                                <p>Vozilo: {item.podaci}</p>
                                <p>Status: {item.status}</p>
                                <p>Cena popravke: {item.cena_popravke}</p>
                            </div>
                            <div className="right-side">
                                <button className="delete" onClick={()=>this.props.deleteData('automobil',item.id_automobil, 'automobili', i)}>Obrisi</button>
                                <button onClick={() => this.props.openModal('automobil', {...item, index: i})}>Izmeni</button>
                            </div>
                        </div>
                    ))
                }
                {
                    props.title === 'Korisnici' &&
                    props.data.map((item, i) => (
                        <div className="widget-item" key={item.id_korisnik}>
                            <div className="left-side">
                                <p>Korisnicko ime: {item.korisnicko_ime}</p>
                            </div>
                            <div className="right-side">
                                <button className="delete" onClick={()=>this.props.deleteData('korisnik',item.id_korisnik, 'korisnici', i)}>Obrisi</button>
                                <button onClick={() => this.props.openModal('korisnik', {...item, index: i})}>Izmeni</button>
                            </div>
                        </div>
                    ))
                }
                {
                    props.title === 'Popravke' &&
                    props.data.map((item, i) => (
                        <div className="widget-item" key={item.id_popravka}>
                            <div className="left-side">
                                <p>Deo: {item.deo}</p>
                                <p>Cena: {item.cena_dela}</p>
                            </div>
                            <div className="right-side">
                                <button className="delete" onClick={()=>this.props.deleteData('popravka',item.id_popravka, 'popravke', i)}>Obrisi</button>
                                <button onClick={() => this.props.openModal('popravka', {...item, index: i})}>Izmeni</button>
                            </div>
                        </div>
                    ))
                }
                <hr/>
                <button className="add" onClick={()=> this.props.openModal(this.props.form, {}, true)}>Dodaj</button>
            </div>
        )
    }
}