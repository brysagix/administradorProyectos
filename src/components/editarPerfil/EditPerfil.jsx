import React, { useState, useEffect } from "react";
import { Card, Button, Container, Table, FormGroup } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import Forbiden from "../shared/forbiden/Forbiden";

import "bootstrap/dist/css/bootstrap.min.css";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USERS } from "../../graphql/Queries.js";
import { UPDATE_USER } from "../../graphql/Mutation.js";

import { useAuth0 } from "@auth0/auth0-react";

import Validar from "../../functions/Validar.js"
import ExtraerDatosUser from "../../functions/ExtraerDatosUser.js"



function EditPerfil() {

  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [personalID, setPersonalID] = useState();
  const [correo, setCorreo] = useState();
  const [rol, setRol] = useState();
  const [estado, setEstado] = useState();

  const {user,isAuthenticated}= useAuth0();



  const [
    actualizarUser,
    {
      data: dataActualizarUsuario,
      error: errorActualizarUsario,
      loading: loadingActualizarUsuario,
    },
  ] = useMutation(UPDATE_USER);


  {isAuthenticated ? localStorage.setItem("correo",user.email):localStorage.setItem("correo","")}

  const infoInicial = "Editar Perfil";
  let tipoUsuario =Validar()
  //console.log(tipoUsuario)

  let datosPerfil = new Object();
  datosPerfil= ExtraerDatosUser()

  localStorage.setItem("nombre",datosPerfil.nombre)
  localStorage.setItem("apellido",datosPerfil.apellido)
  localStorage.setItem("personalID",datosPerfil.personalID)
  localStorage.setItem("correo",datosPerfil.correo)
  localStorage.setItem("estado",datosPerfil.estado)
  localStorage.setItem("rol",datosPerfil.rol)
  



  if(isAuthenticated){

  return (
    <>
     <Container>
      <h2>Editar Perfil</h2>
      <FormGroup>
        <label>Nombre:</label>
        <input
          className="form-control"
          name="personaje"
          type="text"
          onChange={(e) => localStorage.setItem("nombre",e.target.value)}
          placeholder={datosPerfil.nombre}
        />
      </FormGroup>
      <FormGroup>
        <label>Apellido:</label>
        <input
          className="form-control"
          name="apellido"
          type="text"
          onChange={(e) => localStorage.setItem("apellido",e.target.value)}
          placeholder={datosPerfil.apellido}
        />
      </FormGroup>
      <FormGroup>
        <label>Personal Id:</label>
        <input
          className="form-control"
          name="personalID"
          type="number"
          placeholder={datosPerfil.personalID}
          disabled="disabled"
        />
      </FormGroup>
      <FormGroup>
        <label>Correo:</label>
        <input
          className="form-control"
          name="correo"
          type="email"
          placeholder={datosPerfil.correo}
          disabled="disabled"
        />
      </FormGroup>

      <FormGroup>
        <label>Rol:</label>
        <input
          className="form-control"
          name="correo"
          type="rol"
          placeholder={datosPerfil.rol}
          disabled="disabled"
        />
      </FormGroup>

      <FormGroup>
        <label>Estado:</label>
        <input
          className="form-control"
          name="correo"
          type="estado"
          placeholder={datosPerfil.estado}
          disabled="disabled"
        />
      </FormGroup>
      
      <br />
      <Button color="primary" onClick={() => handlerEnviarEditUser(datosPerfil)}>
        Actualizar
      </Button>{" "}

    </Container>
    </>
  );

}

else{

  return (null)


}


  function handlerEnviarEditUser(arregloDatos) {

    console.log("Dentro de la funcion")
    console.log(arregloDatos)

    actualizarUser({
      variables: {
        nombre: localStorage.getItem("nombre"),
        apellido: localStorage.getItem("apellido"),
        personalID:localStorage.getItem("personalID"),
        correo: localStorage.getItem("correo"),
        rol: localStorage.getItem("rol"),
        estado: localStorage.getItem("estado"),
      },
    });


    alert("Datos Actualizados")
    window.location.reload(false);


  }





}

export default EditPerfil;
