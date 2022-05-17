import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Card, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import services from "../../services";
import dayjs from "dayjs";
import { useRef } from 'react';
import ReactToPrint from 'react-to-print';

export default function QrCodegenerate({idQrcode}) {
    const [participant, setParticipant] = useState({
        event: {},
        role: {},
    });
    const [url, setUrl] = useState("");

    const navigate = useNavigate();
    const componentRef = useRef(null);

    function generateQRCode(id) {
        QRCode.toDataURL(JSON.stringify(id), {width: 300, errorCorrectionLevel: "H"})
        .then((url) => {
          setUrl(url);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function handleSendMail(idParticipant) {
        console.log(idParticipant);
        /*Generation du Qrcode et envoi par mail par le backend*/
        services
          .generateQRCode(idParticipant)
          .then((response) => {
            console.log(response);      
          })
          .catch(() => alert("Une erreur pendant l'envoi par mail du Qrcode au participant"));
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
        <Card.Body ref={componentRef}>
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
            <ReactToPrint
            trigger={() => <Button variant="outline-info">Imprimer</Button>}
            content={() => componentRef.current}
            />
            <Button onClick={() => handleSendMail(participant._id)} variant="outline-info">Envoi mail</Button>
        </Card.Body>
        <Card.Body>
            <Button onClick={() => navigate(`/participants`)} variant="outline-dark">Retour</Button>
        </Card.Body>
    </Card>
  )
}
