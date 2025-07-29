import { useForm, Controller } from "react-hook-form";
import Cleave from "cleave.js/react";
import { useNavigate } from "react-router-dom";

function Formulario() {
  const navigate = useNavigate();
  const { control, handleSubmit, watch, reset } = useForm();
  const tipoDocumento = watch("tipoDocumento") || "CPF";

  const onSubmit = async (data) => {
    if (data.dataNascimento && data.dataNascimento.includes("-")) {
      const [d, m, y] = data.dataNascimento.split("-");
      if (d.length === 2 && m.length === 2 && y.length === 4) {
        data.dataNascimento = `${y}-${m}-${d}`;
      }
    }

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
      reset();
      navigate("/");
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao cadastrar: " + error.message);
    }
  };


  return (
    <div className="form-field"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          backgroundColor: "#fff",
          padding: "32px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Nome */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", color: "#000" }}>Nome</label>
          <Controller
            name="nome"
            control={control}
            defaultValue=""
            rules={{ required: "O nome é obrigatório" }}
            render={({ field, fieldState }) => (
              <>
                <input {...field} placeholder="Digite seu nome" />
                {fieldState.error && (
                  <span style={{ color: "red" }}>{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </div>

        {/* Status */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", color: "#000" }}>Status</label>
          <Controller
            name="status"
            control={control}
            defaultValue=""
            rules={{ required: "O status é obrigatório" }}
            render={({ field, fieldState }) => (
              <>
                <select {...field}>
                  <option value="">Selecione</option>
                  <option value="ATIVO">ATIVO</option>
                  <option value="INATIVO">INATIVO</option>
                </select>
                {fieldState.error && (
                  <span style={{ color: "red" }}>{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </div>

        {/* Data de nascimento */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", color: "#000" }}>Data de Nascimento</label>
          <Controller
            name="dataNascimento"
            control={control}
            defaultValue=""
            rules={{
              required: "A data de nascimento é obrigatória",

            }}
            render={({ field, fieldState }) => (
              <>
                <Cleave
                  {...field}
                  options={{
                    blocks: [2, 2, 4],
                    delimiters: ["-", "-"],
                    numericOnly: true,
                  }}
                  placeholder="dd-mm-aaaa"
                />
                {fieldState.error && (
                  <span style={{ color: "red" }}>{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </div>

        {/* Tipo de Documento */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", color: "#000" }}>Tipo de Documento</label>
          <Controller
            name="tipoDocumento"
            control={control}
            defaultValue=""
            rules={{ required: "O tipo de documento é obrigatório" }}
            render={({ field, fieldState }) => (
              <>
                <select {...field}>
                  <option value="">Selecione</option>
                  <option value="CPF">CPF</option>
                  <option value="RG">RG</option>
                </select>
                {fieldState.error && (
                  <span style={{ color: "red" }}>{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </div>

        {/* Documento */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", color: "#000" }}>Documento</label>
          <Controller
            name="documento"
            control={control}
            defaultValue=""
            rules={{
              required: "O documento é obrigatório",
              validate: (value) => {
                const onlyNumbers = value.replace(/\D/g, "");
                if (tipoDocumento === "CPF") return onlyNumbers.length === 11 || "CPF inválido";
                if (tipoDocumento === "RG") return onlyNumbers.length === 9 || "RG inválido";
                return true;
              },
            }}
            render={({ field, fieldState }) => (
              <>
                {tipoDocumento === "CPF" ? (
                  <Cleave
                    {...field}
                    options={{
                      blocks: [3, 3, 3, 2],
                      delimiters: [".", ".", "-"],
                      numericOnly: true,
                    }}
                    placeholder="000.000.000-00"
                  />
                ) : (
                  <input
                    {...field}
                    inputMode="numeric"
                    placeholder="000000000"
                    maxLength={9}
                  />
                )}
                {fieldState.error && (
                  <span style={{ color: "red" }}>{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </div>

        {/* Celular */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "bold", color: "#000" }}>Celular</label>
          <Controller
            name="celular"
            control={control}
            defaultValue=""
            rules={{
              required: "O celular é obrigatório",
              validate: (value) => {
                const onlyNumbers = value.replace(/\D/g, "");
                return onlyNumbers.length === 11 || "Celular inválido";
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Cleave
                  {...field}
                  options={{
                    blocks: [0, 2, 5, 4],
                    delimiters: ["(", ") ", "-"],
                    numericOnly: true,
                  }}
                  placeholder="(00) 00000-0000"
                />
                {fieldState.error && (
                  <span style={{ color: "red" }}>{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </div>

        {/* Botão de envio */}
        <button
          type="submit"
          style={{
            marginTop: "8px",
            padding: "10px 20px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Formulario;
