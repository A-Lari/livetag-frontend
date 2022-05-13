import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import services from "../../services";

import dayjs from "dayjs";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Col, Container, Row } from "react-bootstrap";

function Eventslist({ events, setEvents }) {
  const navigate = useNavigate();

  const { SearchBar } = Search;
  // DESCRIPTION DES COLONNES
  // #region
  const columns = [
    {
      dataField: "_id",
      isKey: true,
      hidden: true,
    },
    {
      dataField: "code",
      text: "Code *",
      sort: true,

      style: { verticalAlign: "middle" },
    },
    {
      dataField: "event_name",
      text: "Nom *",
      sort: true,
      align: "left",
      style: { verticalAlign: "middle" },
    },
    {
      dataField: "description",
      text: "Description",
      align: "left",
      style: { verticalAlign: "middle" },
    },
    {
      dataField: "place",
      text: "Lieu *",
      sort: true,
      style: { verticalAlign: "middle" },
    },
    {
      dataField: "start_date",
      text: "Date de début *",
      formatter: (cellContent, row) => {
        return dayjs(row.start_date).format("DD/MM/YY");
      },
      sort: true,
      style: { verticalAlign: "middle" },
    },
    {
      dataField: "end_date",
      text: "Date de fin *",
      formatter: (cellContent, row) => {
        return dayjs(row.end_date).format("DD/MM/YY");
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
            onClick={() => navigate(`/events/${row._id}`)}
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
            onClick={() => deleteEvent(row._id)}
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
      dataField: "event_name",
      order: "asc", // desc or asc
    },
  ];

  // RECUPERATION DES DONNEES

  function fetchEventData() {
    services
      .getEventFromDB()
      .then((list) => {
        setEvents(list);
      })
      .catch((error) => {
        console.log("Error list events", error);
        alert("La liste des events ne peut être à affichée");
      });
  }

  function deleteEvent(id) {
    services
      .deleteEventByID(id)
      .then((response) => {
        navigate(0);
      })
      .catch(console.log);
  }

  useEffect(() => {
    fetchEventData();
  }, []);

  return (
    <ToolkitProvider
      keyField="events"
      data={events}
      columns={columns}
      search
      bootstrap4={true}
    >
      {(props) => (
        <Container>
          <Row>
            <Col>
              <SearchBar {...props.searchProps} />
            </Col>
          </Row>
          <Row>
            <Col>
              <BootstrapTable
                {...props.baseProps}
                keyField="events"
                striped
                hover
                responsive
                bordered={false}
                data={events}
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

export default Eventslist;
