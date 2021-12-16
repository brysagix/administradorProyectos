import React, { useState, useEffect } from "react";
import { Card, Button, Container, Table, FormGroup } from "react-bootstrap";

import Forbiden from "../shared/forbiden/Forbiden";

import "bootstrap/dist/css/bootstrap.min.css";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USERS } from "../../graphql/Queries.js";
import { GET_USERS_STUDENTS } from "../../graphql/Queries.js";
import { VALID_USER } from "../../graphql/Queries.js";
import { CREATE_USERS } from "../../graphql/Mutation.js";
import { DELETE_USERS } from "../../graphql/Mutation.js";
import { UPDATE_USER } from "../../graphql/Mutation.js";


import { useAuth0 } from "@auth0/auth0-react";

import Validar from "../../functions/Validar.js"




function Usuarios() {

  //const [usuarios, setUsuarios] = useState([]);
  const [varShow, setVarShow] = useState(false);
  const [invisibleBotonActualizar, setInvisibleBotonActualizar] = useState(true);
  const [invisibleBotonInsertar, setInvisibleBotonInsertar] = useState(true);

  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [personalID, setPersonalID] = useState();
  const [correo, setCorreo] = useState();
  const [rol, setRol] = useState();
  const [estado, setEstado] = useState();
  const [canDatos, setCanDatos] = useState();

  const [userAutenti, setUserAutenti] = useState("");
  const [correoAutenti, setCorreoAutenti] = useState("bryan.garcia@correounivalle.edu.co");
  const [estadoAutenti, setEstadoAutenti] = useState("");
  const [rolAutenti, setRolAutenti] = useState("");

  const {user,isAuthenticated}= useAuth0();


  //Parte Graphql

  const { loading, error, data } = useQuery(GET_USERS);
  
  loading ? console.log("cargando") : console.log(data);

  const [
    createUser,
    {
      data: dataCrearUsuario,
      error: errorCrearUsario,
      loading: loadingCrearUsuario,
    },
  ] = useMutation(CREATE_USERS);

  const [
    deleteUser,
    {
      data: dataDeleteUsuario,
      error: errorDeleteUsario,
      loading: loadingDeleterUsuario,
    },
  ] = useMutation(DELETE_USERS);


  const [
    actualizarUser,
    {
      data: dataActualizarUsuario,
      error: errorActualizarUsario,
      loading: loadingActualizarUsuario,
    },
  ] = useMutation(UPDATE_USER);


  /*
  function Validar()  {

    const useremail= user['email'];
    console.log(user);
    console.log(useremail);

    //Validando datos del usuario autenticado
    const  {data: dataUsuarioEncontrado,error: errorUsuarioEncontrado,loading: loadingUsuarioEncontrado} =  useQuery(VALID_USER, {
    //variables: {correo:"lp@gmail.com"} 
    variables: {correo:useremail}
    });


    let vari;
    loadingUsuarioEncontrado ? console.log("cargando Usuario Buscado") : vari= dataUsuarioEncontrado['validarUsuario'].rol;
    //setEstadoAutenti(dataUsuarioEncontrado);
    return(vari)
  }
   
  */


  /*--------------------------------*/

  //Cuando hay un cambio en el dato mencionado se ejecuta la funcion interna
  useEffect(() => {
    //console.log("Datos cambiaron", dataDeleteUsuario);
  }, [dataDeleteUsuario]);


  const infoInicial = "Usuarios Almacenados en el sistema";

  let tipoUsuario =Validar()
  console.log(tipoUsuario)
  

  if(isAuthenticated){

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
              data.usuarios.map((datos) => (
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
                    <Button
                      key={datos.personalID}
                      className="btn btn-danger"
                      onClick={() => handlerEliminarUser(datos.personalID)}
                    >
                      Eliminar
                    </Button>{" "}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Button color="primary" onClick={() => handlerInsertarUsuario()}>
          Agregar Usuario
        </Button>{" "}

        <Button
          className="btn btn-danger"
          onClick={() => handlerActualizarPage()}
        >
          Actualizar
        </Button>{" "}

        <Button
          className="btn btn-danger"
          onClick={() => handlerSearch()}
        >
          Test
        </Button>

     

      </Container>

      <Modal isOpen={varShow}>
        <ModalHeader>
          <div>
            <h3>Datos Personaje</h3>
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
            <input
              className="form-control"
              name="rol"
              type="text"
              onChange={(e) => setRol(e.target.value)}
              placeholder={rol}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <input
              className="form-control"
              name="estado"
              type="text"
              onChange={(e) => setEstado(e.target.value)}
              placeholder={estado}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            color="primary"
            disabled={invisibleBotonInsertar}
            onClick={() => handlerCrearUsuario()}
          >
            Insertar
          </Button>

          <Button color="primary" disabled={invisibleBotonActualizar} onClick={() => handlerEnviarEditUser()}>
            Actualizar
          </Button>

      
          <Button
            className="btn btn-danger" onClick={() => handlerCerrarModal()}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );

}

else{

  return (<Forbiden/>)


}



  function handlerInsertarUsuario() {
    setInvisibleBotonActualizar(true);
    setInvisibleBotonInsertar(false);

    setVarShow(true);
    setCanDatos(data.usuarios.length + 1);
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

  function handlerCrearUsuario() {
    //console.log(varShow);
    //createUser( {variables: {nombre: "Martina",apellido:"Gutierres",correo:"gm@gmail.com",rol:"Estudiante",estado:"Pendiente"} })  ;
    createUser({
      variables: {
        nombre: nombre,
        apellido: apellido,
        personalID: personalID,
        correo: correo,
        rol: rol,
        estado: estado,
      },
    });

    setVarShow(false);
    alert("Usuario Creado");
    window.location.reload(false);
  }



  function handlerEliminarUser(keyValue) {
    console.log(typeof(keyValue));
    alert("Elimando a " + keyValue);

    deleteUser({
      variables: {
        personalID: keyValue,
      },
    });
    window.location.reload(false);
  }

  function handlerEditarUser(nom, apelli,personId,corr, role, estat) {
    setNombre(nom);
    setApellido(apelli);
    setPersonalID(personId);
    setCorreo(corr);
    setRol(role);
    setEstado(estat);
    alert("Editando a " + nom);
    setInvisibleBotonActualizar(false);
    setInvisibleBotonInsertar(true);
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
    window.location.reload(false);
    setVarShow(false);
  }


  function handlerActualizarPage() {
    window.location.reload(false);
  }

  function handlerSearch() {
/* 
    validando({
      variables: {
        correo: correoAutenti,
      },
    });
*/
  }



}

export default Usuarios;
