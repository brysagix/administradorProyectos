import React from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import CrearUsuario from '../usuarios/CrearUsuario';

import myimage1 from "../../assets/images/imagen1.jpg"
import myimage2 from "../../assets/images/imagen2.jpg"
import myimage3 from "../../assets/images/imagen3.jpg"

function Contenido() {
  return (
    //<Container>

    <div>
      <Row >
        <Col sm={9}>


          <Carousel>
            <Carousel.Item>
              <img width={900} height={420} alt="900x500"
                className="d-block w-100"
                alt="First slide"
                src={myimage1}
              />
              <Carousel.Caption>
                <h3>Investiga</h3>
                <p>
                  Siempre hay que crear nuevo conocimiento
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img width={900} height={420}
                className="d-block w-100"
                alt="Second slide"
                src={myimage2}
              />
              <Carousel.Caption>
                <h3>Desarrolla</h3>
                <p>Implementa tus ideas</p>
              </Carousel.Caption>
            </Carousel.Item>
            
            <Carousel.Item>
              <img width={900} height={420}
                className="d-block w-100"
                src={myimage3}
                alt="Third slide"
              />
              

              <Carousel.Caption>
                <h3>Comparte</h3>
                <p>
                  Trabaja activamente en la comunidad
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          

        </Col>

        <Col sm={3}>   
        <CrearUsuario/>
        </Col>

      </Row>

  </div>



   
  );
}

export default Contenido;
