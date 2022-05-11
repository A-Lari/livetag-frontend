import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import services from "../../services";

function ParticipantEdit({ idParticipant, title, isCreate = false }) {
  const [oneParticipant, setOneParticipant] = useState({
    event: { _id: 0, event_name: "" },
    role: { _id: 0, role_name: "" },
  });
  const [body, setBody] = useState({
    firstname: "",
    lastname: "",
    email: "",
    telephone: "",
    event: null,
    role: null,
    optional_activities: null,
  });
  const [eventList, setEventList] = useState([]);
  const [roleList, setRoleList] = useState([]);

  const [selectRole, setSelectRole] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCreate) {
      services
        .getParticipantById(idParticipant)
        .then((reponse) => {
          setOneParticipant(reponse);
          setBody(reponse);
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
    services.createParticipant().then(() => navigate(0));
    console.log("Create participant :", body);
  }

  function handleUpdate(event) {
    event.preventDefault();
    console.log("Modify participant :", body);
  }

  return (
    <Card className="m-3">
      <Card.Header as="h5">{title}</Card.Header>
      <Card.Body>
        <Form onChange={handleFormChange}>
          <Container>
            <Row>
              <Col sm>
                <Form.Group className="mb-2" controlId="formFirstname">
                  <Form.Control
                    type="text"
                    placeholder="Prénom"
                    name="firstname"
                    defaultValue={oneParticipant.firstname}
                  />
                </Form.Group>
              </Col>
              <Col sm>
                <Form.Group className="mb-2" controlId="formLastname">
                  <Form.Control
                    type="text"
                    placeholder="Nom"
                    name="lastname"
                    defaultValue={oneParticipant.lastname}
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
                    name="email"
                    defaultValue={oneParticipant.email}
                  />
                </Form.Group>
              </Col>
              <Col sm>
                <Form.Group className="mb-3" controlId="formTelephone">
                  <Form.Control
                    type="text"
                    placeholder="Téléphone"
                    name="telephone"
                    defaultValue={oneParticipant.telephone}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <Form.Select aria-label="formEvent" name="event">
                  <option>Evénements</option>
                  {eventList.map((event) => (
                    <option
                      key={event._id}
                      selected={event._id === oneParticipant.event._id}
                      value={event._id}
                    >
                      {event.event_name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col sm>
                {selectRole && (
                  <Form.Select aria-label="formRole" name="role">
                    <option>Rôle</option>
                    {roleList.map((role) => (
                      <option
                        key={role._id}
                        selected={role._id === oneParticipant.role._id}
                        value={role._id}
                      >
                        {role.role_name}
                      </option>
                    ))}
                  </Form.Select>
                )}
                {!selectRole && (
                  <Form.Select aria-label="formRole" name="role" disabled>
                    <option>Rôle</option>
                  </Form.Select>
                )}
              </Col>
            </Row>
            <Row>
              <Col sm>
                {isCreate && (
                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-3"
                    onClick={handleCreate}
                  >
                    Enregistrer
                  </Button>
                )}
                {!isCreate && (
                  <Button
                    variant="warning"
                    type="submit"
                    className="mt-3"
                    onClick={handleUpdate}
                  >
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
