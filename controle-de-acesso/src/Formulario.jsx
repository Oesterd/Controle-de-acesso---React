import { useForm, Controller } from "react-hook-form";
import Cleave from "cleave.js/react";

function Formulario() {
  const { control, handleSubmit, watch } = useForm();
  const tipoDocumento = watch("tipoDocumento") || "CPF";

  // Garante que a data esteja no formato yyyy-mm-dd
  const onSubmit = async (data) => {
    console.log("Antes da conversão:", data.dataNascimento);

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
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao cadastrar: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="formulario">
      {/* Nome */}
      <div>
        <label>Nome</label>
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
      <div>
        <label>Status</label>
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
      <Controller
        name="dataNascimento"
        control={control}
        defaultValue=""
        rules={{
          required: "A data de nascimento é obrigatória",
          validate: (value) => {
            if (!/^\d{2}-\d{2}-\d{4}$/.test(value)) {
              return "Formato inválido (esperado: dd-mm-aaaa)";
            }

            const [dd, mm, yyyy] = value.split("-").map(Number);
            const date = new Date(`${yyyy}-${mm}-${dd}`);

            // verifica se os componentes da data estão corretos
            const isValid =
              date &&
              date.getDate() === dd &&
              date.getMonth() + 1 === mm &&
              date.getFullYear() === yyyy;

            return isValid || "Data inválida";
          },
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

      {/* Tipo de Documento */}
      <div>
        <label>Tipo de Documento</label>
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
      {/* Documento */}
      <div>
        <label>Documento</label>
        <Controller
          name="documento"
          control={control}
          defaultValue=""
          rules={{ required: "O documento é obrigatório" }}
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
                  type="text"
                  inputMode="numeric"
                  maxLength={9}
                  placeholder="000000000"
                  onChange={(e) => {
                    const onlyNumbers = e.target.value.replace(/\D/g, "");
                    field.onChange(onlyNumbers);
                  }}
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
      <div>
        <label>Celular</label>
        <Controller
          name="celular"
          control={control}
          defaultValue=""
          rules={{ required: "O celular é obrigatório" }}
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

      <button type="submit">Enviar</button>
    </form>
  );
}

export default Formulario;
