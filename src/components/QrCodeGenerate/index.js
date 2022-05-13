import { useState, useEffect } from "react";
import QRCodeNode from "qrcode";
import { Card, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import services from "../../services";
import dayjs from "dayjs";

export default function QrCodegenerate({idQrcode}) {
    const [participant, setParticipant] = useState({
        event: {},
        role: {},
    });
    const navigate = useNavigate();

    const [url, setUrl] = useState("");

    function generateQRCode(id) {
        QRCodeNode.toDataURL(JSON.stringify(id), {width: 300, errorCorrectionLevel: "H"})
        .then((url) => {
          setUrl(url);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    useEffect(() => {
        services
            .getParticipantById(idQrcode)
            .then((response) => {
                console.log(response)
                setParticipant(response);
                generateQRCode(idQrcode);
            })
            .catch(console.log);
    }, []);

  return (
    <Card style={{ width: '200rem' }}>
        <Card.Body>
            <Card.Title>
                {participant.event.event_name} à {participant.event.place} du {dayjs(participant.event.start_date).format('DD/MM/YYYY')} au {dayjs(participant.event.end_date).format('DD/MM/YYYY')}
            </Card.Title>
            <Card.Text>
                {participant.lastname} {participant.firstname}, email: {participant.email}, tel: {participant.telephone}
            </Card.Text>            
            <Card.Text>
                <img src={url} alt="" />
            </Card.Text>
        </Card.Body>
        <Card.Body>
            <Button variant="outline-info">Imprimer</Button>
            <Button variant="outline-info">Envoi Mail</Button>
        </Card.Body>
        <Card.Body>
            <Button onClick={() => navigate(`/participants`)} variant="outline-dark">Retour</Button>
        </Card.Body>
    </Card>
  )
}
