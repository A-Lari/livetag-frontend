import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import services from "../../services";
import dayjs from "dayjs";

import "./EventEdit.css";

function EventEdit({
  idEvent,
  title,
  fetchEventData,
  setShowAddEvent,
  isCreate = false,
}) {
  const [body, setBody] = useState({
    event_name: "",
    start_date: "",
    end_date: "",
    place: "",
    description: "",
    code: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!isCreate) {
      services
        .getEventById(idEvent)
        .then((response) => {
          setBody(response);
        })
        .catch((error) => console.log(error));
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
      .then((result) => {
        setBody({
          event_name: "",
          start_date: "",
          end_date: "",
          place: "",
          description: "",
          code: "",
        });

        fetchEventData();
      })
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
      <Card.Header as="h5" className="card-bg-color text-center">
        {title}
      </Card.Header>
      <Card.Body>
        <Form
          onChange={handleFormChange}
          onSubmit={isCreate ? handleSubmitAddEvent : handleSubmitUpdateEvent}
        >
          <Container>
            <Row>
              <Col sm>
                <Form.Group className="mb-3" controlId="event_name">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nom de l'évènnement"
                    name="event_name"
                    value={body.event_name}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="place">
                  <Form.Label>Lieu</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Lieu de l'évènnement"
                    name="place"
                    value={body.place}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <Form.Group className="mb-3" controlId="start_date">
                  <Form.Label>Date de début</Form.Label>
                  <Form.Control
                    type="date"
                    name="start_date"
                    value={dayjs(body.start_date).format("YYYY-MM-DD")}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="end_date">
                  <Form.Label>Date de fin</Form.Label>
                  <Form.Control
                    type="date"
                    name="end_date"
                    value={dayjs(body.end_date).format("YYYY-MM-DD")}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={body.description}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {isCreate && (
              <Row>
                <Col sm className="text-center">
                  <Button variant="success" type="submit" className="mt-3">
                    Enregistrer
                  </Button>
                </Col>
              </Row>
            )}
            {!isCreate && (
              <Container>
                <Row>
                  <Col className="text-center">
                    <Button variant="warning" type="submit" className="mt-3">
                      MODIFIER
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <Button
                      variant="dark"
                      type="submit"
                      className="mt-3"
                      onClick={() => navigate(`/events`)}
                    >
                      retour
                    </Button>
                  </Col>
                </Row>
              </Container>
            )}
          </Container>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default EventEdit;
