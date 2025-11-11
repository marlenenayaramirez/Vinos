import React, { Component } from 'react';
import { mongo } from '../index';
import { ObjectID } from 'bson';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


class Comentariowine {
  constructor() {
    this.texto = ''
    this.comentarios = []  
    
  }
  guardarComentarios= () => {
  mongo.db('app').collection('vinos')
   .updateOne(
    {_id: new ObjectID(this.props._id) },
    { $set:{comentarios: this.state.wine.comentarios } }
    
  )}
}


export class Comentarios extends Component {
  state = {
    wine: { comentarios: [] },
    texto: '',
  }

  render() {
    return (
      <div>
        <br/><br/>
            <Modal.Dialog>
          <Modal.Header style={{ backgroundColor: 'rgba(192, 255, 119, 0.479)'}}>
           <Modal.Title>Comentarios</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <input className="form-control"
          onChange={e => this.setState({ texto: e.target.value })} /> 
         </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" size="sm" onClick={e => {
          // crear un objeto con la estructura de Comentariowine
          let nuevoComentario = new Comentariowine()
          // meter el valor del input en nuevoComentario.texto
          nuevoComentario.texto = this.state.texto
          // this.state.wine.comentarios.push(nuevoComentario)
          // hacer copia del array del state:
           this.state.wine.comentarios.push(nuevoComentario)
          this.setState({ wine: { ...this.state.wine, comentarios: this.state.wine.comentarios }}, () => {this.guardarComentarios()}) 
        }}>Enviar</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    )
  }
}

