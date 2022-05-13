import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useEvent } from "../../EventInUse";
import "./Home.css";

const Home = () => {
  const { setEventChoice, setEvent } = useEvent();
  useEffect(() => {
    setEventChoice(false);
    setEvent({});
  }, []);

  return (
    <Container>
      <Row className="m-5 p-5 text-center">
        <Col>
          <h2 className="h2-font">
            Bienvenue dans votre application de gestion des événements
          </h2>
          <h3>
            {" "}
            Sélectionnez l'événement pour y ajouter les activités, rôles et
            participants
          </h3>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
