import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEvent } from "../../EventInUse";
import services from "../../services";
import "./ParticipantEdit.css";

function ParticipantEdit({ idParticipant, title, isCreate = false }) {
  // #region
  const { event } = useEvent();
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
    optional_activities: [],
  });
  const [roleList, setRoleList] = useState([]);

  const navigate = useNavigate();

  function fecthAndSetListRoles(eventId) {
    console.log(eventId);
    services.getRoles(eventId).then((reponse) => {
      setRoleList(reponse);
    });
  }

  useEffect(() => {
    if (!isCreate) {
      services
        .getParticipantById(idParticipant)
        .then((reponse) => {
          setOneParticipant(reponse);
          setBody({
            ...reponse,
            event: reponse.event._id,
            role: reponse.role._id,
            optional_activities: reponse.optional_activities,
          });
        })
        .catch(console.log);
    }
    fecthAndSetListRoles(event._id);
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
    services.createParticipant(body).then(() => navigate(0));
  }

  function handleUpdate(event) {
    event.preventDefault();
    services.updateParticipant(idParticipant, body).then(() => {
      navigate("/participants");
      alert("Participant modifié");
    });
  }
  // #endregion
  return (
    <Card className="m-1 mb-2">
      <Card.Header as="h5" className="card-bg-color text-center">
        {title}
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
                    defaultValue={oneParticipant.firstname}
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
                    defaultValue={oneParticipant.lastname}
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
                    defaultValue={oneParticipant.email}
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
                    defaultValue={oneParticipant.telephone}
                    value={oneParticipant.telephone}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <Form.Group className="mb-3" controlId="formEvenemt">
                  <Form.Label>Rôle</Form.Label>
                  <Form.Control as="select" name="role">
                    <option>Rôle</option>
                    {roleList.map((role) => (
                      <option
                        key={role._id}
                        selected={role._id === oneParticipant.role._id}
                        defaultValue={role._id}
                      >
                        {role.role_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {isCreate && (
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
            )}
            {!isCreate && (
              <Container>
                <Row>
                  <Col className="text-center">
                    <Button
                      variant="warning"
                      type="submit"
                      className="mt-3"
                      onClick={handleUpdate}
                    >
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
                      onClick={() => navigate(`/participants`)}
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

export default ParticipantEdit;
