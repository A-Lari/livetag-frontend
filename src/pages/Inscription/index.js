import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import services from "../../services";
import "./Inscription.css";

function Inscription() {

  //TODO tester le referer si possible et voir comment proteger avec les cookies ou autres?
  var referrer = document.referrer;
  console.log("referrer url",referrer);

  let { id } = useParams();
  console.log(id);

  const [body, setBody] = useState({
    firstname: "",
    lastname: "",
    email: "",
    telephone: "",
    event: null,
    role: null,
    optional_activities: [],
  });

  const navigate = useNavigate();

  useEffect(() => {

  }, []);

  function updateBody(key, value) {
    setBody({ ...body, [key]: value });
  }
  function handleFormChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    updateBody(name, value);
  }

  function handleCreate(event) {
    event.preventDefault();
    //services.createInscription(body).then(() => navigate(0));
  }

  // #endregion
  return (
    <Card className="m-1 mb-2">
      <Card.Header as="h5" className="card-bg-color text-center">
        INSCRIPTION POUR le ROLE XXXX
      </Card.Header>
      <Card.Body>
        <Form onChange={handleFormChange}>
          <Container>
            <Row>
              <Col sm>
                <Form.Group className="mb-2" controlId="formFirstname">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Prénom"
                    name="firstname"
                  />
                </Form.Group>
              </Col>
              <Col sm>
                <Form.Group className="mb-2" controlId="formLastname">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nom"
                    name="lastname"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                  />
                </Form.Group>
              </Col>
              <Col sm>
                <Form.Group className="mb-3" controlId="formTelephone">
                  <Form.Label>Téléphone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Téléphone"
                    name="telephone"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm className="text-center">
                <Button
                  variant="success"
                  type="submit"
                  className="mt-3"
                  onClick={handleCreate}
                >
                  Enregistrer
                </Button>
              </Col>
            </Row>

          </Container>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Inscription;
