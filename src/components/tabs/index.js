import React, { useState } from "react";
import { Tab, Button } from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi";
import Table from "../../components/react-table";
import { ReactTableButtonTrash } from "../react-table/styles";
import { StyledTabs, ButtonRightContainer } from "./styles";

export default function TabsComponent({ dados, handleRemove }) {
  const [activeTab, setActiveTab] = useState(dados[0].planilha);

  const handleTabChange = (props) => {
    setActiveTab(props);
  };

  const columns = React.useMemo(
    () => [
      { Header: "Data", accessor: "DATA" },
      { Header: "OS", accessor: "OS" },
      { Header: "Cliente", accessor: "CLIENTE" },
      { Header: "Carro", accessor: "CARRO" },
      { Header: "Carro", accessor: "CHASSI" },
      { Header: "Carro", accessor: "SERVIÇO" },
      { Header: "Carro", accessor: "VALOR" },
      { Header: "Carro", accessor: "CONSULTOR" },
      {
        Header: "Dupl.",
        accessor: "duplicado",
        Cell: (cellObject) => {
          if (cellObject.row.values.duplicado === true) {
            return (
              <ReactTableButtonTrash type="button">
                <FiTrash2
                  size={18}
                  color="red"
                  onClick={() =>
                    handleRemove(activeTab,cellObject.row.id)
                  }
                />
              </ReactTableButtonTrash>
            );
          }
        },
      },
    ],
    [activeTab,handleRemove]
  );

  return (
    <StyledTabs
      id="listagem"
      defaultActiveKey={dados[0].planilha}
      transition={false}
      justify
      onSelect={handleTabChange}
    >
      {dados.map((arquivo) => {
        return (
          <Tab
            eventKey={arquivo.planilha}
            key={arquivo.planilha}
            title={arquivo.planilha}
          >
            <Table
              columns={columns}
              planilha={arquivo.planilha}
              data={arquivo.dados}
            />
            <ButtonRightContainer>
              <Button
                variant="danger"
                onClick={() => handleRemove(activeTab, null)}
              >
                Remover todos duplicados
              </Button>
            </ButtonRightContainer>
          </Tab>
        );
      })}
    </StyledTabs>
  );
}
