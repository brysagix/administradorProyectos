import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_USERS_STUDENTS,VALID_USER,GET_USERS} from "../graphql/Queries";


export default function Validar()  {

    const useremail= localStorage.getItem("correo");

    //Validando datos del usuario autenticado
    const  {data: dataUsuarioEncontrado,error: errorUsuarioEncontrado,loading: loadingUsuarioEncontrado} =  useQuery(VALID_USER, {
    //variables: {correo:"lp@gmail.com"} 
    variables: {correo:localStorage.getItem("correo")}
    });

    let vari;
    loadingUsuarioEncontrado ? console.log("cargando Usuario Buscado") : vari=dataUsuarioEncontrado['validarUsuario'];

    if(vari!=null){
      console.log("Datos reloaded");
      console.log(vari.rol);
      return(vari.rol);
  }

    else{return(vari)}
    
  }