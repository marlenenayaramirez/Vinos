import React, { Component } from 'react';
import { ObjectId } from 'bson';
import { mongo } from '../index';
import {stitch } from '../index';
import Button from 'react-bootstrap/Button';


export class DefVino {
  constructor() {
    this.title = "";
    this.country = "";
    this.description = "";
    this.points = "";
    this.price = "";
    this.taster_name = "";
    this.taster_tiwtter_handle = "";
    this.winery = "";
    this.variety = "";
    this.likes = 0;
    this.owner = stitch.auth.user.id
  }
}

export class Editar extends Component {
  state = {
    vino: new DefVino()
  }


  // db.vinos.updateMany( {}, { $set: { owner: '5da735dd457f87949ab5567e'} } )

  datos = mongo.db('app').collection('vinos')
  componentDidMount = () => {
  // if (this.props.match.params.id.length === 24
    if (this.props.match.params.id !== 'nuevo') {
      let idBueno = new ObjectId(this.props.match.params.id)
      this.datos.findOne({ _id: idBueno })
        .then((d) => { console.log(d); this.setState({ vino: d }) })
        .catch(e => { console.log(e) }) 
    }

    else {
    
    }
    //crear un id con el "id" de mongo
    //hacer un input para poner el nombre del vino
    //hacer un boton para updateOne (replaceOne() reemplaza los valores)
    //hacer un boton para insertOne
  }

  render() {
    return (
      <div style={{ padding: "10px", fontWeight: "bold" }}>
        <div style={{ width: "50%" }}>
          Country &nbsp;<input className="form-control" placeholder="country"
            value={this.state.vino.country}
            onChange={e => {
              this.setState({
                vino: { ...this.state.vino, country: e.target.value }
              })
            }} />
          Wine &nbsp;<input className="form-control" placeholder="wine"
            value={this.state.vino.title}
            onChange={e => {
              this.setState({ vino: { ...this.state.vino, title: e.target.value } })
            }} />
          Variety &nbsp;<input className="form-control" placeholder="variety"
            value={this.state.vino.variety}
            onChange={e => {
              this.setState({ vino: { ...this.state.variety, variety: e.target.value } })
            }} />
          Designation &nbsp;<input className="form-control" placeholder="designation"
            value={this.state.vino.designation}
            onChange={e => {
              this.setState({ vino: { ...this.state.vino, designation: e.target.value } })
            }} />
          Description &nbsp;<textarea rows="3" cols="100" placeholder="description"
            value={this.state.vino.description}
            onChange={e => {
              this.setState({ vino: { ...this.state.vino, description: e.target.value } })
            }} />
          <div className="form-inline" style={{ width: "150%" }}>
            Winery &nbsp;<input className="form-control" placeholder="winery"
              value={this.state.vino.winery}
              onChange={e => {
                this.setState({ vino: { ...this.state.vino, winery: e.target.value } })
              }} />&nbsp;
          Region_1 &nbsp;<input className="form-control" placeholder="region_1"
              value={this.state.vino.region_1}
              onChange={e => {
                this.setState({ vino: { ...this.state.vino, region_1: e.target.value } })
              }} />&nbsp;
          Region_2 &nbsp; <input className="form-control" placeholder="region_2"
              value={this.state.vino.region_1}
              onChange={e => {
                this.setState({ vino: { ...this.state.vino, region_2: e.target.value } })
              }} />
          </div>
          <br />
        </div>
        <div className="form-inline">
          Precio &nbsp;<input className="form-control" placeholder="price"
            value={this.state.vino.price}
            onChange={e => {
              this.setState({ vino: { ...this.state.vino, price: e.target.value } })
            }} /> &nbsp;
          Points &nbsp;<input className="form-control" placeholder="points"
            value={this.state.vino.points}
            onChange={e => {
              this.setState({ vino: { ...this.state.vino, points: e.target.value } })
            }} /> &nbsp;
          taster_name &nbsp;<input className="form-control" placeholder="taster_names"
            value={this.state.vino.taster_name}
            onChange={e => {
              this.setState({ vino: { ...this.state.vino, taster_name: e.target.value } })
            }} />  &nbsp;
          taster_twitter_handle &nbsp;<input className="form-control" placeholder="taster_twitter_handle"
            value={this.state.vino.taster_twitter_handle}
            onChange={e => {
              this.setState({ vino: { ...this.state.vino, taster_twitter_handle: e.target.value } })
            }} />

        </div>



        <br />
        <Button
          variant="dark" size="sm"
          className="" onClick={e => {
            this.datos.insertOne(this.state.vino)
          }}> Nuevo </Button>
        &nbsp;

        <Button
          hidden={!this.state.vino._id}
          variant="dark" size="sm"
          onClick={e => {
            this.datos.findOneAndReplace({ _id: new ObjectId(this.props.match.params.id) }, this.state.vino)
          }}>Modificar</Button>
        &nbsp;

        <Button
          hidden={!this.state.vino._id}
          variant="dark" size="sm"
          onClick={e => {
            this.datos.deleteOne({ _id: new ObjectId(this.props.match.params.id) })
          }}>Borrar</Button>

      </div>
    )
  }
}
