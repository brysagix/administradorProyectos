import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USERS_STUDENTS,VALID_USER,GET_USERS} from "../graphql/Queries";


export default function ExtraerDatosUser()  {

    let datosPerfil = new Object();
    let vari;

    const useremail= localStorage.getItem("correo");

    //Validando datos del usuario autenticado
    const  {data: dataUsuarioEncontrado,error: errorUsuarioEncontrado,loading: loadingUsuarioEncontrado} =  useQuery(VALID_USER, {
    //variables: {correo:"lp@gmail.com"} 
    variables: {correo:localStorage.getItem("correo")}
    });

    loadingUsuarioEncontrado ? console.log("cargando Usuario Buscado") : vari=dataUsuarioEncontrado['validarUsuario'];

    if(vari!=null){
      console.log("Datos reloaded");
      console.log(vari.rol);

      datosPerfil['nombre'] = vari.nombre;
      datosPerfil['apellido'] = vari.apellido;
      datosPerfil['correo'] = vari.correo;
      datosPerfil['personalID'] = vari.personalID;
      datosPerfil['rol'] = vari.rol;
      datosPerfil['estado'] = vari.estado;
      return(datosPerfil);
  }

    else{return("")}
    
  }