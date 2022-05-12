import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Card, Col } from "react-bootstrap";
import { useNavigate, history } from "react-router-dom";
import services from "../../services";
import("./Role.css");

export default function Role(role) {
  const navigate = useNavigate();

  const deleteRole = (idRole) => {
    console.log("==> deleteRole", idRole);
    services
      .deleteRole(idRole)
      .then((response) => {
        console.log(response);
        navigate(0);
      })
      .catch(console.log);
  };

  return (
    <Col>
      <Card style={{ width: "20rem" }}>
        <Card.Body>
          <Card.Title>{role.role_name}</Card.Title>
          <ul class="list-group">
            {role.activities.map((activity) => (
              <li key={activity._id} class="list-group-item">{activity.activity_name}</li>
            ))}
          </ul>          
          <Button variant="primary">
            <Link className="bouton" to={`/roles/${role._id}`}>
              Editer
            </Link>
          </Button>
          <Button onClick={() => deleteRole(role._id)} variant="success">
            Supprimer
          </Button>   
        </Card.Body>
      </Card>
    </Col>
  );
}
