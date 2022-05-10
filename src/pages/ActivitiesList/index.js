import { Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col } from "react-bootstrap";
import services from "../../services";
import "./ActivitiesList.css";

export default function ActivitiesList() {
  const [activities, setActivities] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const search = (searchActivities) => {
    services
      .getActivities(searchActivities)
      .then((result) => {
        console.log(result);
        setActivities(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      search("");
    }
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    search(inputValue);
  };

  useEffect(() => {
    search("");
  }, []);

  return (
    <Container>
      <h2>Les Activités</h2>

      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <form className="d-flex" onSubmit={handleSubmitSearch}>
            <input
              className="form-control me-2"
              type="search"
              onChange={handleSearchChange}
              value={inputValue}
              placeholder="Activités..."
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              {" "}
              Rechercher une activité
            </button>
          </form>
        </div>
      </nav>

      <Row>
        {activities.map((activity) => (
          <Card className="itemActivities">
            <Card.Body>
              <Card.Title>{activity.activity_name}</Card.Title>
              <div>
                <p>Date : {activity.activity_date}</p>
              </div>

              <Card.Text>Description : {activity.description}</Card.Text>

              <Card.Text>Prix : {activity.price}</Card.Text>
            </Card.Body>
            <Button variant="primary" style={{ width: "20%" }}>
              <Link className="boutonvoir" to={`/activities/${activity._id}`}>
                VOIR L'ACTIVITE
              </Link>
            </Button>
          </Card>
        ))}
      </Row>
    </Container>
  );
}
