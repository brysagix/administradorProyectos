import React, { useState, useEffect } from "react";
import {Button, Container, Table, FormGroup,Dropdown,DropdownButton } from "react-bootstrap";

import Forbiden from "../shared/forbiden/Forbiden";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_PROJECTS,GET_INSCRIPCIONES } from "../../graphql/Queries.js";
import { CREATE_PROJECT,DELETE_PROJECT,UPDATE_PROJECT,DELETE_INSCRIPCION,UPDATE_INSCRIPCION,UPDATE_INVESTI } from "../../graphql/Mutation.js";
import { useAuth0 } from "@auth0/auth0-react";
import Validar from "../../functions/Validar.js";

function Proyectos() {
  //const [usuarios, setUsuarios] = useState([]);
  const [varShow, setVarShow] = useState(false);
  const [invisibleBotonActualizar, setInvisibleBotonActualizar] = useState(true);
  const [invisibleBotonInsertar, setInvisibleBotonInsertar] = useState(true);

  const [canDatos, setCanDatos] = useState();

  const [nombreProyecto, setNombreProyecto] = useState("");
  const [iprincipal, setIprincipal] = useState("");
  const [investigadores, setInvestigadores] = useState("");
  const [objPrincipal, setObjPrincipal] = useState("");
  const [objSecundario, setObjSecundario] = useState("");
  const [estadoProyecto, setEstadoProyecto] = useState("Detenido");
  const [presupuesto, setPresupuesto] = useState(0);
  const [avances, setAvances] = useState("");
  const [habilitado, setHabilitado] = useState("Inactivo");

  const [botonAceptar, setBotonAceptar] = useState(false);

  const { user, isAuthenticated } = useAuth0();


  //const { loading, error, data } = useQuery(GET_PROJECTS);
  const { loading, error, data } = useQuery(GET_INSCRIPCIONES);
  

  const [
    deleteInscripcion,
    {
      data: dataDeleteInscripcion,
      error: errorDeleteInscripcion,
      loading: loadingDeleteInscripcion,
    },
  ] = useMutation(DELETE_INSCRIPCION);

  const [
    actualizarInscripcion,
    {
      data: dataActualizarInscripcion,
      error: errorActualizarInscripcion,
      loading: loadingActualizarInscripcion,
    },
  ] = useMutation(UPDATE_INSCRIPCION);


  const [
    agregarInvestigador,
    {
      data: dataAgregarInvestigador,
      error: errorAgregarInvestigador,
      loading: loadingAgregarInvestigador,
    },
  ] = useMutation(UPDATE_INVESTI);


  // Fin GraphQL

  const infoInicial = "Inscripciones a proyectos How Estudiante";

  let tipoUsuario = Validar();
  console.log(tipoUsuario);

  if (isAuthenticated) {
    return (
      <>
        <Container>
          <h1>{infoInicial}</h1>
          <br />
          <Table>
            <thead>
              <tr>
                <th>Nombre del Estudiante</th>
                <th>Apellido del Estudiante</th>
                <th>Id Estudiante</th>
                <th>Nombre del Proyecto</th>
                <th>Estado Solicitud</th>
              </tr>
            </thead>

            <tbody>
              {data &&
                data.inscripciones.map((datos) => (
                  <tr key={datos.nombre}>
                    <td>{datos.nombre}</td>
                    <td>{datos.apellido}</td>
                    <td>{datos.idEstudiante}</td>
                    <td>{datos.proyecto}</td>
                    <td>{datos.estadoSolicitud}</td>
                    <td>
                    </td>
                  </tr>
                ))}


            </tbody>
          </Table>
          
          <Button
            className="btn btn-danger"
            onClick={() => handlerActualizarPage()}
          >
            Actualizar
          </Button>{" "}

        </Container>
        
      </>
    );
  } else {
    return <Forbiden />;
  }




  function handlerEliminarInscripcion(estudiante,nombreProyecto) {
    alert("Elimando inscripción a " + nombreProyecto);

    deleteInscripcion({
      variables: {
        nombre: estudiante,
        proyecto:nombreProyecto
      },
    });
     //****window.location.reload(false);
  }

  function handlerAceptarInscripcion(nombreEstudiante,nombreProyecto,decision) {

    actualizarInscripcion({
      variables: {
        nombre: nombreEstudiante,
        proyecto:nombreProyecto,
        estadoSolicitud:decision
      },
    });

    agregarInvestigador({
      variables: {
        nombre: nombreProyecto,
        estudianteAgregado:nombreEstudiante,
      },
    });

    //setBotonAceptar(true);
     //****window.location.reload(false);
  }

  function handlerActualizarPage() {
    window.location.reload(false);
  }

}

export default Proyectos;
