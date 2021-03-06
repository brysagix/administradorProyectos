import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Button } from "react-bootstrap";

function NavbarComponent() {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated } = useAuth0();

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand">Plataforma de Proyectos</a>

          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
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
                onClick={() => logOutPropio()}
              >
                LogOut
              </Button>
            ) : null}
          </li>

          
        </div>
      </nav>
    </>
  );


  function logOutPropio() {
    localStorage.clear();
    logout({ returnTo: window.location.origin })
  }


}

export default NavbarComponent;
