import { useEffect } from "react";
import { Link } from "react-router-dom";

import services from "../../services";

import { Table, Button, Nav, Badge } from "react-bootstrap";

function ParticipantsList({ listParticipants, setListParticipants }) {
  function fecthAndSetListParticipant() {
    services
      .getAllParticipants()
      .then((list) => {
        setListParticipants(list);
      })
      .catch((error) => {
        console.log("Error list participants", error);
        alert("La liste des participants ne peut être affichée");
      });
  }
  function deleteParticipant(participant) {
    services
      .deleteParticipant(participant._id)
      .then(() => {
        fecthAndSetListParticipant();
        alert("Participant supprimé");
      })
      .catch((error) => {
        console.log("Error delete participant", error);
        alert("La liste des participants ne peut être affichée");
      });
  }

  useEffect(() => {
    fecthAndSetListParticipant();
  }, []);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Rôle</th>
          <th>Evénement</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {listParticipants.map((participant) => (
          <tr key={participant._id}>
            <td>{participant.firstname}</td>
            <td>{participant.lastname}</td>
            <td>{participant.email}</td>
            <td>{participant.telephone}</td>
            <td>{participant.role.role_name}</td>
            <td>{participant.event.event_name}</td>
            <td>
              <Nav>
                <Nav.Item>
                  <Button variant="outline-warning">
                    <Nav.Link href={`/participants/${participant._id}`}>
                      {" "}
                      <Badge bg="warning" text="dark">
                        détails
                      </Badge>{" "}
                    </Nav.Link>
                  </Button>
                </Nav.Item>
              </Nav>
              <Button
                variant="outline-danger"
                onClick={() => deleteParticipant(participant)}
              >
                <Badge bg="danger" text="white">
                  supprimer
                </Badge>{" "}
              </Button>
            </td>
          </tr>
        ))}
        <tr></tr>
      </tbody>
    </Table>
  );
}

export default ParticipantsList;
