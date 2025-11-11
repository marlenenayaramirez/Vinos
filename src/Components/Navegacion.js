import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';




export class Navegacion extends Component {
 

  render() {


    return (

      <div>
        
        <Navbar expand="lg"  bg="dark" className="bg-dark justify-content-between">

          <Link to="/home" style={{ fontSize: "25px", fontFamily: "palatino", color:'black' }}>
            <i className="fa fa-home" style={{ fontSize: "45px" }}/>
            &nbsp; Selecciona el mejor vino por... &nbsp; </Link>
          <Link to="/vinos" style={{ fontSize: "28px", fontFamily: "palatino", color:'black' }}>País</Link>
          <Link to="/precio" style={{ fontSize: "28px", fontFamily: "palatino", color:'black' }}>Precio</Link>
          <Link to="/puntos" style={{ fontSize: "28px", fontFamily: "palatino", color:'black' }}>Puntos</Link>
          <Link to="/datosExtras" style={{ fontSize: "28px", fontFamily: "palatino", color:'black' }} >Tips</Link>
          <Link to="/login" style={{ fontSize: "28px", fontFamily: "palatino", color:'black' }} >Login</Link>
        </Navbar>

      </div>
    )
  }
}
