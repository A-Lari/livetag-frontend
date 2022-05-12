import { useEffect } from "react";

import services from "../../services";

import { Table, Button, Nav, Badge } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

function ParticipantsList({ listParticipants, setListParticipants }) {
  const { SearchBar } = Search;

  const columns = [
    {
      dataField: "firstname",
      text: "Prénom",
      sort: true,
    },
    {
      dataField: "lastname",
      text: "Nom",
      sort: true,
    },
    {
      dataField: "email",
      text: "Email",
    },
    {
      dataField: "telephone",
      text: "Téléphone",
    },
    {
      dataField: "role.role_name",
      text: "Rôle",
      sort: true,
    },
    {
      dataField: "event.event_name",
      text: "Evénement",
      sort: true,
    },
  ];

  const defaultSorted = [
    {
      dataField: "event.event_name",
      order: "asc", // desc or asc
    },
    {
      dataField: "role.role_name",
      order: "asc", // desc or asc
    },
  ];

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
  function deleteParticipant(participant) {
    services
      .deleteParticipant(participant._id)
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
    <div>
      <ToolkitProvider
        keyField="listParticipant"
        data={listParticipants}
        columns={columns}
        search
      >
        {(props) => (
          <div>
            <SearchBar {...props.searchProps} delay={1000} />

            <BootstrapTable
              {...props.baseProps}
              keyField="listParticipant"
              striped
              hover
              responsive
              bordered={false}
              data={listParticipants}
              columns={columns}
              defaultSorted={defaultSorted}
              noDataIndication="Aucune donnée dans la liste"
              pagination={paginationFactory()}
            />
          </div>
        )}
      </ToolkitProvider>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Rôle</th>
            <th>Evénement</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listParticipants.map((participant) => (
            <tr key={participant._id}>
              <td>{participant.firstname}</td>
              <td>{participant.lastname}</td>
              <td>{participant.email}</td>
              <td>{participant.telephone}</td>
              <td>{participant.role.role_name}</td>
              <td>{participant.event.event_name}</td>
              <td>
                <Nav>
                  <Nav.Item>
                    <Button variant="outline-warning">
                      <Nav.Link href={`/participants/${participant._id}`}>
                        <Badge bg="warning" text="dark">
                          détails
                        </Badge>
                      </Nav.Link>
                    </Button>
                  </Nav.Item>
                  <Nav.Item>
                    <Button
                      variant="outline-danger"
                      onClick={() => deleteParticipant(participant)}
                    >
                      <Badge bg="danger" text="white">
                        supprimer
                      </Badge>
                    </Button>
                  </Nav.Item>
                </Nav>
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </Table>
    </div>
  );
}

export default ParticipantsList;
