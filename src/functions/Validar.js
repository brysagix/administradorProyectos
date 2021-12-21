import { useQuery } from "@apollo/react-hooks";
import { VALID_USER} from "../graphql/Queries";


export default function Validar()  {


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