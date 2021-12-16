import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Modal,
  ModalBody,
  Table,
} from "react-bootstrap";

import { GET_CHARACTERS } from "../../graphql/Queries.js";
import { useQuery } from "@apollo/react-hooks";


const datos = [
  { id: 1, personaje: "Naruto", anime: "Naruto" },
  { id: 2, personaje: "Goku", anime: "Dragon Ball" },
  { id: 3, personaje: "Kenshin Himura", anime: "Rurouni Kenshin" },
  { id: 4, personaje: "Monkey D. Luffy", anime: "One Piece" },
  {
    id: 5,
    personaje: "Edward Elric",
    anime: "Fullmetal Alchemist: Brotherhood",
  },
  { id: 6, personaje: "Seto Kaiba", anime: "Yu-Gi-Oh!" },
];



function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  //const { loading, error, data } = useQuery(GET_CHARACTERS);
  const { loading, error, data } = useQuery(GET_USERS);

  loading
    ? console.log("cargando")
    : console.log(data.characters.results);

  const saludo = "Prueba dato almacenado";

  return (
    <Container>
   
   {saludo}

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Personaje</th>
          </tr>
        </thead>

        <tbody>
          {data && data.characters.results.map((datos) => (
            <tr key={datos.name}>
              <td>{datos.name}</td>
              <td>{datos.name}</td>
              <td>
                <Button
                  color="primary"
                  onClick={() => this.mostrarModalActualizar(datos)}
                >
                  Editar
                </Button>{" "}
                <Button color="danger" onClick={() => this.eliminar(datos)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Usuarios;
