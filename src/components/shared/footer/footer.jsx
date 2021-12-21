import React from "react";
import { Link} from "react-router-dom";


function Footer() {


  return (
    <>
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
      
      </>
  );


}

export default Footer;
