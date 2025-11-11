
import React, { Component } from 'react';
import { mongo } from '../index';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


export class Vinos extends Component {
  state = {
    adicionales: [],
    countries: [],
    wines: [],
    varieties: [],
    descriptions: [],
    country: '',
    variety: '',
    wine: '',
    description: '',
    hideAjax: true,
  }
  //obtener de la base de datos y contar los objetos
  vinos = mongo.db('app').collection('vinos')
  componentDidMount() {
    this.setState({ hideAjax: false });
    this.vinos.count()
    this.agruparCountries(); 
    
  }
  //agrupar los paises en el array countries
  agruparCountries = () => {
    let query = [
      { $group: { _id: '$country', total: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]
    this.vinos.aggregate(query).toArray()
      .then(c => {
        console.log(c)
        this.setState({ countries: c, hideAjax: true  })
      })
  }
  //agrupar las variedades del pais seleccionado
  getVarietyOfCountry = () => {
    this.setState({ hideAjax: false });
    let query = [
      { $match: { country: this.state.country } },
      { $group: { _id: '$variety', total: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]
    this.vinos.aggregate(query).toArray()
      .then(v => {
        console.log(v, this.state.country)
        this.setState({ varieties: v, hideajax:true })
      })
  }
  //No hay que agrupar los vinos de la variedad seleccionada para que pase todo el objeto con su _id
  //y asi hacer en el select un setstate wine que trae en value el _id para pasarlo al lik de FichaPorPais
  getWinesOfCountry = () => {
    let query = [
      { $match: { country: this.state.country, variety: this.state.variety } },
      { $sort: { price: 1 } }
    ]
    this.vinos.aggregate(query).toArray()
      .then(w => {
        console.log(w)
        this.setState({ wines: w })

      })
  }
  //tener los selects en una modal y del vino elegido desplegar la descripcion con los puntos y twiter catador
  //tener la ficha del vino elegido con los datos de selección y la descrpcion precio y puntos para ello habrá un boton con link al componente FichaPorPais

  render() {
    return (
      <div>
        <br /> <br />
        <Modal.Dialog size="lg">
          <Modal.Header style={{ backgroundColor: ' rgba(192, 255, 119, 0.479)' }}>
            <Modal.Title style={{ fontFamily: 'palatino'}}>Comienza a seleccionar el vino que deseas por país</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <select onChange={e => {
              this.setState({ country: e.target.value }, () => { this.getVarietyOfCountry() })
            }}
              className="form-control">
              <option> selecciona un pais </option>
              {this.state.countries.map((c, i) =>
                <option key={i} value={c._id}> {c._id}. &nbsp; &nbsp;
           Total de vinos: {c.total.toLocaleString()} </option>

              )}
            </select>
            <select onChange={e => {
              this.setState({ variety: e.target.value }, () => { this.getWinesOfCountry() })
            }}
              className="form-control">
              <option> Selecciona una variedad </option>
              {this.state.varieties.map((v, i) =>
                <option key={i} value={v._id}>
                  {v._id}. &nbsp; &nbsp; Total de vinos: {v.total.toLocaleString()}</option>
              )}
            </select>
            <select onChange={e => {
              this.setState({ wine: e.target.value })
            }}
              className="form-control" >
              <option> Selecciona un vino </option>
              {this.state.wines.map((w, i) =>
                <option key={i} value={w._id.toString()}> {w.title} </option>
              )}
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Link to={`/fichaPorPais/${this.state.wine}`}>
              <Button variant="dark" size="m">Informacion del Vino</Button>
            </Link>
          </Modal.Footer>
        </Modal.Dialog>
        <img hidden={this.state.hideAjax} src="/ajax.gif" alt="loading" className="load" ></img>

        {/* <h4 style={{ fontSize: 20, fontFamily: 'Georgia' }}>  */}
        {/* Pais: {this.state.country}&nbsp; &nbsp;Variedad:{this.state.variety}&nbsp; */}
        {/* &nbsp; vino: {this.state.wine} </h4> */}
        {/* {/* {JSON.stringify(this.state.country)} */}
        {/* {JSON.stringify(this.state.variety)} */}
        {/* {JSON.stringify(this.state.wine)}  */} 
      </div>
    )
  }

}


