import { useState } from "react";
import { Button, Container, Form, Card, Row, Col } from "react-bootstrap";
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
    services
      .addActivity(body)
      .then(() => navigate(0))
      .catch(() => alert("Une erreur a eu lieu pendant l'ajout"));
  }

  return (
    <Card className="m-1 mb-2">
      <Card.Header as="h5" className="card-bg-color text-center">
        Ajout d'une activité
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmitAddActivity} onChange={handleFormChange}>
          <Container>
            <Row>
              <Col sm>
                <Form.Group className="mb-3" controlId="activity_name">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nom de l'activité"
                    name="activity_name"
                    required
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3" controlId="activity_date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" name="activity_date" required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Prix</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="prix"
                    name="price"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="description de l'activité"
                    name="description"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Button variant="success" type="submit">
                  Ajouter
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ActivityAdd;
