
db.usuarios.insertOne(
    
{
"nombre":"Pedro",
"apellido":"Perez",
"correo":"bgarcia@unicatolica.edu.co",
"lineasInvestigación":["Robótica","IA"],
"rol":"estudiante",
"proyectoAsociado":["Malta","Pet"],
"estado":"Pendiente",
},


{
    "nombre":"Bryan",
    "apellido":"García",
    "correo":"bryan.garcia@correounivalle.edu.co",
    "lineasInvestigación":["Robótica","IA"],
    "rol":"Administrador",
    "proyectoAsociado":["Malta"],
    "estado":"Autorizado",
    },

    {
        "nombre":"Rosa",
        "apellido":"Libreros",
        "correo":"relib@correounivalle.edu.co",
        "lineasInvestigación":["Robótica","IA"],
        "rol":"estudiante",
        "proyectoAsociado":["Mano robótica","Brazo robótico"],
        "estado":"Autorizado",
        },

)




db.proyecto.insertOne(
    
    {
    "Id_proyecto":1,
    "nombre":"Mano robótica",
    "iPrincipal":"Bryan García",
    "investigadores":["Rosa Libreros"],
    "objPrincipal":"Desarrollar una mano robotica para control de procesos",
    "objSecundario":["Identificar requerimientos mano robotica","Implementación hardware","Implementación software"],
    "estado":"En desarrollo",
    "avances":["Levantamiento requisitos"],
    "presupuesto":100000000
    },

      
    {
        "Id_proyecto":2,
        "nombre":"Brazo robótico",
        "iPrincipal":"Bryan García",
        "investigadores":["Rosa Libreros"],
        "objPrincipal":"Desarrollar un brazo robotico para control de procesos",
        "objSecundario":["Identificar requerimientos brazo robotico","Implementación hardware","Implementación software"],
        "estado":"Terminado",
        "avances":["Levantamiento requisitos","Implementación","Entrega"],
        "presupuesto":200000000
        },

    )
    