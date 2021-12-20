import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Button } from "react-bootstrap";

function Footer() {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { user, isAuthenticated } = useAuth0();

  return (
    
      <nav class="navbar fixed-bottom navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">

          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  PQRS
                </Link>
              </li>

              <li class="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Contáctanos
                </Link>
              </li>

              <li class="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Trabaja con Nosotros
                </Link>
              </li>


            </ul>
          </div>

        </div>
      </nav>
    
  );


  function logOutPropio() {
    localStorage.clear();
    logout({ returnTo: window.location.origin })
  }


}

export default Footer;
