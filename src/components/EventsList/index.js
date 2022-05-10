import "./EventsList.css";
import services from "../../services";
import { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import dayjs from "dayjs";

function Eventslist({ events, setEvents }) {
  function fetchEventData() {
    services
      .getEventFromDB()
      .then((list) => {
        console.log(list);
        setEvents(list);
      })
      .catch((error) => {
        console.log("Error list events", error);
        alert("La liste des events ne peut êtrea affichée");
      });
  }

  useEffect(() => {
    fetchEventData();
  }, []);

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Description</th>
          <th>Lieu</th>
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>Etat</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event._id}>
            <td>{event.event_name}</td>
            <td>{event.description}</td>
            <td>{event.place}</td>
            <td>{dayjs(event.start_date).format("DD/MM/YY")}</td>
            <td>{dayjs(event.end_date).format("DD/MM/YY")}</td>
            <td>
              <Button variant="outline-warning">Modifier</Button>
              <Button variant="outline-danger">Supprimer</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Eventslist;
