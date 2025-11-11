import React, { Component } from 'react';
import { mongo } from '../index';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
// import IonRangeSlider from 'react-ion-slider';


export class Precio extends Component {
  state = {
    wines: [],
    price: 0,
    country: '',
    variety: '',
    title: '',
    countries: '',
    wine: '',
    prices: [],
    hideAjax: true
  }

  vinos = mongo.db('app').collection('vinos')
  componentDidMount() {
   
    this.vinos.count();
    this.getVinosPrecio(); 
    this.setState({ hideAjax: false });
    this.agruparVinosPrecio();
  }

  agruparVinosPrecio = () => {

    let query = ([
      { $group: { _id: '$price' } },
      { $sort: { _id: 1 } }
    ])
    this.vinos.aggregate(query).toArray()
      .then(d => {
        console.log(d)
        this.setState({ prices: d, hideAjax: true })
      })
  }


  // trae los vinos por selección de precio
  getVinosPrecio = () => {
    this.setState({ hideAjax: false })
    let query = ([
      { $match: { price: this.state.price } },

    ])
    this.vinos.aggregate(query).toArray()
      .then(w => {
        this.setState({ wines: w,hideAjax: true  })

      })

    // se realizara un slider para la seleccion de precios
  }

  render() {

    return (
      <div>
        {/* <IonRangeSlider type={"single"}
          min={4}
          max={3300}
          from={3300}
          to={4}
          step={1}
          values={this.state.prices}

          onFinish={e => {
            console.log(e.from)
            this.setState({ price: e.from }, () => { this.getVinosPrecio() })
          }} /> <br /> <br />
        <output className="etiqueta" name="etiquetaVal" >{this.state.price}
          $ total de vinos: {this.state.wines.length}</output> */}




         <div className="slidecontainer">
          <p className="slidetitulo">Elige por precio</p> <br /><br/>
          <input
            name="precioVal"
            type="range" min="0" max="3500" step="50"
            className="slide"
            value={this.state.value}
            onMouseUp={e => {
              this.setState({ price: Number(e.target.value) }, () => { this.getVinosPrecio() })
            }} /> <br /> <br />
          <output className="etiqueta" name="etiquetaVal" >{this.state.price} $ total de vinos: {this.state.wines.length}</output>
        </div>
        <br/> 
        {/* acá aparece la lista de vinos por precio, si haces click sobre uno debe traer la ficha */}

        <Modal.Dialog size="lg">
          <Modal.Header style={{ backgroundColor: ' rgba(192, 255, 119, 0.479)' }}>
            <Modal.Title style={{ fontFamily: 'palatino'}}>Selecciona y pide información del vino</Modal.Title>
          </Modal.Header >
          <Modal.Body>

            <select className="form-control"
              onClick={e => {
                this.setState({ wine: e.target.value })
              }}>
              <option> País - Vino</option>
              {this.state.wines.map((w, i) => {
                return <option key={i} value={w._id.toString()}>
                  {w.country}&nbsp;&nbsp;  {w.title} &nbsp;
                </option>
              })}
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Link to={`/fichaPorPais/${this.state.wine}`}>
              <Button variant="dark" size="m">Informacion del Vino</Button>
            </Link>
          </Modal.Footer>
        </Modal.Dialog>

        {/* <pre> {JSON.stringify(this.state.wines, undefined, 2)}</pre> */}
        {/* <pre> {JSON.stringify(this.state.wine, undefined, 2)}</pre>  */}
        {/* se debe hacer un conteo de vinos si es mayor a 30 deberia agurparse por pais para luego pedirlos */}

        <img hidden={this.state.hideAjax} src="/ajax.gif" alt="loading" className="load" ></img>
      </div>
    )
  }
}
