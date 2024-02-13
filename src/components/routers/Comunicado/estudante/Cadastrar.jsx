import { useNavigate } from "react-router-dom";
import { api } from "../../../../../auth/auth";
import "./cadastrar.css";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

const Cadastrar = () => {
  const [bi, setBi] = useState("");
  const [userBi, setUserBi] = useState("");
  const [nome, setNome] = useState("");
  const [contacto, setContacto] = useState("");
  const [fk_user, setFk_user] = useState("");
  const navigete = useNavigate();

  useEffect(() => {}, []);

  const getBi = async (e) => {
    e.preventDefault();
    await api
      .post("/user/bi", { bi })
      .then((data) => {
        if (data.data === "Token Invalid") {
          navigete("/login");
          return;
        }
        setUserBi(data.data.bi);
        setFk_user(data.data.id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-cadastrar">
      <div className="pesquisa">
        <form onSubmit={(e) => getBi(e)} className="form">
          <input
            type="search"
            placeholder="Nº de BI do Estudante"
            required
            value={bi}
            onChange={(e) => setBi(e.target.value)}
            autoFocus
          />
          <BiSearch
            color="#fff"
            cursor={"pointer"}
            size={27}
            onSubmit={(e) => getBi(e)}
          />
        </form>
      </div>
      <form>
        <h2>Cadastro do Estudante</h2>
        <input
          type="text"
          id="nome"
          placeholder="Nome do Estudante"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="text"
          id="bi"
          placeholder="Nº de BI do Estudante"
          required
          disabled
          value={userBi}
          onChange={(e) => setUserBi(e.target.value)}
        />
        <input
          type="text"
          id="contacto"
          placeholder="Contacto do Estudante"
          required
          value={contacto}
          onChange={(e) => setContacto(e.target.value)}
        />
        <input
          type="text"
          value={fk_user}
          onChange={(e) => setFk_user(e.target.value)}
          hidden
        />

        {nome && bi && contacto && <button type="submit">Cadastrar</button>}
      </form>
    </div>
  );
};

export default Cadastrar;
