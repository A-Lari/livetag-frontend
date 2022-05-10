import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import services from "../../services";

function EventsAdd() {
  const [body, setBody] = useState({
    event_name: "",
    start_date: "",
    end_date: "",
    place: "",
    description: "",
    code: "",
  });

  const navigate = useNavigate();

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
    console.log(body);
    services
      .addEvents(body)
      .then(() => navigate("/"))
      .catch(() => alert("Une erreur a eu lieu pendant l'ajout"));
  }

  return (
    <div>
      <h1>Ajouter un évènnement</h1>
      <Container>
        <Form onSubmit={handleSubmitAddEvent} onChange={handleFormChange}>
          <Form.Group className="mb-3" controlId="event_name">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom de l'évènnement"
              name="event_name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="start_date">
            <Form.Label>Date de début</Form.Label>
            <Form.Control type="date" name="start_date" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="end_date">
            <Form.Label>Date de fin</Form.Label>
            <Form.Control type="date" name="end_date" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="place">
            <Form.Label>Lieu</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lieu de l'évènnement"
              name="place"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              name="description"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="code">
            <Form.Label>Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Votre code"
              name="code"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Ajouter
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default EventsAdd;
