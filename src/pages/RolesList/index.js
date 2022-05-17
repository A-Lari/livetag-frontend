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
    <Container className="m-4" fluid="xl">
      <hr />
      <Container>
        <Row className="justify-content-center">
          <Col sm>
            <Row className="justify-content-center">
              <Col sm>
                <h3 className="text-center">ROLES</h3>
              </Col>
              <Col sm className="text-center">
                <Button
                  onClick={handleAddButton}
                  className="btn-success btn-xs"
                >
                  +
                </Button>
              </Col>
            </Row>
          </Col>{" "}
        </Row>
      </Container>
      {showAddRole && (
        <Container>
          <Row className="justify-content-center">
            <Col sm>
              <CreateRole />
            </Col>
          </Row>
        </Container>
      )}
      <hr />
      <Row className="justify-content-center">
        {roles.map((role) => (
          <Role key={role._id} role={role} />
        ))}
      </Row>
    </Container>
  );
};

export default Roleslist;
