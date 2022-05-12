import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import services from "../../services";
import dayjs from "dayjs";

import "./EventEdit.css";

function EventEdit({ idEvent, title, isCreate = false }) {
  const [body, setBody] = useState({
    event_name: "",
    start_date: "",
    end_date: "",
    place: "",
    description: "",
    code: "",
  });

  const navigate = useNavigate();

  console.log("idEvent", idEvent);

  useEffect(() => {
    if (!isCreate) {
      services
        .getEventById(idEvent)
        .then((response) => {
          console.log("Yep", response);
          setBody(response);
        })
        .catch(console.log);
    }
  }, []);

  function updateBody(key, value) {
    // Il faut toujours faire une copie du state qu'on veut modifier si c'est un objet
    // objet = {  } ou [ ]
    setBody({ ...body, [key]: value });
  }

  function handleFormChange(event) {
    const name = event.target.name; // event_name
    const value = event.target.value; // Course a pied
    updateBody(name, value);
  }

  function handleSubmitAddEvent(event) {
    event.preventDefault();
    services
      .addEvents(body)
      .then(() => navigate(0))
      .catch(() => alert("Une erreur a eu lieu pendant l'ajout"));
  }

  function handleSubmitUpdateEvent(event) {
    event.preventDefault();
    services
      .updateEvent(idEvent, body)
      .then(() => navigate("/events"))
      .catch(() => alert("Une erreur a eu lieu pendant la modification"));
  }

  return (
    <Card className="m-1 mb-2">
      <Card.Header as="h5" className="card-bg-color">
        {title}
      </Card.Header>
      <Card.Body>
        <Form onChange={handleFormChange}>
          <Form.Group className="mb-3" controlId="event_name">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom de l'évènnement"
              name="event_name"
              defaultValue={body.event_name}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="start_date">
            <Form.Label>Date de début</Form.Label>
            <Form.Control
              type="date"
              name="start_date"
              value={dayjs(body.start_date).format("YYYY-MM-DD")}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="end_date">
            <Form.Label>Date de fin</Form.Label>
            <Form.Control
              type="date"
              name="end_date"
              value={dayjs(body.end_date).format("YYYY-MM-DD")}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="place">
            <Form.Label>Lieu</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lieu de l'évènnement"
              name="place"
              defaultValue={body.place}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              name="description"
              defaultValue={body.description}
              required
            />
          </Form.Group>

          {isCreate && (
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmitAddEvent}
            >
              Ajouter
            </Button>
          )}
          {!isCreate && (
            <Button
              variant="outline-warning"
              type="submit"
              onClick={handleSubmitUpdateEvent}
            >
              Modifier
            </Button>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}

export default EventEdit;
