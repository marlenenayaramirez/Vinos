import React, { Component } from 'react';
import { mongo } from '../index';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


export class Puntos extends Component {
  state = {
    puntos: [],
    wines: [],
    countries: [],
    country: '',
    point: '',
    wine: '',
    hideAjax: true

  }
  vinos = mongo.db('app').collection('vinos')
  componentDidMount() {
    this.setState({ hideAjax: false });
    this.vinos.count();
    this.getPuntos();
    // agrupar puntos 
  }
  getPuntos = () => {
    let query = [
      { $group: { _id: '$points' , total: { $sum: 1 } }},
      { $sort:{_id: 1} }
    ]
    this.vinos.aggregate(query).toArray()
      .then(p => {
        console.log(p)
        this.setState({ puntos: p })
        this.setState({ points: p, hideAjax: true })

      })
  }
  // traer los paises que hacen match con los puntos
  agruparPuntosPais = () => {
    this.setState({ hideAjax: false })
    let query = [ 
      { $match: { points: parseInt(this.state.point) } },
      { $sort:{ country: 1}}
    ]
    this.vinos.aggregate(query).toArray()
      .then(c => {
        console.log(c)
        this.setState({ countries: c })
        this.setState({ countries: c, hideAjax: true })
      })
  }
  // traer los vinos que coinciden con el pais y los puntos 
  // sin parseInt no traía los los datos
  getvinosPaisPuntos = () => {
    this.setState({ hideAjax: false })
    let query = [
      { $match: { country: this.state.country, points: parseInt(this.state.point) } },
      { $sort: { country: 1 } }
    ]
    this.vinos.aggregate(query).toArray()
      .then(w => {
        console.log(w)
        this.setState({ wines: w })
        this.setState({ wines: w, hideAjax: true })

      })
  }
  render() {

    return (
    <div>
      <br /> <br />
      <Modal.Dialog size="lg"  >
        <Modal.Header style={{ backgroundColor: ' rgba(192, 255, 119, 0.479)' }}>
          <Modal.Title style={{ fontFamily: 'palatino'}}>Comienza a seleccionar el vino que deseas por su puntaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select onChange={e => {
            this.setState({ point: e.target.value }, () => { this.agruparPuntosPais() })
          }}
            className="form-control">
            <option> selecciona el puntaje </option>
            {this.state.puntos.map((p, i) =>
              <option key={i} value={p._id}> {p._id} Puntos </option>

            )}
          </select>
          <select onChange={e => {
            this.setState({ country: e.target.value }, () => { this.getvinosPaisPuntos() })
          }}
            className="form-control">
            <option> Selecciona un pais </option>
            {this.state.countries.map((c, i) =>
              <option key={i} value={c.country}> {c.country}, &nbsp; price: {c.price} $ </option>
            )}
          </select>

          <select onChange={e => {
            this.setState({ wine: e.target.value })
          }}
            className="form-control">
            <option> Selecciona un vino</option>
            {this.state.wines.map((w, i) =>
              <option key={i} value={w._id.toString()}>  {w.title} </option>
            )}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Link to={`/fichaPorPais/${this.state.wine}`}>
            <Button variant="dark" size="m">Informacion del Vino</Button>
          </Link>
        </Modal.Footer>
      </Modal.Dialog>
        {/* {<pre>{JSON.stringify(this.state, undefined, 2)}</pre> } */}
        {/* {JSON.stringify(this.state.puntos)}
        {JSON.stringify(this.state.countries)} */}
        <div style={{ width:'20%' }}>
        </div>
        <img hidden={this.state.hideAjax} src="/ajax.gif" alt="loading" className="load" ></img> 
    </div >

    )
  }
}
