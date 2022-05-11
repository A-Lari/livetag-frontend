import { Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import services from "../../services";
import ActivityAdd from "../ActivityAdd";
import "./ActivitiesList.css";

export default function ActivitiesList() {
  const [activities, setActivities] = useState([]);
  const [inputTitle, setInputTitle] = useState("");

  const navigate = useNavigate();

  //liste des activités via dB
  const search = (idEvent) => {
    services
      .getActivities(idEvent)
      .then((result) => {
        console.log(result);
        setActivities(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //chercher une activité dans la liste
  const handleSearchChange = (e) => {
    setInputTitle(e.target.value);
    if (e.target.value === "") {
      search("");
    }
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    search(inputTitle);
  };

  useEffect(() => {
    search("627900a483fb6b651f2ea81e");
  }, []);

  //supprimer l'activité et refresh la page
  function deleteActivityAndRefresh(idActivity) {
    services.deleteActivity(idActivity).then(() => {
      navigate(0);
    });
  }

  return (
    <Container>
      <h1>Les Activités</h1>

      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <form className="d-flex" onSubmit={handleSubmitSearch}>
            <input
              className="form-control me-2"
              type="search"
              onChange={handleSearchChange}
              value={inputTitle}
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
        <h3>Liste des Activités</h3>

        {activities.map((activity) => (
          <Card className="itemActivities" key={activity._id}>
            <Card.Body>
              <Card.Title>{activity.activity_name}</Card.Title>
              <div>
                <p>
                  Date : {moment(activity.activity_date).format("MMMM Do YYYY")}
                </p>
              </div>

              <Card.Text>Description : {activity.description}</Card.Text>

              <Card.Text>Prix : {activity.price}</Card.Text>
            </Card.Body>
            <Button variant="primary" style={{ width: "20%" }}>
              <Link className="boutonvoir" to={`/activities/${activity._id}`}>
                MODIFIER L'ACTIVITE
              </Link>
            </Button>
            <Button
              variant="primary"
              style={{ width: "20%" }}
              onClick={() => deleteActivityAndRefresh(activity._id)}
            >
              SUPPRIMER L'ACTIVITE
            </Button>
          </Card>
        ))}
      </Row>

      <ActivityAdd />
    </Container>
  );
}
