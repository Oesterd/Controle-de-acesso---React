import { useForm, Controller } from "react-hook-form";
import Cleave from "cleave.js/react";

function Formulario() {
  const { handleSubmit, control } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:8080/api/person/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Erro ao enviar dados");
      }
      alert("Pessoa cadastrada com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      {/* Nome */}
      <div>
        <label>Nome</label>
        <Controller
          name="nome"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} placeholder="Digite seu nome" />}
        />
      </div>

      {/* Celular com Cleave.js */}
      <div>
        <label>Celular</label>
        <Controller
          name="celular"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Cleave
              {...field}
              options={{ phone: true, phoneRegionCode: 'BR' }}
              placeholder="(00) 00000-0000"
            />
          )}
        />
      </div>

      {/* CPF com Cleave.js */}
      <div>
        <label>Documento (CPF)</label>
        <Controller
          name="documento"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Cleave
              {...field}
              options={{
                delimiters: [".", ".", "-"],
                blocks: [3, 3, 3, 2],
                numericOnly: true
              }}
              placeholder="000.000.000-00"
            />
          )}
        />
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
}

export default Formulario;
