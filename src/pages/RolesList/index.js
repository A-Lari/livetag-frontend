import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";
import services from "../../services";
import Role from "../../components/Role";

import "./RolesList.css";

const Roleslist = () => {
  const [roles, setRoles] = useState([]);

  const search = () => {
    services
      .getRoles()
      .then((result) => {
        console.log(result);
        setRoles(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    search();
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
        <Button variant="primary">
            <Link className="bouton" to={`/roles/create`}>
                CREER
            </Link>
        </Button>
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
