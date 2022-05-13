import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import services from "../../services";

import dayjs from "dayjs";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

import ActivityAdd from "../../components/ActivityAdd";
import "./ActivitiesList.css";

export default function ActivitiesList() {
  const [activities, setActivities] = useState([]);
  const [inputTitle, setInputTitle] = useState("");
  const [showAddActivite, setShowAddActivite] = useState(false);

  const { SearchBar } = Search;
  // DESCRIPTION DES COLONNES
  // #region
  const columns = [
    {
      dataField: "_id",
      hidden: true,
    },
    {
      dataField: "activity_name",
      text: "Nom *",
      sort: true,
      align: "left",
      style: { verticalAlign: "middle" },
    },
    {
      dataField: "activity_date",
      text: "Date *",
      formatter: (cellContent, row) => {
        return dayjs(row.start_date).format("DD/MM/YY");
      },
      sort: true,
      style: { verticalAlign: "middle" },
    },
    {
      dataField: "description",
      text: "Description",
      align: "left",
      style: { verticalAlign: "middle" },
    },

    {
      dataField: "price",
      text: "Tarif (€)*",
      sort: true,
      align: "right",
      style: { verticalAlign: "middle" },
    },
    {
      dataField: "details",
      text: "",
      formatter: (cellContent, row) => {
        return (
          <button
            className="btn btn-outline-warning btn-xs btn-block"
            onClick={() => navigate(`/activities/${row._id}`)}
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
            onClick={() => deleteActivityAndRefresh(row._id)}
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
  function handleAddButton() {
    setShowAddActivite((currentState) => !currentState);
  }

  const navigate = useNavigate();

  //liste des activités via dB
  const search = (idEvent) => {
    services
      .getActivities(idEvent)
      .then((result) => {
        setActivities(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    search("627900a483fb6b651f2ea81e");
  }, []);

  //supprimer l'activité et refresh la page
  function deleteActivityAndRefresh(idActivity) {
    services.countActivityByRole(idActivity).then((count) => {
      console.log(count);
      //On supprime aucune activité utilisant un role
      if (count === 0) {
        services
          .deleteActivity(idActivity)
          .then(() => {
            navigate(0);
          })
          .catch(console.log);
      } else {
        alert("Activités associées à un rôle, vous ne pouvez pas la supprimer");
      }
    });
  }

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col sm className="m-4">
          <h3>LISTE DES ACTIVITES</h3>
        </Col>
        <Col sm className="m-4 text-right">
          <Button onClick={handleAddButton} class="button-bg-color">
            Ajouter
          </Button>
        </Col>
      </Row>
      {showAddActivite && (
        <Row className="justify-content-center">
          <Col sm>
            <ActivityAdd />
          </Col>
        </Row>
      )}
      <hr />
      <Row>
        <Col>
          <ToolkitProvider
            keyField="_id"
            data={activities}
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
                      keyField="_id"
                      striped
                      hover
                      responsive
                      bordered={false}
                      data={activities}
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
        </Col>
      </Row>
    </Container>
  );
}
