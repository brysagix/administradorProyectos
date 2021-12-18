import React, { useState, useEffect } from "react";
import {Button, Container, Table} from "react-bootstrap";

import Forbiden from "../shared/forbiden/Forbiden";
import "bootstrap/dist/css/bootstrap.min.css";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_PROJECTS } from "../../graphql/Queries.js";
import {CREATE_INSCRIPCION } from "../../graphql/Mutation.js";
import { useAuth0 } from "@auth0/auth0-react";

import Validar from "../../functions/Validar.js";
import ExtraerDatosUser from "../../functions/ExtraerDatosUser.js";

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

  const { user, isAuthenticated } = useAuth0();

  const { loading, error, data } = useQuery(GET_PROJECTS);
  


  const [
    createInscripcion,
    {
      data: dataCrearInscripcion,
      error: errorCrearInscripcion,
      loading: loadingCrearInscripcion,
    },
  ] = useMutation(CREATE_INSCRIPCION);

  // Fin GraphQL

  const infoInicial = "Proyectos Almacenados en el sistema";

  let tipoUsuario = Validar();
  console.log(tipoUsuario);

  let datosPerfil = new Object();
  datosPerfil= ExtraerDatosUser();

  localStorage.setItem("nombre",datosPerfil.nombre);
  localStorage.setItem("apellido",datosPerfil.apellido);
  localStorage.setItem("personalID",datosPerfil.personalID);
  localStorage.setItem("correo",datosPerfil.correo);
  localStorage.setItem("estado",datosPerfil.estado);
  localStorage.setItem("rol",datosPerfil.rol);



  if (isAuthenticated) {
    return (
      <>
        <Container>
          <h1>{infoInicial}</h1>
          <br />
          <Table>
            <thead>
              <tr>
                <th>Nombre del proyecto</th>
                <th>Investigador Principal</th>
                <th>Investigadores asociados</th>
                <th>Objetivo Principal</th>
                <th>Objetivos Secundarios</th>
                <th>Estado</th>
                <th>Presupuesto</th>
                <th>Habilitado</th>
              </tr>
            </thead>

            <tbody>
              {data &&
                data.proyectos.map((datos) => (
                  <tr key={datos.nombre}>
                    <td>{datos.nombre}</td>
                    <td>{datos.iPrincipal}</td>
                    
                    <td>
                    { datos.investigadores.map((items) => (
                      <li>
                      {items}
                      </li>
                      ))}
                    </td>

                    <td>{datos.objPrincipal}</td>
                    <td>{datos.objSecundario}</td>
                    <td>{datos.estado}</td>
                    <td>{datos.presupuesto}</td>
                    <td>{datos.habilitado}</td>
                    
                    <td>
                      <Button
                        color="primary"
                        onClick={() =>
                          handlerCrearInscripcion(localStorage.getItem("nombre"),localStorage.getItem("apellido"),localStorage.getItem("personalID"),datos.nombre,"Pendiente")
                        }
                      >
                        Inscribirse
                      </Button>
                     
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



  function handlerCrearInscripcion(nombreEstudiante,apellidoEstudiante,idEstudiante,nombreproyecto,estadoSolicitud) {

    createInscripcion({
      variables: {
        nombre: nombreEstudiante,
        apellido: apellidoEstudiante,
        idEstudiante: idEstudiante,
        proyecto: nombreproyecto,
        estadoSolicitud: estadoSolicitud,
      },
    });
    
    
    
    alert("Inscripción Enviada");
    //**** window.location.reload(false);
  }


  function handlerActualizarPage() {
    window.location.reload(false);
  }

}

export default Proyectos;
