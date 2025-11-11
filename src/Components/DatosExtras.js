import React, { Component } from 'react';
import { mongo } from '../index';
import Table from 'react-bootstrap/Table'

export class DatosExtras extends Component {
    state= {
      wineries: [],
      varieties: [],
      tasters: [],
      tabla: <span/>,
      hideTabla: true
    }

  vinos = mongo.db('app').collection('vinos')
  componentDidMount() {
    this.vinos.count()
    this.BodegasMasPrecioPuntos();
    this.VariedadesMayorPrecio();
    this.TasterMasVinos();

  }
  // catadores con más vinos , paises:'$country'
  TasterMasVinos= () => {
    let query= [
      // { $group:{ _id:{catador:'$taster_name'},  total: {$sum:1}, paises:{ $push:'$country'}}},
      { $group:{ _id:{catador:'$taster_name'},  total: {$sum:1},
      paises: { $addToSet: "$country" }}},
      
      { $sort: { total: -1}},
      { $limit: 8} ]
      this.vinos.aggregate(query).toArray()
      .then( t => {
        console.log(t)
        this.setState({tasters: t})
      }
    )
  }
  // Pedir diez bodegas con una media de  puntos y precio, arregladas por orden de precio
  BodegasMasPrecioPuntos = () => {
    let query = [
      { $project: { _id: 0, winery: 1, priceAvg: { $avg: '$price' }, pointsAvg: { $avg: '$points' } } },
      { $limit: 10 },
      { $sort: { priceAvg: - 1 } }]
    this.vinos.aggregate(query).toArray()
      .then(d => {
        console.log(d)
        this.setState({ wineries: d })
      }
    )
  }
  VariedadesMayorPrecio = () => {
    let query = [
      { $project: { _id: 0, variety: '$variety', priceAvg: { $avg: '$price' }, pointsAvg: { $avg: '$points' } } },
      { $limit: 10 },
      { $sort: { priceAvg: - 1 } }]
    this.vinos.aggregate(query).toArray()
      .then(v => {
        console.log(v)
        this.setState({ varieties: v })
      }
    )
  }
  getTabla = (id) => {
    switch (id) {
      case 'bodegas':
        return <Bodegas wineries={this.state.wineries}/>
      case 'variedades':
        return <Variedades varieties={this.state.varieties}/>
      case 'catadores':
        return <Catadores tasters={this.state.tasters}/> 
      default:
        return <span/>
    }
  }
// acá se pedirá con el evento que se muestre la tabla contenida en el span, según se pida (id relacionado)
  mostrarTabla = e => {
    this.setState({
      tabla: this.getTabla(e.target.id),
      hideTabla: false
    })
  }

  render() {
    return(
    
      <div> 
      <br/><br/>
      <span className='manita' id='bodegas' onClick={this.mostrarTabla}> &nbsp;&nbsp; &nbsp;Bodegas con Mayor Media de Puntos&nbsp;&nbsp; </span>
      <span className='manita' id='variedades' onClick={this.mostrarTabla}> &nbsp;&nbsp;Variedades con Mayor Media de Puntos&nbsp;&nbsp; </span>
      <span className='manita' id='catadores' onClick={this.mostrarTabla}> &nbsp;&nbsp;Catadores con Más Vinos Valorados &nbsp;&nbsp; </span>
      <span onClick={e => this.setState({ hideTabla: !this.state.hideTabla })}><i style={{fontSize:30}} className="fa fa-window-close" title="cerrar tabla"/></span>
      <span hidden={this.state.hideTabla}> {this.state.tabla} </span> <hr/>
      </div>
    )
  }
} 
export class Bodegas extends Component {
 
  render() {
    return (
      
      <div className='card-content2'>
        <span >
        {/* {JSON.stringify(this.state.wineries)} */}
        <b style={{ fontSize: 23 }}>Bodegas con Mayor Media de Puntos</b><br /><br />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Bodegas</th>
              <th>Media Puntos</th>
              <th>Media Precio $</th>
            </tr>
          </thead>
          <tbody>
            {this.props.wineries.map((w, i) => {
              return (
                <tr key={i}>
                  <td>
                    {w.winery}
                  </td>
                  <td>
                    {w.pointsAvg}
                  </td>
                  <td>
                    {w.priceAvg}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        </span>
      </div>
    )
  }
}
export class Catadores extends Component {
  render() {
    return (

      <div className='card-content2'>
        <span >
        <b style={{ fontSize: 23}}>Catadores con Más Vinos Valorados</b><br /><br />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Catador</th>
              <th>Paises</th>
              <th>Cantidad de vinos</th>
            </tr>
          </thead>
          <tbody>
            {this.props.tasters.map((t, i) => {
              return ( 
                <tr key={i}>
                  <td>
                    {t._id.catador} 
                  </td>
                  <td>
              {t.paises.map( (p, i) => <span key={i} style={{ paddingLeft: '10px'}}> {p}, </span>  )} 
                  </td>
                  <td>
                    {t.total}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        </span>
      </div>
    )
  }
}

export class Variedades extends Component {
  render() {
    return (

      <div className='card-content2'>
        <span >
        <b style={{ fontSize: 23 }}>Variedades con Mayor Media de Puntos</b><br /><br />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Variedades</th>
              <th>Media Puntos </th>
              <th>Media Precio $</th>
            </tr>
          </thead>
          <tbody>
            {this.props.varieties.map((v, i) => {
              return ( 
                <tr key={i}>
                  <td>
                    {v.variety}
                  </td>
                  <td>
                    {v.pointsAvg}
                  </td>
                  <td>
                    {v.priceAvg}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        </span>
      </div>
    )
  }
}
