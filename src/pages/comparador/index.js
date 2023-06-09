import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import Cadmiel from "../../assets/ccadmiel.jpg";
import TabsComponent from "../../components/tabs";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Header, Content } from "../comparador/styles";

export default function CompararXlsx() {
  const formField = useRef(null);
  const formField2 = useRef(null);
  const [file1, setFile1] = useState([]);
  const [file2, setFile2] = useState([]);
  const [result, setResult] = useState([]);

  const handleCreateJson = (event) => {
    const field = event.target.name;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const jsonData = [];
      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          blankrows: false,
        });
        jsonData.push({ aba: sheetName, data: sheetData });
      });

      const newFormat = [];

      for (const item of jsonData) {
        const planilha = item.aba;
        const getDados = item.data;
        const cabecalho = getDados[0];
        const dados = [];

        for (let index = 1; index < getDados.length; index++) {
          const linha = getDados[index];
          const newLinha = {};
          for (let index = 0; index < linha.length; index++) {
            newLinha[cabecalho[index] && cabecalho[index].trim()] =
              linha[index];
          }
          dados.push(newLinha);
        }

        newFormat.push({
          planilha,
          dados,
        });
      }

      if (field === "file") {
        setFile1(newFormat);
      } else {
        setFile2(newFormat);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleReset = () => {
    formField.current.value = null;
    formField2.current.value = null;
    setFile1([]);
    setFile2([]);
    setResult([]);
  };

  function handleComapare() {
    const finalResult = [];
    for (const categoria of file2) {
      const planilhaAtual = categoria.planilha;
      const dadosAtual = categoria.dados;
      const getPlanilha = file1.find((item) => item.planilha === planilhaAtual);
      const dadosPassado = getPlanilha.dados;
      const newData = [];
      for (const linha of dadosAtual) {
        if (getPlanilha) {
          const getDuplicated = dadosPassado.find(
            (item) => item.OS === linha.OS
          );
          if (getDuplicated) {
            newData.push({
              ...linha,
              duplicado: true,
            });
          } else {
            newData.push({
              ...linha,
              duplicado: false,
            });
          }
        }
      }
      finalResult.push({
        planilha: planilhaAtual,
        dados: newData,
      });
    }
    return setResult(finalResult);
  }

  const handleRemove = useCallback(
    (planilha, id) => {
      const indexToReplace = result.findIndex(
        (item) => item.planilha === planilha
      );

      if (!id) {
        if (indexToReplace !== -1) {
          const getDados = result[indexToReplace];
          const { dados } = getDados;
          const filterDados = dados.filter((dup) => dup.duplicado !== true);
          const updatedData = [
            ...result.slice(0, indexToReplace),
            { planilha: planilha, dados: filterDados },
            ...result.slice(indexToReplace + 1),
          ];

          return setResult(updatedData);
        }
      }

      const getDados = result[indexToReplace];
      const { dados } = getDados;
      const filteredDados = dados.filter((_,i) => i !== parseInt(id));
      console.log(filteredDados);
      const updatedData = [
        ...result.slice(0, indexToReplace),
        { planilha: planilha, dados: filteredDados },
        ...result.slice(indexToReplace + 1),
      ];

      return setResult(updatedData);
    },
    [result]
  );

  const dadosToWorksheet = (dados) => {
    const filteredDados = dados.map((obj) => {
      const { STATUS, duplicado, ...rest } = obj;
      return rest;
    });
    const worksheet = XLSX.utils.json_to_sheet(filteredDados);
    return worksheet;
  };


  const makeXlsx = () => {
    const workbook = XLSX.utils.book_new();

    result.forEach((item) => {
      const { planilha, dados } = item;
      const worksheet = dadosToWorksheet(dados);
      XLSX.utils.book_append_sheet(workbook, worksheet, planilha);
    });

    XLSX.writeFile(workbook, 'data.xlsx');
  };

  return (
    <>
      <Header>
        <Container>
          <Row>
            <Col>
              <img src={Cadmiel} alt="Cadmiel 4.0" height={70} />
              <Link to="/">Home</Link>
            </Col>
          </Row>
        </Container>
      </Header>
      <Content>
        <Container>
          <Row className="g-4 align-items-end">
            <Col xs={12}>
              <h1>Comparador de Arquivos</h1>
              <p>
                Para realizar a comparação entre os arquivos selecione os
                arquivos, selecione a aba desejada e clique em comparar
                arquivos.
              </p>
            </Col>
            <Col xs={4}>
              <Form.Label for="formFile1" class="form-label">
                Arquivo Anterior
              </Form.Label>
              <input
                ref={formField}
                class="form-control"
                type="file"
                id="formFile1"
                name="file"
                disabled={result.length > 0}
                accept=".xlsx"
                onChange={handleCreateJson}
              />
            </Col>
            <Col xs={4}>
              <Form.Label for="formFile2" class="form-label">
                Arquivo Atual
              </Form.Label>
              <input
                ref={formField2}
                class="form-control"
                type="file"
                id="formFile2"
                name="file2"
                disabled={result.length > 0}
                accept=".xlsx"
                onChange={handleCreateJson}
              />
            </Col>
            {result.length === 0 ? (
              <Col md={2}>
                <Button
                  variant="primary"
                  className="w-100"
                  type="submit"
                  disabled={file1.length === 0 && file2.length === 0}
                  onClick={handleComapare}
                >
                  Comparar
                </Button>
              </Col>
            ) : null}
            {result.length > 0 ? (
              <>
                <Col md={2}>
                  <Button
                    type="submit"
                    className="w-100"
                    variant="danger"
                    onClick={handleReset}
                  >
                    Reiniciar
                  </Button>
                </Col>
                <Col md={2}>
                  <Button
                    type="submit"
                    className="w-100"
                    variant="success"
                    disabled={file1.length === 0 && file2.length === 0}
                    onClick={makeXlsx}
                  >
                    Gerar XLSX
                  </Button>
                </Col>
              </>
            ) : null}
            {result.length > 0 ? (
              <Col xs={12}>
                <TabsComponent dados={result} handleRemove={handleRemove} />
              </Col>
            ) : null}
          </Row>
        </Container>
      </Content>
    </>
  );
}
