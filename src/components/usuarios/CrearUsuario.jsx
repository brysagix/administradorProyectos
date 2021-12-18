import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  FormGroup,
  Form,
  Dropdown,
  InputGroup,
  FormControl,
  DropdownButton,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CREATE_USERS } from "../../graphql/Mutation.js";

import { useAuth0 } from "@auth0/auth0-react";

function CrearUsuario() {
  //const [usuarios, setUsuarios] = useState([]);

  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [personalID, setPersonalID] = useState();
  const [correo, setCorreo] = useState();
  const [rol, setRol] = useState("Seleccione un Rol");

  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const {user,isAuthenticated}= useAuth0();



  const [
    createUser,
    {
      data: dataCrearUsuario,
      error: errorCrearUsario,
      loading: loadingCrearUsuario,
    },
  ] = useMutation(CREATE_USERS);


  let rolUsuario =Validar();
  
  let datosPerfil = new Object();
  datosPerfil= ExtraerDatosUser()

  localStorage.setItem("nombre",datosPerfil.nombre)
  localStorage.setItem("apellido",datosPerfil.apellido)
  localStorage.setItem("personalID",datosPerfil.personalID)
  localStorage.setItem("correo",datosPerfil.correo)
  localStorage.setItem("estado",datosPerfil.estado)
  localStorage.setItem("rol",datosPerfil.rol)
  

  return (
    <Container>
      <h2>Crear Usuario</h2>
      <FormGroup>
        <label>Nombre:</label>
        <input
          className="form-control"
          name="personaje"
          type="text"
          onChange={(e) => setNombre(e.target.value)}
          placeholder={nombre}
        />
      </FormGroup>
      <FormGroup>
        <label>Apellido:</label>
        <input
          className="form-control"
          name="apellido"
          type="text"
          onChange={(e) => setApellido(e.target.value)}
          placeholder={apellido}
        />
      </FormGroup>
      <FormGroup>
        <label>Personal Id:</label>
        <input
          className="form-control"
          name="personalID"
          type="number"
          onChange={(e) => setPersonalID(e.target.value)}
          placeholder={personalID}
        />
      </FormGroup>
      <FormGroup>
        <label>Correo:</label>
        <input
          className="form-control"
          name="correo"
          type="email"
          onChange={(e) => setCorreo(e.target.value)}
          placeholder={correo}
        />
      </FormGroup>
      <FormGroup>
        <label>Rol:</label>

        <DropdownButton variant="outline-secondary" title={rol}>
          <Dropdown.Item onClick={(e) => setRol("Administrador")}>
            Administrador
          </Dropdown.Item>
          <Dropdown.Item onClick={(e) => setRol("Lider")}>
            Lider
          </Dropdown.Item>
          <Dropdown.Item onClick={(e) => setRol("Estudiante")}>
            Estudiante
          </Dropdown.Item>
        </DropdownButton>
      </FormGroup>
      <br />
      <Button color="primary" onClick={() => handlerCrearUsuario()}>
        Sign Up
      </Button>{" "}
      {""}

      {isAuthenticated ? null:<Button className="btn btn-danger" onClick={() => loginWithRedirect()}>Login</Button>}

    </Container>
  );


  
  function handlerCrearUsuario() {
    createUser({
      variables: {
        nombre: nombre,
        apellido: apellido,
        personalID: personalID,
        correo: correo,
        rol: rol,
        estado: "Pendiente",
      },
    });

    alert("Usuario Creado");
     //****window.location.reload(false);

    setNombre("");
    setApellido("");
    setPersonalID(0);
    setCorreo("");
    setRol("Seleccione un Rol");
  }



}

export default CrearUsuario;
