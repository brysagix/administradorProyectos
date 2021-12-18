import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

import { Button} from "react-bootstrap";



function NavbarComponentEstudiante(){

const { loginWithRedirect } = useAuth0();
const { logout } = useAuth0();
const {user,isAuthenticated}= useAuth0();

return(

<>

<nav class="navbar navbar-expand navbar-dark bg-dark" >
  <div class="container-fluid">
    
    <a class="navbar-brand">Plataforma de Proyectos para Estudiante</a>
    
    <div >

      <ul class="navbar-nav" >
        <li class="nav-item">
          <Link to="/" className="nav-link active" aria-current="page" >Home</Link>
        </li>

        <li class="nav-item">
        {isAuthenticated ? <Link to="/proyectosEstudiante" className="nav-link active" aria-current="page" >Proyectos</Link>: <Link to="/forbiden" className="nav-link active" aria-current="page" >Proyectos</Link> }
        </li>

        <li class="nav-item">
        {isAuthenticated ? <Link to="/inscripcionesEstudiante" className="nav-link active" aria-current="page" >Inscripciones</Link>:<Link to="/forbiden" className="nav-link active" aria-current="page" >Inscripciones</Link> }
        </li>

        <li class="nav-item">
        {isAuthenticated ? <Link to="/avancesEstudiante" className="nav-link active" aria-current="page" >Avances en proyectos</Link> : <Link to="/forbiden" className="nav-link active" aria-current="page" >Avances en proyectos</Link> }
        </li>
      </ul>
    </div>

    <li class="nav-item">
            {/*<Button className="btn btn-secondary" onClick={(e) =><Redirect to="/avances"/>} > {isAuthenticated ? user.name : "User"} </Button>*/}
            {/*Link como boton */}
            <Link to="/editPerfil" className="btn btn-primary">
              {isAuthenticated ? user.name : "User"}
            </Link>
          </li>

          <li class="nav-item">

            {isAuthenticated ? (
              <Button
                className="btn btn-danger"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                LogOut
              </Button>
            ) : null}
          </li>   

  </div>

</nav>


</>


) 
};


export default NavbarComponentEstudiante;