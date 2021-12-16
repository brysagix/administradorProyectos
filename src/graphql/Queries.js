import {gql} from "apollo-boost"

export const GET_USERS = gql`
query{usuarios{nombre,apellido,personalID,rol,correo,estado}}
`;

export const GET_USERS_STUDENTS = gql`
query{usuariosEstudiante{nombre,apellido,personalID,rol,correo,estado}}
`;

export const VALID_USER = gql`
query validarUsuario ($correo: String!)
{validarUsuario(correo:$correo)
  {nombre,apellido,personalID,estado,rol,correo}
}
`;

export const GET_PROJECTS = gql`
query{proyectos{nombre,iPrincipal,investigadores,objPrincipal,objSecundario,estado,presupuesto,,habilitado}}
`;

export const GET_PROJECTS_LIDER = gql`
query proyectosLider ($iPrincipal: String!)
{proyectosLider(iPrincipal:$iPrincipal)
  {nombre,iPrincipal,investigadores,objPrincipal,objSecundario,estado,presupuesto,,habilitado,avances}
}
`;

export const GET_INSCRIPCIONES = gql`
query{inscripciones{nombre,apellido,idEstudiante,proyecto,estadoSolicitud}}
`;


export const GET_PROJECTS_AVANCES = gql`
query{proyectos{nombre,avances}}
`;

export const GET_ONE_PROJECTS_AVANCES = gql`
query avancesNombreProyecto ($nombre: String!)
{avancesNombreProyecto(nombre:$nombre)
  {nombre,avances}
}
`;

export const GET_OBSERVACIONES_BY_AVANCE = gql`
query observacionesByAvance ($avance: String!)
{observacionesByAvance(avance:$avance)
  {datoRegistrado,autor,avance,proyectoNombre}
}
`;

export const GET_PROJECTS_BY_ALUMNO = gql`
query proyectosEstudiante ($investigadores: String!)
{proyectosEstudiante(investigadores:$investigadores)
  {nombre,iPrincipal,objPrincipal,objSecundario,avances}
}
`;