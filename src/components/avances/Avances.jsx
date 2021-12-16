import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Table,
  FormGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

import Forbiden from "../shared/forbiden/Forbiden";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_PROJECTS,
  GET_PROJECTS_AVANCES,
  GET_ONE_PROJECTS_AVANCES,
  GET_OBSERVACIONES_BY_AVANCE,
} from "../../graphql/Queries.js";
import {
  CREATE_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT,
  ADD_AVANCE,
  DELETE_AVANCE,
  ADD_OBSERVATION,
  DELETE_OBSERVATION,
} from "../../graphql/Mutation.js";
import { useAuth0 } from "@auth0/auth0-react";
import Validar from "../../functions/Validar.js";

function Proyectos() {
  //const [usuarios, setUsuarios] = useState([]);
  const [varShow, setVarShow] = useState(false);
  const [varShowAvance, setVarShowAvance] = useState(false);

  const [invisibleBotonActualizar, setInvisibleBotonActualizar] =
    useState(true);
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

  const [proyectoBuscado, setProyectoBuscado] = useState("");
  const [datosAvance, setDatosAvance] = useState("");

  const [nuevaObservacion, setNuevaObservacion] = useState("");
  const [avanceParaBorrar, setAvanceParaBorrar] = useState("");
  const [avanceParaBuscarObservaciones, setAvanceParaBuscarObservaciones] =
    useState("");

  const { user, isAuthenticated } = useAuth0();

  const { loading, error, data } = useQuery(GET_PROJECTS);
  //const { loading:loadingAvances, error:errorAvances, data:dataAvances } = useQuery(GET_PROJECTS_AVANCES);
  const {
    loading: loadingAvances,
    error: errorAvances,
    data: dataAvances,
  } = useQuery(GET_ONE_PROJECTS_AVANCES, {
    variables: { nombre: proyectoBuscado },
  });
  const {
    loading: loadingObservacionAvances,
    error: errorObservacionAvances,
    data: dataObservacionAvances,
  } = useQuery(GET_OBSERVACIONES_BY_AVANCE, {
    variables: { avance: avanceParaBuscarObservaciones },
  });

  console.log("Observaciones");
  console.log(dataObservacionAvances);

  const [
    agregarAvance,
    {
      data: dataAgregarAvance,
      error: errorAgregarAvance,
      loading: loadingAgregarAvance,
    },
  ] = useMutation(ADD_AVANCE);

  const [
    deleteAvance,
    {
      data: dataDeleteAvance,
      error: errorDeleteAvance,
      loading: loadingDeleteAvance,
    },
  ] = useMutation(DELETE_AVANCE);

  const [
    agregarObservacion,
    {
      data: dataAgregarObservacion,
      error: errorAgregarObservacion,
      loading: loadingAgregarObservacion,
    },
  ] = useMutation(ADD_OBSERVATION);

  const [
    borraObservacion,
    {
      data: dataDeleteObservacion,
      error: errorDeleteObservacion,
      loading: loadingDeleteObservacion,
    },
  ] = useMutation(DELETE_OBSERVATION);

  // Fin GraphQL

  const infoInicial = "Proyectos Almacenados en el sistema  HOW ADMIN";

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
                <th>Nombre del proyecto</th>
                <th>Objetivo Principal</th>
                <th>Objetivos Secundarios</th>
              </tr>
            </thead>

            <tbody>
              {data &&
                data.proyectos.map((datos) => (
                  <tr key={datos.nombre}>
                    <td>{datos.nombre}</td>
                    <td>{datos.objPrincipal}</td>
                    <td>{datos.objSecundario}</td>

                    <td>
                      <Button
                        color="primary"
                        onClick={() => handlerCargarAvances(datos.nombre)}
                      >
                        Ver Avances
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Container>

        <Container>
          <h1>Avances del Proyecto</h1>
          <br />
          <Table>
            <thead>
              <tr>
                <th>Nombre del proyecto</th>
              </tr>
            </thead>

            <tbody>
              {dataAvances &&
                dataAvances.avancesNombreProyecto.map((datos) => (
                  <td>{datos.nombre}</td>
                ))}
            </tbody>
          </Table>

          <Table>
            <thead>
              <tr>
                <th>Avances</th>
              </tr>
            </thead>

            <tbody>
              {dataAvances &&
                dataAvances.avancesNombreProyecto.map((datos) => (
                  <tr key={datos.nombre}>
                    {datos.avances.map((items) => (
                      <td>
                        <Button
                          className="btn btn-secondary"
                          onClick={() => handlerVerOpcionesAvance(items)}
                        >
                          {items}
                        </Button>
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </Table>

          <Button
            className="btn btn-primary"
            onClick={() => handlerCargarModalAvance(proyectoBuscado)}
          >
            Agregar Avances
          </Button>

          <br />
          <br />

          <Table>
            <thead>
              <tr>
                <th>Observaciones</th>
              </tr>
            </thead>

            <tbody>
              {dataObservacionAvances &&
                dataObservacionAvances.observacionesByAvance.map((datos) => (
                  <tr key={datos.datoRegistrado}>
                    <td>
                      <Button className="btn btn-secondary">
                        {datos.datoRegistrado}
                      </Button>{" "}
                      <Button
                        className="btn btn-danger"
                        onClick={() =>
                          handlerEliminarObservacionPuntual(
                            datos.datoRegistrado,
                            datos.autor
                          )
                        }
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>

          <Button
            className="btn btn-primary"
            onClick={() => handlerActualizarPage()}
          >
            Actualizar Tabla
          </Button>
        </Container>

        <Modal isOpen={varShow}>
          <ModalHeader>
            <div>
              <h3>Datos del Avance</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <input
                className="form-control"
                name="avance"
                type="text"
                onChange={(e) => setDatosAvance(e.target.value)}
                placeholder={datosAvance}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => handlerEnviarAvance()}>
              Agregar
            </Button>

            <Button
              className="btn btn-danger"
              onClick={() => handlerCerrarModalAvance()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={varShowAvance}>
          <ModalHeader>
            <div>
              <h3>Datos del Avance</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <input
                className="form-control"
                name="avance"
                type="text"
                placeholder={nuevaObservacion}
                onChange={(e) => setNuevaObservacion(e.target.value)}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() =>
                handlerCrearObservacion(proyectoBuscado, avanceParaBorrar)
              }
            >
              Agregar Observación
            </Button>

            {/*
            <Button
              color="primary"
              onClick={() =>handlerMostrarObservaciones(proyectoBuscado,avanceParaBorrar)}  
            >
              Ver Observaciones
            </Button>

            */}

            <Button
              className="btn btn-danger"
              onClick={() =>
                handlerEliminarAvance(proyectoBuscado, avanceParaBorrar)
              }
            >
              Eliminar Avance
            </Button>

            <Button
              className="btn btn-danger"
              onClick={() => handlerCerrarOpcionesAvance()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  } else {
    return <Forbiden />;
  }

  function handlerCargarAvances(nombreProyecto) {
    //alert(nombreProyecto)
    setProyectoBuscado(nombreProyecto);
    //window.location.reload(false);
  }

  function handlerVerOpcionesAvance(avance) {
    //alert(nombreProyecto)
    //alert(avance)
    setAvanceParaBorrar(avance);
    setVarShowAvance(true);

    //*******
    setAvanceParaBuscarObservaciones(avance);
    //window.location.reload(false);
  }

  function handlerCerrarOpcionesAvance() {
    setVarShowAvance(false);
    setNuevaObservacion("");
  }

  function handlerEliminarAvance(proyectoBusc, avanceParaBorr) {
    deleteAvance({
      variables: {
        nombre: proyectoBusc,
        avances: avanceParaBorr,
      },
    });
    window.location.reload(false);
  }

  function handlerCargarModalAvance() {
    setVarShow(true);
    setDatosAvance("");
  }

  function handlerEnviarAvance() {
    //alert(datosAvance);
    //alert(proyectoBuscado);
    agregarAvance({
      variables: {
        nombre: proyectoBuscado,
        avances: datosAvance,
      },
    });

    window.location.reload(false);
    setVarShow(false);
  }

  function handlerCerrarModalAvance() {
    setDatosAvance("");
    setVarShow(false);
  }

  function handlerCrearObservacion(proyectoBuscado, avanceParaBorrar) {
    alert("Creando Observacion");

    agregarObservacion({
      variables: {
        datoRegistrado: nuevaObservacion,
        autor:
          localStorage.getItem("nombre") +
          " " +
          localStorage.getItem("apellido"),
        avance: avanceParaBorrar,
        proyectoNombre: proyectoBuscado,
      },
    });

    window.location.reload(false);
  }

  function handlerEliminarObservacionPuntual(observacion, autor) {
    alert("Borrando Observación");
    //alert(observacion)
    //alert(autor)

    borraObservacion({
      variables: {
        datoRegistrado: observacion,
        autor: autor,
      },
    });
  }

  function handlerActualizarPage() {
    window.location.reload(false);
  }
}

export default Proyectos;
