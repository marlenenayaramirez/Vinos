import React  from 'react';
import ReactDOM from 'react-dom'; 
import './index.css';
import {Navegacion} from './Components/Navegacion.js';
import { Route, BrowserRouter} from 'react-router-dom';
import  './bootstrap.min.css';
import {Home} from './Components/Home';
import {Vinos} from './Components/Vinos';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Stitch, RemoteMongoClient} from "mongodb-stitch-browser-sdk";
// import {AnonymousCredential} from "mongodb-stitch-browser-sdk";
import config from './config.json';
import {Editar} from './Components/Editar.js';
import {Comentarios} from './Components/Comentarios.js';
import {FichaPorPais} from './Components/FichaPorPais.js';
import {Puntos} from './Components/Puntos.js';
import {Precio} from './Components/Precio.js';
import {Login} from './Components/Login.js';
import {DatosExtras} from './Components/DatosExtras.js';





export const stitch = Stitch.initializeDefaultAppClient(config.appId);
//esto maneja los usuarios//
export const mongo = stitch.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas')
//con este manejamos la base de datos //

// if (!stitch.auth.isLoggedIn){
//  stitch.auth.loginWithCredential(  new AnonymousCredential() ).then()  
// }


  const routing = (

  <BrowserRouter>    
    {/* <Navegacion/> */}
    {/* <Route exact path="/" component={Home}/> */}
    <Route path="/" component={Navegacion}/>
    <Route path="/home" component={Home}/> 
    <Route path="/vinos" component={Vinos}/> 
    <Route path="/editar/:id" component={Editar}/>
    <Route path="/comentarios/:id" component={Comentarios}/>
    <Route path="/fichaPorPais/:id" component={FichaPorPais}/>
    <Route path="/precio" component={Precio}/>
    <Route path="/puntos" component={Puntos}/>
    <Route path="/login" component={Login}/>
    <Route path="/datosExtras" component={DatosExtras}/>
    
  </BrowserRouter>
  )
  


ReactDOM.render(routing, document.getElementById('root'))
