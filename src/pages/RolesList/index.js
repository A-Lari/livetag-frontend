import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Accordion } from "react-bootstrap";
import services from "../../services";
import Role from "../../components/Role";
import CreateRole from "../CreateRole";

import "./RolesList.css";

const Roleslist = () => {
  const [roles, setRoles] = useState([]);
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
    search("627900a483fb6b651f2ea81e");
  }, []);

  /*return (
    <div className="roles">
      <p>ROLES LIST PAGE</p>
      <p>{JSON.stringify(roles, null, 2)}</p>
    </div>
  );*/

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
          <Role key={role._id} {...role} />
        ))}
      </Row>
    </Container>
  );
};

export default Roleslist;
