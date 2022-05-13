import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import services from "../../services";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Col, Container, Row, Button } from "react-bootstrap";

function ParticipantsList({ listParticipants, setListParticipants }) {
  const navigate = useNavigate();

  const { SearchBar } = Search;

  // DESCRIPTION DES COLONNES
  // #region
  const columns = [
    {
      dataField: "_id",
      hidden: true,
    },
    {
      dataField: "event._id",
      hidden: true,
    },
    {
      dataField: "role._id",
      hidden: true,
    },
    {
      dataField: "event.event_name",
      text: "Evénement *",
      formatter: (cellContent, row) => {
        return (
          <Button
            className="btn btn-light btn-xs btn-block"
            onClick={() => navigate(`/events/${row.event._id}`)}
          >
            {row.event.event_name}
          </Button>
        );
      },
      sort: true,
      style: { verticalAlign: "middle" },
    },
    {
      dataField: "firstname",
      text: "Prénom *",
      sort: true,
      align: "left",
      style: { verticalAlign: "middle" },
    },
    {
      dataField: "lastname",
      text: "Nom *",
      sort: true,
      align: "left",
      style: { verticalAlign: "middle" },
    },
    {
      dataField: "email",
      text: "Email",
      style: { verticalAlign: "middle" },
    },
    {
      dataField: "telephone",
      text: "Téléphone",
      style: { verticalAlign: "middle" },
    },
    {
      dataField: "role.role_name",
      text: "Rôle *",
      align: "center",
      formatter: (cellContent, row) => {
        return (
          <Button
            className="btn btn-light"
            onClick={() => navigate(`/roles/${row.role._id}`)}
          >
            {row.role.role_name}
          </Button>
        );
      },
      sort: true,
      style: { verticalAlign: "middle" },
    },

    {
      dataField: "details",
      text: "",
      formatter: (cellContent, row) => {
        return (
          <button
            className="btn btn-outline-warning btn-xs btn-block"
            onClick={() => navigate(`/participants/${row._id}`)}
          >
            Détails
          </button>
        );
      },
    },
    {
      dataField: "remove",
      text: "",
      formatter: (cellContent, row) => {
        return (
          <button
            className="btn btn-outline-danger btn-xs"
            onClick={() => deleteParticipant(row._id)}
          >
            Supprimer
          </button>
        );
      },
    },
  ];
  // #endregion
  // OPTION DU TABLEAU
  const defaultSorted = [
    {
      dataField: "event.event_name",
      order: "asc", // desc or asc
    },
  ];

  // RECUPERATION DES DONNEES
  function fecthAndSetListParticipant() {
    services
      .getAllParticipants()
      .then((list) => {
        setListParticipants(list);
      })
      .catch((error) => {
        console.log("Error list participants", error);
        alert("La liste des participants ne peut être affichée");
      });
  }
  function deleteParticipant(idParticipant) {
    services
      .deleteParticipant(idParticipant)
      .then(() => {
        fecthAndSetListParticipant();
        alert("Participant supprimé");
      })
      .catch((error) => {
        console.log("Error delete participant", error);
        alert("La liste des participants ne peut être affichée");
      });
  }

  useEffect(() => {
    fecthAndSetListParticipant();
  }, []);

  return (
    <ToolkitProvider
      keyField="_id"
      data={listParticipants}
      columns={columns}
      search
      bootstrap4={true}
    >
      {(props) => (
        <Container>
          <Row>
            <Col>
              <SearchBar {...props.searchProps} />

              <BootstrapTable
                {...props.baseProps}
                keyField="_id"
                striped
                hover
                responsive
                bordered={false}
                data={listParticipants}
                columns={columns}
                defaultSorted={defaultSorted}
                noDataIndication="Aucune donnée dans la liste"
                pagination={paginationFactory()}
              ></BootstrapTable>
            </Col>
          </Row>
          <Row>
            <Col className="h6 mb-4">* tri possible sur colonne</Col>
          </Row>
        </Container>
      )}
    </ToolkitProvider>
  );
}

export default ParticipantsList;
