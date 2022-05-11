import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import services from "../../services";

function ParticipantEdit({ idParticipant, title, isCreate = false }) {
  const [oneParticipant, setOneParticipant] = useState([
    {
      event: { _id: 0, event_name: "Evénement" },
      role: { _id: 0, role_name: "Rôle" },
    },
  ]);
  const [eventList, setEventList] = useState([]);
  const [roleList, setRoleList] = useState([]);

  const [selectRole, setSelectRole] = useState(false);

  useEffect(() => {
    if (!isCreate) {
      services
        .getParticipantById(idParticipant)
        .then((reponse) => {
          setOneParticipant(reponse);
        })
        .catch(console.log);
    }
  }, []);

  useEffect(() => {
    services
      .getEventFromDB()
      .then((reponse) => {
        setEventList(reponse);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    services
      .getRoles()
      .then((reponse) => {
        setRoleList(reponse);
        setSelectRole(true);
      })
      .catch(console.log);
  }, []);

  return (
    <Card className="m-3">
      <Card.Header as="h5">{title}</Card.Header>
      <Card.Body>
        <Form>
          <Container>
            <Row>
              <Col sm>
                <Form.Group className="mb-2" controlId="formFirstname">
                  <Form.Control
                    type="text"
                    placeholder="Prénom"
                    defaultValue={oneParticipant[0].firstname}
                  />
                </Form.Group>
              </Col>
              <Col sm>
                <Form.Group className="mb-2" controlId="formLastname">
                  <Form.Control
                    type="text"
                    placeholder="Nom"
                    defaultValue={oneParticipant[0].lastname}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    defaultValue={oneParticipant[0].email}
                  />
                </Form.Group>
              </Col>
              <Col sm>
                <Form.Group className="mb-3" controlId="formTelephone">
                  <Form.Control
                    type="text"
                    placeholder="Téléphone"
                    defaultValue={oneParticipant[0].telephone}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <Form.Select aria-label="formEvent">
                  <option>Evénements</option>
                  {eventList.map((event) => (
                    <option
                      key={event._id}
                      selected={event._id === oneParticipant[0].event._id}
                    >
                      {event.event_name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col sm>
                {selectRole && (
                  <Form.Select aria-label="formRole">
                    <option>Rôle</option>
                    {roleList.map((role) => (
                      <option
                        key={role._id}
                        selected={role._id === oneParticipant[0].role._id}
                      >
                        {role.role_name}
                      </option>
                    ))}
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
                {isCreate && (
                  <Button variant="primary" type="submit" className="mt-3">
                    Enregistrer
                  </Button>
                )}
                {!isCreate && (
                  <Button variant="warning" type="submit" className="mt-3">
                    Modifier
                  </Button>
                )}
              </Col>
            </Row>
          </Container>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ParticipantEdit;
