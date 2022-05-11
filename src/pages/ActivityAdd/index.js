import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import services from "../../services";

function ActivityAdd() {
  const [body, setBody] = useState({
    activity_name: "",
    activity_date: "",
    description: "",
    price: "",
    event: "627900a483fb6b651f2ea81e",
  });

  const navigate = useNavigate();

  function updateBody(key, value) {
    // Il faut toujours faire une copie du state qu'on veut modifier si c'est un objet
    // objet = {  } ou [ ]
    setBody({ ...body, [key]: value });
  }

  function handleFormChange(event) {
    const name = event.target.name; // activity_name
    const value = event.target.value;
    updateBody(name, value);
  }

  function handleSubmitAddActivity(event) {
    event.preventDefault();
    console.log(body);
    services
      .addActivity(body)
      .then(() => navigate(0))
      .catch(() => alert("Une erreur a eu lieu pendant l'ajout"));
  }

  return (
    <div>
      <h3>Ajouter une activité</h3>
      <Container>
        <Form onSubmit={handleSubmitAddActivity} onChange={handleFormChange}>
          <Form.Group className="mb-3" controlId="activity_name">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom de l'activité"
              name="activity_name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="activity_date">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="activity_date" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="description de l'activité"
              name="description"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Prix</Form.Label>
            <Form.Control
              type="text"
              placeholder="prix"
              name="price"
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

export default ActivityAdd;
