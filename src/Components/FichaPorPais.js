import React, { Component } from 'react'
import { mongo } from '../index';
import { ObjectID } from 'bson';
import 'font-awesome/css/font-awesome.min.css';
import {DefVino} from './Editar'

export class FichaPorPais extends Component {
  state = {
  vino: new DefVino(),

  
  }

  componentDidMount= () => {    
    this.getContenidos();
    window.onkeydown = e => {
      // recordar que la key es f1
      if (e.keyCode === 112) {
      console.log(e)
      this.props.history.push(`/editar/${this.props.match.params.id}`)
    }
  }
}
  //  trae toda la informacion del vino seleccionado seleccionado
  getContenidos = () => {
    mongo.db('app').collection('vinos')
      .findOne({ _id: new ObjectID(this.props.match.params.id)  })
      .then(v => {
        this.setState({ vino: Object.assign(new DefVino(), v) 
        })
      })
    // el Object.assingn es un merge del object new a otro objeto
  }
  guardarIncrementoLikes= () => {
   mongo.db('app').collection('vinos') 
    .updateOne({_id: new ObjectID(this.props.match.params.id)}, 
    {$set: {likes: this.state.vino.likes }})
      
  }
  guardarDecrementoLikes= () => {
   mongo.db('app').collection('vinos')
    .updateOne({_id: new ObjectID(this.props.match.params.id)},
    {$set: {likes:this.state.vino.likes } })
   
  }

  // db.vinos.find( { likes: { $gt: 0 } } ).count()
  render() {
    return (
      <div className="card-content">
        <i  style={{ fontSize: 40,  position: 'absolute', right:90 }} className="fa fa-chevron-circle-left" title="Volver"
        onClick={()=>{this.props.history.goBack() }}/>
        <br/>
        <p> <b>Tu elección de vino fue:</b></p>
        <b>Pais:</b>&nbsp; {this.state.vino.country}
        <br/> 
        <b>Vino:</b>&nbsp; {this.state.vino.title}
        <br/>
        <b>Variedad:</b>&nbsp; {this.state.vino.variety}
        <br/>
        <b>Descripción:</b>&nbsp; {this.state.vino.description}
        <br/>
        <b>Precio:</b>&nbsp; {this.state.vino.price}
        <br/>
        <b>Bodega:</b>&nbsp; {this.state.vino.winery}
        <br/>
        <b> Puntos:</b>&nbsp; {this.state.vino.points}
        <br/>
        <b> Catador:</b>&nbsp;{this.state.vino.taster_name} &nbsp; 
        <a href={`http://twitter.com/${this.state.vino.taster_twitter_handle}`} target="_blanK"  rel="noopener noreferrer">
          <i style={{ fontSize: 45 }} className="fa fa-twitter-square"></i></a>
          <br/> <br/>   
             {/*acá el icono es el target del evento  */}
        <i className="fa fa-thumbs-up" style={{ fontSize: 30 }}  onClick= {e => {
          this.setState({vino:{...this.state.vino, likes:this.state.vino.likes + 1}},
           () => { 
             this.guardarIncrementoLikes()} )
            e.target.hidden = true
        }}/> &nbsp; &nbsp; 
        <i className="fa fa-thumbs-down"  style={{ fontSize: 30 }} onClick= { e => { 
        this.setState({ vino: {...this.state.vino, likes: this.state.vino.likes - 1}}, 
        () => {this.guardarDecrementoLikes()} )
        e.target.hidden = true
        }}/>
           {/* <pre> {JSON.stringify(this.state.vino, undefined, 2)}</pre>  */}
      </div>
    )
  }
}
