import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Accordion } from "react-bootstrap";
import services from "../../services";
import Role from "../../components/Role";
import CreateRole from "../CreateRole";

import "./RolesList.css";
import { useEvent } from "../../EventInUse";

const Roleslist = () => {
  const [roles, setRoles] = useState([]);
  const { eventSelect } = useEvent();
  const [showAddRole, setShowAddRole] = useState(false);

  function handleAddButton() {
    setShowAddRole((currentState) => !currentState);
  }

  const search = (idEvent) => {
    services
      .getRoles(idEvent)
      .then((result) => {
        setRoles(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    search(localStorage.getItem("idEvent"));
  }, []);

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col sm className="m-4">
          <h3>LISTE DES ROLES</h3>
        </Col>
        <Col sm className="m-4 text-right">
          <Button onClick={handleAddButton} class="button-bg-color">
            Ajouter
          </Button>
        </Col>
      </Row>
      {showAddRole && (
        <Row className="justify-content-center">
          <Col sm>
            <CreateRole />
          </Col>
        </Row>
      )}
      <Row className="justify-content-center">
        {roles.map((role) => (
          <Role key={role._id} role={role} />
        ))}
      </Row>
    </Container>
  );
};

export default Roleslist;
