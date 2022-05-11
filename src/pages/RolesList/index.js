import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Button, Accordion } from "react-bootstrap";
import services from "../../services";
import Role from "../../components/Role";
import CreateRole from "../CreateRole";

import "./RolesList.css";

const Roleslist = () => {
  const [roles, setRoles] = useState([]);

  const search = (idEvent) => {
    services
      .getRoles(idEvent)
      .then((result) => {
        console.log(result);
        setRoles(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
    <Container>
      <h2>Les roles</h2>
      <Row>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header><Button variant="primary">Ajouter un nouveau role</Button></Accordion.Header>
            <Accordion.Body>
              <CreateRole/>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>      
      </Row>
      <Row>
        {roles.map((role) => (
          <Role key={role._id} {...role} />
        ))}
      </Row>
    </Container>
  );  
};

export default Roleslist;
