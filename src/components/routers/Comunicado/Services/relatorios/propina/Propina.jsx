import "./propina.css";
import { BiPrinter, BiSearch, BiX } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { Dayjs } from "dayjs";
import { formatDate } from "../../../../hook/timeout";
import { api } from "../../../../../../../auth/auth";
import { useEffect, useState } from "react";

function RelatorioPropina({ propinas, setVisivel, visivel, tipo }) {
  const [semestres, setSemestres] = useState([]);
  const [anos, setAnos] = useState([]);
  const [meses, setMeses] = useState([]);
  const [propinasAnual, setPropinasAnual] = useState([]);
  const [propinasMensal, setPropinasMensal] = useState([]);
  const [ano, setAno] = useState("");
  const [semestre, setSemestre] = useState("");
  const [mes, setMes] = useState("");
  const [bi, setBi] = useState("");
  const [anual, setAnual] = useState(false);
  const [mensal, setMensal] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAnoLetivo();
    getMes();
  }, []);

  const imprimir = async (e) => {
    e.preventDefault();
    const con = document.getElementById("tabela").innerHTML;
    let estilo = "<style>";
    estilo += "table { border-collapse: collapse; width: 100%}";
    estilo +=
      "table th,td { padding: 8px;text-align: center; padding-right: 20px; border-bottom: 1px solid #ddd;border-right: none;border-left: none;border-top: none;}";
    estilo +=
      "table th,td { padding: 8px;text-align: center; border: 1px solid #000; }";
    estilo += "</style>";

    const win = window.open();
    win.document.write("<html><head>");
    win.document.write("<title>ISPMOXICO</title>");
    win.document.write(estilo);
    win.document.write("</head>");
    win.document.write("<body>");
    win.document.write(con);
    win.document.write("</body>");
    win.document.write("</html>");
    win.print();
    win.close();
  };
  function closed(e) {
    e.preventDefault();
    setVisivel(false);
  }

  const getMes = async () => {
    await api
      .get("/mes")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }
        setMes(data.data[0].mes);
        setMeses(data.data);
      })
      .catch((err) => console.log(err));
  };

  const getAnoLetivo = async () => {
    await api
      .get("/letivo")
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setAnos(data.data);
        setAno(data.data[0].ano);
      })
      .catch((err) => console.log(err));
  };

  const buscaPropinaMensal = async (e) => {
    e.preventDefault();
    await api
      .post("/propina/mensal", {
        mes,
        bi,
        ano,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setPropinasMensal(data.data);
      })
      .catch((err) => console.log(err));
  };
  const buscaPropina = async (e) => {
    e.preventDefault();
    await api
      .post("/propina/anual", {
        ano,
        semestre,
        bi,
      })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigate("/login");
          return;
        }

        setPropinasAnual(data.data);
      })
      .catch((err) => console.log(err));
  };

  function toggleMensal(e) {
    e.preventDefault();
    setMensal(true);
    setAnual(false);
  }
  function toggleAnual(e) {
    e.preventDefault();
    setAnual(true);
    setMensal(false);
  }
  return (
    <>
      {visivel && (
        <>
          <div className="relatorioPropina">
            <div className="opcoes">
              <h2>Relatório </h2>
              <span onClick={(e) => toggleMensal(e)} className="link">
                Mensal
              </span>
              <span onClick={(e) => toggleAnual(e)} className="link">
                Anual
              </span>
              <BiX
                size={20}
                color="red"
                cursor={"pointer"}
                className="closed"
                onClick={(e) => closed(e)}
              />
            </div>
            {anual && (
              <>
                <h3>Propina Anual</h3>
                <form onSubmit={(e) => buscaPropina(e)} className="formBi">
                  <label htmlFor="anoLetivo">
                    Ano Lectivo
                    <select onChange={(e) => setAno(e.target.value)}>
                      <option value={"Escolhe"}>Escolha...</option>

                      {anos.map((ano) => (
                        <option value={ano.ano} key={ano.id}>
                          {ano.ano}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="input">
                    <input
                      type="search"
                      placeholder="Número de BI do Estudante"
                      value={bi}
                      onChange={(e) => setBi(e.target.value)}
                      className="search"
                    />
                    <BiSearch
                      size={30}
                      color="fff"
                      cursor={"pointer"}
                      onClick={(e) => buscaPropina(e)}
                    />
                  </div>
                </form>

                <div className="tabelaPropina" id="tabela">
                  <table>
                    {propinasMensal.length >= 1 && (
                      <thead>
                        <tr>
                          <th>Contribuinte</th>
                          <th>Tipo de Serviço</th>
                          <th>Mês</th>
                          <th>Valor</th>
                          <th>Solicitado</th>
                          <th>Ano Lectivo</th>
                        </tr>
                      </thead>
                    )}
                    <tbody>
                      {propinasAnual.map((prop) => (
                        <tr key={prop.id}>
                          <td>{prop?.Estudante?.nome}</td>
                          <td>{tipo}</td>
                          <td>{prop?.Me?.mes}</td>
                          <td>{prop?.valor} Kz</td>
                          <td>{formatDate(prop?.createdAt)}</td>
                          <td>{prop?.AnoLetivo?.ano}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {mensal && (
              <>
                <h3>Propina Mensal</h3>
                <form
                  onSubmit={(e) => buscaPropinaMensal(e)}
                  className="formBi">
                  <label htmlFor="mes">
                    Mês:
                    <select onChange={(e) => setMes(e.target.value)}>
                      <option value={"Escolhe"}>Escolha...</option>

                      {meses.map((m) => (
                        <option value={m.mes} key={m.id}>
                          {m.mes}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="anoLetivo">
                    Ano Lectivo
                    <select onChange={(e) => setAno(e.target.value)}>
                      <option value={"Escolhe"}>Escolha...</option>

                      {anos.map((ano) => (
                        <option value={ano.ano} key={ano.id}>
                          {ano.ano}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="input">
                    <input
                      type="search"
                      placeholder="Número de BI do Estudante"
                      value={bi}
                      onChange={(e) => setBi(e.target.value)}
                      className="search"
                    />
                    <BiSearch
                      size={30}
                      color="fff"
                      cursor={"pointer"}
                      onClick={(e) => buscaPropina(e)}
                    />
                  </div>
                </form>
                <div className="tabelaPropina" id="tabela">
                  <table>
                    {propinasMensal.length >= 1 && (
                      <thead>
                        <tr>
                          <th>Contribuinte</th>
                          <th>Tipo de Serviço</th>
                          <th>Mês</th>
                          <th>Valor</th>
                          <th>Solicitado</th>
                          <th>Ano Lectivo</th>
                        </tr>
                      </thead>
                    )}
                    <tbody>
                      {propinasMensal.map((prop) => (
                        <tr key={prop.id}>
                          <td>{prop?.Estudante?.nome}</td>
                          <td>{tipo}</td>
                          <td>{prop?.Me?.mes}</td>
                          <td>{prop?.valor} Kz</td>
                          <td>{formatDate(prop?.createdAt)}</td>
                          <td>{prop?.AnoLetivo?.ano}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            <div className="imprimir">
              <span onClick={(e) => imprimir(e)} className="b">
                <BiPrinter size={40} color="#fff" />
                Imprimir
              </span>
            </div>
          </div>
          <div className="overley"></div>
        </>
      )}
    </>
  );
}

export default RelatorioPropina;
