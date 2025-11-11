import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Home extends Component {
 
  
  render() {
    return (
      <div>

        <div style={{ backgroundColor: "black", textAlign: "center" }}>

          <img className="img" alt='vinos'
            src="https://images.all-free-download.com/images/graphiclarge/fine_red_wine_picture_2_167120.jpg"
          />

          <img className="img" alt='bodega'
            src="https://images.all-free-download.com/images/graphiclarge/white_wines_of_highdefinition_picture_2_167269.jpg"
          />

          <img className="img" alt='bodega'
            src="https://images.all-free-download.com/images/graphiclarge/bottles_of_wine_201592.jpg"
          />


        </div>
        <br/> <br/>
       <p style={{fontSize:30, fontFamily:'palatino', textAlign:'center'}}> Selecciona tu vino por ...</p>

        <div className="divPortada"> 
          <Link to="/vinos/"><i className="material-icons" title="Pais">public</i></Link>
        </div>

        <div className="divPortada">
          <Link to="/puntos/"><i className="material-icons" title="Puntos">star</i></Link>
        </div>


        <div className="divPortada">
          <Link to="/precio/"><i className="material-icons" title="Precio">attach_money</i></Link>
        </div>
      </div>
    )
  }
}
