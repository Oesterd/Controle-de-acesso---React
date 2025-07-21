import { Link } from "react-router-dom";
import { useEffect } from "react";


function Home() {

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center", // horizontal
        alignItems: "center",     // vertical
        backgroundColor: "#f5f5f5",
        flexDirection: "column",
        gap: "20px",              // espaçamento entre os elementos
      }}
    >
      <h1 style={{ textAlign: "center", color: "black" }}>Bem-vindo ao sistema de controle de acesso</h1>
      <Link to="/form">
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cadastrar pessoa
        </button>
      </Link>
    </div>
  );
}

export default Home;
