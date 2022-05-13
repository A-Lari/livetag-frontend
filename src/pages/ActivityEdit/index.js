import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import services from "../../services";
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import dayjs from "dayjs";

function ActivityEdit() {
  const [body, setBody] = useState({
    activity_name: "",
    activity_date: "",
    description: "",
    price: "",
  });

  const navigate = useNavigate();

  let { idActivity } = useParams();

  function updateBody(key, value) {
    setBody({ ...body, [key]: value });
  }

  function handleFormChange(event) {
    const name = event.target.name; // activity_name
    const value = event.target.value;
    updateBody(name, value);
  }

  function handleSubmitActivity(event) {
    event.preventDefault();
    services
      .updateActivity(idActivity, body)
      .then(() => navigate("/activities"))
      .catch(() => alert("Une erreur a eu lieu pendant l'ajout"));
  }

  useEffect(() => {
    services
      .getActivitiesById(idActivity)
      .then((response) => {
        setBody(response);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col sm>
          <Card className="m-1 mb-2">
            <Card.Header as="h5" className="card-bg-color text-center">
              Modifier l'activité
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmitActivity} onChange={handleFormChange}>
                <Container>
                  <Row>
                    <Col sm>
                      <Form.Group className="mb-3" controlId="activity_name">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nom de l'activité"
                          name="activity_name"
                          defaultValue={body.activity_name}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group className="mb-3" controlId="activity_date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="activity_date"
                          value={dayjs(body.activity_date).format("YYYY-MM-DD")}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Prix</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="prix"
                          name="price"
                          defaultValue={body.price}
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
                          defaultValue={body.description}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <Button variant="warning" type="submit">
                        Modifier
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <Button
                        variant="dark"
                        type="submit"
                        className="mt-3"
                        onClick={() => navigate(`/activities`)}
                      >
                        retour
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ActivityEdit;
