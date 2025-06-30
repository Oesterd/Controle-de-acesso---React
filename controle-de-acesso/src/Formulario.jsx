import { useForm, Controller } from "react-hook-form";
import Cleave from "cleave.js/react";

function Formulario() {
  const { control, handleSubmit, watch } = useForm();
  const tipoDocumento = watch("tipoDocumento") || "CPF";

 const onSubmit = async (data) => {
  console.log("Antes da conversão:", data.dataNascimento);

  if (data.dataNascimento && data.dataNascimento.includes("-")) {
    const [d, m, y] = data.dataNascimento.split("-");
    if (d.length === 2 && m.length === 2 && y.length === 4) {
      data.dataNascimento = `${y}-${m}-${d}`;
    }
  }

  console.log("Depois da conversão:", data.dataNascimento); // DEVE mostrar: 1990-04-29

  try {
    const response = await fetch("http://localhost:8080/api/person/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(msg || "Erro ao enviar dados");
    }

    alert("Pessoa cadastrada com sucesso!");
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao cadastrar: " + error.message);
  }
};



  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f5f5f5",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "24px",
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* Nome */}
        <div>
          <label>Nome</label>
          <Controller
            name="nome"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Digite seu nome"
                style={{ width: "100%", padding: "8px" }}
              />
            )}
          />
        </div>

        {/* Status */}
        <div>
          <label>Status</label>
          <Controller
            name="status"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select {...field} style={{ width: "100%", padding: "8px" }}>
                <option value="">Selecione</option>
                <option value="ATIVO">ATIVO</option>
                <option value="INATIVO">INATIVO</option>
              </select>
            )}
          />
        </div>

        {/* Data de Nascimento */}
        <div>
          <label>Data de Nascimento</label>
          <Controller
            name="dataNascimento"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Cleave
                {...field}
                options={{
                  blocks: [4, 2, 2],
                  delimiters: ["-", "-"],
                  numericOnly: true,
                }}
                placeholder="aaaa-mm-dd"
                style={{ width: "100%", padding: "8px" }}
              />
            )}
          />
        </div>

        {/* Tipo de Documento */}
        <div>
          <label>Tipo de Documento</label>
          <Controller
            name="tipoDocumento"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <select {...field} style={{ width: "100%", padding: "8px" }}>
                <option value="">Selecione</option>
                <option value="CPF">CPF</option>
                <option value="RG">RG</option>
              </select>
            )}
          />
        </div>

        {/* Documento */}
        <div>
          <label>Documento</label>
          <Controller
            name="documento"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Cleave
                {...field}
                options={
                  tipoDocumento === "RG"
                    ? {
                        blocks: [2, 3, 3, 1],
                        delimiters: [".", ".", "-"],
                        numericOnly: true,
                      }
                    : {
                        blocks: [3, 3, 3, 2],
                        delimiters: [".", ".", "-"],
                        numericOnly: true,
                      }
                }
                placeholder={
                  tipoDocumento === "RG" ? "00.000.000-0" : "000.000.000-00"
                }
                style={{ width: "100%", padding: "8px" }}
              />
            )}
          />
        </div>

        {/* Celular */}
        <div>
          <label>Celular</label>
          <Controller
            name="celular"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Cleave
                {...field}
                options={{
                  blocks: [0, 2, 5, 4],
                  delimiters: ["(", ") ", "-"],
                  numericOnly: true,
                }}
                placeholder="(00) 00000-0000"
                style={{ width: "100%", padding: "8px" }}
              />
            )}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px",
            fontWeight: "bold",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Formulario;
