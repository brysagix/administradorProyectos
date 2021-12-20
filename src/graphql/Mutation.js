import {gql} from "apollo-boost"

export const CREATE_USERS = gql`

mutation createUser ($nombre:String!,$apellido:String!,$personalID:Int!,$correo:String!,$rol:String!,$estado:String!){ 
    createUser(
      nombre: $nombre,
      apellido:$apellido,
      personalID:$personalID,
      correo: $correo,
        rol:$rol,
        estado:$estado,
    )
      {
        _id
      }
    }
`;


export const DELETE_USERS = gql`
mutation deleteUser ($personalID:Int!){ 
  deleteUser(
    personalID: $personalID
  )
    {
      _id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation actualizarUser ($nombre:String!,$apellido:String!,$personalID:Int!,$correo:String!,$rol:String!,$estado:String!){ 
    actualizarUser(
      nombre:$nombre 
      apellido:$apellido 
      personalID:$personalID
      correo:$correo 
      rol:$rol 
      estado:$estado
      )
  {
    _id
  }
  }
`;


export const CREATE_PROJECT = gql`
mutation createProject ($nombre:String!,$iPrincipal:String!,$investigadores:[String!],$objPrincipal:String!,$objSecundario:[String!],$estado:String!,$presupuesto:Int!,$avances:[String!],$habilitado:String!){ 
  createProject(
    nombre: $nombre,
    iPrincipal:$iPrincipal,
    investigadores:$investigadores,
    objPrincipal: $objPrincipal,
    objSecundario:$objSecundario,
    estado:$estado,
    presupuesto:$presupuesto,
    avances:$avances,
    habilitado:$habilitado
  )
    {
      _id
    }
  }
`;


export const DELETE_PROJECT = gql`
mutation deleteProject ($nombre:String!){ 
  deleteProject(
    nombre: $nombre
  )
    {
      _id
    }
  }
`;


export const UPDATE_PROJECT = gql`
  mutation actualizarProject ($nombre:String!,$iPrincipal:String!,$investigadores:[String!],$objPrincipal:String!,$objSecundario:[String!],$estado:String!,$presupuesto:Int!,$avances:[String!],$habilitado:String!){ 
    actualizarProject(
      nombre: $nombre,
      iPrincipal:$iPrincipal,
      investigadores:$investigadores,
      objPrincipal: $objPrincipal,
      objSecundario:$objSecundario,
      estado:$estado,
      presupuesto:$presupuesto,
      avances:$avances,
      habilitado:$habilitado
      )
  {
    _id
  }
  }
`;


export const DELETE_INSCRIPCION = gql`
mutation deleteInscription ($nombre:String!,$proyecto:String!){ 
  deleteInscription(
    nombre: $nombre,
    proyecto:$proyecto
  )
    {
      _id
    }
  }
`;

export const CREATE_INSCRIPCION = gql`
mutation createInscription ($nombre:String!,$apellido:String!,$idEstudiante:Int!,$proyecto:String!,$estadoSolicitud:String!){ 

  createInscription(
    nombre: $nombre,
    apellido:$apellido,
    idEstudiante:$idEstudiante,
    proyecto: $proyecto,
    estadoSolicitud:$estadoSolicitud,
  )
    {
      _id
    }
  }
`;

export const UPDATE_INSCRIPCION = gql`
  mutation actualizarInscripcion ($nombre:String!,$proyecto:String!,$estadoSolicitud:String!){ 
    actualizarInscripcion(
      nombre:$nombre,
      proyecto:$proyecto,
      estadoSolicitud:$estadoSolicitud
      )
  {
    _id
  }
  }
`;

export const UPDATE_INVESTI = gql`
  mutation agregarInvestigador ($nombre:String!,$estudianteAgregado:String!){ 
    agregarInvestigador(
      nombre:$nombre,
      estudianteAgregado:$estudianteAgregado,
      )
  {
    _id
  }
  }
`;

export const ADD_AVANCE = gql`
  mutation agregarAvance ($nombre:String!,$avances:String!){ 
    agregarAvance(
      nombre:$nombre,
      avances:$avances,
      )
  {
    _id
  }
  }
`;

export const DELETE_AVANCE = gql`
  mutation deleteAvance ($nombre:String!,$avances:String!){ 
    deleteAvance(
      nombre:$nombre,
      avances:$avances
      )
  {
    _id
  }
  }
`;


export const EDIT_AVANCE = gql`
  mutation editAvance ($nombre:String!,$avances:String!,$nuevoAvance:String!){ 
    editAvance(
      nombre:$nombre,
      avances:$avances,
      nuevoAvance:$nuevoAvance
      )
  {
    _id
  }
  }
`;


export const ADD_OBSERVATION = gql`
  mutation createObservacion ($datoRegistrado: String!, $autor: String!, $avance: String!, $proyectoNombre: String!){ 
    createObservacion(
      datoRegistrado: $datoRegistrado, 
      autor: $autor, 
      avance: $avance, 
      proyectoNombre: $proyectoNombre
      )
  {
    _id
  }
  }
`;


export const DELETE_OBSERVATION = gql`
  mutation deleteObservacion ($datoRegistrado: String!, $autor: String!){ 
    deleteObservacion(
      datoRegistrado: $datoRegistrado, 
      autor: $autor, 
      )
  {
    _id
  }
  }
`;



  



  