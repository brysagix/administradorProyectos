import React, { useState } from "react";
import {  Button, Container, Table, FormGroup,Dropdown,DropdownButton } from "react-bootstrap";
import Forbiden from "../shared/forbiden/Forbiden";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USERS_STUDENTS } from "../../graphql/Queries.js";

import { UPDATE_USER } from "../../graphql/Mutation.js";

import { useAuth0 } from "@auth0/auth0-react";




function UsuariosHowLider() {
  //const [usuarios, setUsuarios] = useState([]);
  const [varShow, setVarShow] = useState(false);
  const [invisibleBotonActualizar, setInvisibleBotonActualizar] =useState(true);

  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [personalID, setPersonalID] = useState();
  const [correo, setCorreo] = useState();
  const [rol, setRol] = useState();
  const [estado, setEstado] = useState();

  const { isAuthenticated } = useAuth0();

  //Parte Graphql

  const { loading, error, data } = useQuery(GET_USERS_STUDENTS);
  loading ? console.log("cargando") : console.log(data);



  const [
    actualizarUser,
    {
      data: dataActualizarUsuario,
      error: errorActualizarUsario,
      loading: loadingActualizarUsuario,
    },
  ] = useMutation(UPDATE_USER);


  
  const infoInicial = "Usuarios Almacenados en el sistema";



  if (isAuthenticated) {
    return (
      <>
        <Container>
        <h1>{infoInicial}</h1>

          <br />
          <Table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Id</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {data &&
                data.usuariosEstudiante.map((datos) => (
                  <tr key={datos.personalID}>
                    <td>{datos.nombre}</td>
                    <td>{datos.apellido}</td>
                    <td>{datos.personalID}</td>
                    <td>{datos.correo}</td>
                    <td>{datos.rol}</td>
                    <td>{datos.estado}</td>
                    <td>
                      <Button
                        color="primary"
                        onClick={() =>
                          handlerEditarUser(
                            datos.nombre,
                            datos.apellido,
                            datos.personalID,
                            datos.correo,
                            datos.rol,
                            datos.estado
                          )
                        }
                      >
                        Editar
                      </Button>{" "}
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

        <Modal isOpen={varShow}>
          <ModalHeader>
            <div>
              <h3>Datos del Usuario</h3>
            </div>
          </ModalHeader>

          <ModalBody>
  
            <FormGroup>
              <label>Nombre:</label>
              <label>{nombre}</label>
            </FormGroup>

            <FormGroup>
              <label>Apellido:</label>
              <label>{apellido}</label>
            </FormGroup>

            <FormGroup>
              <label>Personal Id:</label>
              <label>{personalID}</label>
            </FormGroup>

            <FormGroup>
              <label>Correo:</label>
              <label>{correo}</label>
            </FormGroup>

            <FormGroup>
        <label>Estado:</label>
        <DropdownButton variant="outline-secondary" title={estado}>
          <Dropdown.Item onClick={(e) => setEstado("Pendiente")}>
            Pendiente
          </Dropdown.Item>
          <Dropdown.Item onClick={(e) => setEstado("Activo")}>
            Activo
          </Dropdown.Item>
        </DropdownButton>
      </FormGroup>



          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              disabled={invisibleBotonActualizar}
              onClick={() => handlerEnviarEditUser()}
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

  function handlerCerrarModal() {
    //console.log(nombre,apellido,correo,rol,estado);
    setNombre("");
    setApellido("");
    setPersonalID("");
    setCorreo("");
    setRol("");
    setEstado("");
    setInvisibleBotonActualizar(true);

    setVarShow(false);
  }

  function handlerEditarUser(nom, apelli, personId, corr, role, estat) {
    setNombre(nom);
    setApellido(apelli);
    setPersonalID(personId);
    setCorreo(corr);
    setRol(role);
    setEstado(estat);
    setInvisibleBotonActualizar(false);
    setVarShow(true);
  }

  
  function handlerEnviarEditUser() {
    console.log(nombre,apellido,personalID,correo,rol,estado);
    actualizarUser({
      variables: {
        nombre: nombre,
        apellido: apellido,
        personalID:personalID,
        correo: correo,
        rol: rol,
        estado: estado,
      },
    });
     //****window.location.reload(false);
    setVarShow(false);
  }



  function handlerActualizarPage() {
    window.location.reload(false);
  }
}

export default UsuariosHowLider;
