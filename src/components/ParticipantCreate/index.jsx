import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

function ParticipantCreate() {
  const [selectRole, setSelectRole] = useState(false);

  return (
    <Card>
      <Card.Header as="h5">Ajout d'un participant</Card.Header>
      <Card.Body>
        <Form>
          <Container>
            <Row>
              <Col sm>
                <Form.Group className="mb-2" controlId="formFirstname">
                  <Form.Control type="text" placeholder="Prénom" />
                </Form.Group>
              </Col>
              <Col sm>
                <Form.Group className="mb-2" controlId="formLastname">
                  <Form.Control type="text" placeholder="Nom" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Control type="email" placeholder="Email" />
                </Form.Group>
              </Col>
              <Col sm>
                <Form.Group className="mb-3" controlId="formTelephone">
                  <Form.Control type="text" placeholder="Téléphone" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <Form.Select aria-label="formEvent">
                  <option value="0">Evénements</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Col>
              <Col sm>
                {selectRole && (
                  <Form.Select aria-label="formRole">
                    <option>Rôle</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                )}
                {!selectRole && (
                  <Form.Select aria-label="formRole" disabled>
                    <option>Rôle</option>
                  </Form.Select>
                )}
              </Col>
            </Row>
            <Row>
              <Col sm>
                <Button variant="primary" type="submit" className="mt-3">
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

export default ParticipantCreate;
