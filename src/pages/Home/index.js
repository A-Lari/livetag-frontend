import { Col, Container, Row } from "react-bootstrap";
import "./Home.css";

const Home = () => {
  return (
    <Container>
      <Row className="m-5 p-5 text-center">
        <Col>
          <h2 className="h2-font">
            Bienvenue dans votre application de gestion des événements
          </h2>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
