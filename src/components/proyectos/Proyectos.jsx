import React, { useState, useEffect } from "react";
import {Button, Container, Table, FormGroup,Dropdown,DropdownButton } from "react-bootstrap";

import Forbiden from "../shared/forbiden/Forbiden";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_PROJECTS } from "../../graphql/Queries.js";
import { CREATE_PROJECT,DELETE_PROJECT,UPDATE_PROJECT } from "../../graphql/Mutation.js";
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
  const [avances, setAvances] = useState();
  const [habilitado, setHabilitado] = useState("Inactivo");

  const { user, isAuthenticated } = useAuth0();


  const { loading, error, data } = useQuery(GET_PROJECTS);
  
  const [
    createProject,
    {
      data: dataCrearProyecto,
      error: errorCrearProyecto,
      loading: loadingCrearProyecto,
    },
  ] = useMutation(CREATE_PROJECT);


  const [
    deleteProject,
    {
      data: dataProject,
      error: errorProject,
      loading: loadingProject,
    },
  ] = useMutation(DELETE_PROJECT);


  const [
    actualizarProject,
    {
      data: dataActualizarProject,
      error: errorActualizarProject,
      loading: loadingActualizarProject,
    },
  ] = useMutation(UPDATE_PROJECT);



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
                    <td>{datos.investigadores}</td>
                    <td>{datos.objPrincipal}</td>
                    <td>{datos.objSecundario}</td>
                    <td>{datos.estado}</td>
                    <td>{datos.presupuesto}</td>
                    <td>{datos.habilitado}</td>
               

                    <td>
                      <Button
                        color="primary"
                        onClick={() =>
                          handlerEditarProject(
                            datos.nombre,
                            datos.iPrincipal,
                            datos.investigadores,
                            datos.objPrincipal,
                            datos.objSecundario,
                            datos.estado,
                            datos.presupuesto,
                            datos.avances,
                            datos.habilitado
                          )
                        }
                      >
                        Editar
                      </Button>{" "}
                      <Button
                        key={datos.nombre}
                        className="btn btn-danger"
                        onClick={() => handlerEliminarProject(datos.nombre)}
                      >
                        Eliminar
                      </Button>{" "}
                    </td>
                  </tr>
                ))}


            </tbody>
          </Table>
          <Button color="primary" onClick={() => handlerInsertarProyecto()}>
            Agregar Proyecto
          </Button>{" "}
          <Button
            className="btn btn-danger"
            onClick={() => handlerActualizarPage()}
          >
            Actualizar
          </Button>{" "}
        </Container>

        <Modal isOpen={varShow}>
          <ModalHeader>
            <div>
              <h3>Datos Proyecto</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Registro:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={canDatos}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre del proyecto:</label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={(e) => setNombreProyecto(e.target.value)}
                placeholder={nombreProyecto}
              />
            </FormGroup>

            <FormGroup>
              <label>Investigador Principal:</label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={(e) => setIprincipal(e.target.value)}
                placeholder={iprincipal}
              />
            </FormGroup>

            <FormGroup>
              <label>Investigadores:</label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={(e) => setInvestigadores(e.target.value)}
                placeholder={investigadores}
              />
            </FormGroup>

            <FormGroup>
              <label>Objetivo Principal:</label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={(e) => setObjPrincipal(e.target.value)}
                placeholder={objPrincipal}
              />
            </FormGroup>

            <FormGroup>
              <label>Objetivos Secundarios:</label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={(e) => setObjSecundario(e.target.value)}
                placeholder={objSecundario}
              />
            </FormGroup>

            {/*
            <FormGroup>
              <label>Estado del proyecto:</label>
              <input
                className="form-control"
                name="proyectoEstate"
                type="text"
                onChange={(e) => setEstadoProyecto(e.target.value)}
                placeholder={estadoProyecto}
              />
            </FormGroup>*/}

            <FormGroup>
            <label>Estado del proyecto:</label>
            <DropdownButton variant="outline-secondary" title={estadoProyecto}>
            <Dropdown.Item onClick={(e) => setEstadoProyecto("Detenido")}>
            Detenido
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => setEstadoProyecto("En desarrollo")}>
            En desarrollo
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => setEstadoProyecto("Terminado")}>
            Terminado
            </Dropdown.Item>
            </DropdownButton>
            </FormGroup>

            <FormGroup>
            <label>Habilitado:</label>
            <DropdownButton variant="outline-secondary" title={habilitado}>
            <Dropdown.Item onClick={(e) => setHabilitado("Inactivo")}>
            Inactivo
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => setHabilitado("Activo")}>
            Activo
            </Dropdown.Item>
            </DropdownButton>
            </FormGroup>



            <FormGroup>
              <label>Presupuesto del proyecto:</label>
              <input
                className="form-control"
                name="personaje"
                type="number"
                onChange={(e) => setPresupuesto(e.target.value)}
                placeholder={presupuesto}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              disabled={invisibleBotonInsertar}
              onClick={() => handlerCrearProyecto()}
            >
              Insertar
            </Button>

            <Button
              color="primary"
              disabled={invisibleBotonActualizar}
              onClick={() => handlerEnviarEditProject()}
            >
              Actualizar
            </Button>

            <Button
              className="btn btn-danger"
              onClick={() => handlerCerrarModal()}
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

  function handlerInsertarProyecto() {
    setInvisibleBotonActualizar(true);
    setInvisibleBotonInsertar(false);
    setVarShow(true);
    setCanDatos(data.proyectos.length + 1);
  }

  function handlerCerrarModal() {
    setNombreProyecto("");
    setIprincipal("");
    setInvestigadores("");
    setObjPrincipal("");
    setObjSecundario("");
    setPresupuesto("");
    setEstadoProyecto("");
    setAvances("");

    setInvisibleBotonActualizar(true);
    setVarShow(false);
  }

  function handlerCrearProyecto() {
    createProject({
      variables: {
        nombre: nombreProyecto,
        iPrincipal: iprincipal,
        investigadores: investigadores,
        objPrincipal: objPrincipal,
        objSecundario: objSecundario,
        estado: estadoProyecto,
        presupuesto: presupuesto,
        avances: avances,
        habilitado: habilitado,
      },
    });

    setVarShow(false);
    alert("Proyecto Creado");
    //****window.location.reload(false);
  }

 
  function handlerEliminarProject(keyValue) {
    alert("Elimando proyecto " + keyValue);

    deleteProject({
      variables: {
        nombre: keyValue,
      },
    });
     //****window.location.reload(false);
  }

  
  function handlerEditarProject(nombre,iPrincipal,investigadores,objPrincipal,objSecundario,estado,presupuesto,avances,habilitado) {

    setNombreProyecto(nombre);
    setIprincipal(iPrincipal);
    setInvestigadores(investigadores);
    setObjPrincipal(objPrincipal);
    setObjSecundario(objSecundario);
    setPresupuesto(presupuesto);
    setEstadoProyecto(estado);
    setAvances(avances);
    setHabilitado(habilitado);

    alert("Editando a " + nombre);
    setInvisibleBotonActualizar(false);
    setInvisibleBotonInsertar(true);
    setVarShow(true);
  }
  

  function handlerEnviarEditProject() {

    actualizarProject({
      variables: {
        nombre: nombreProyecto,
        iPrincipal: iprincipal,
        investigadores: investigadores,
        objPrincipal: objPrincipal,
        objSecundario: objSecundario,
        estado: estadoProyecto,
        presupuesto: presupuesto,
        avances: avances,
        habilitado: habilitado,
      },
    });
     //****window.location.reload(false);
    setVarShow(false);
    setIprincipal("");
  }

  function handlerActualizarPage() {
    window.location.reload(false);
  }

}

export default Proyectos;
