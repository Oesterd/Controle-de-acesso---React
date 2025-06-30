import { useForm, Controller } from "react-hook-form";
import Cleave from "cleave.js/react";

function App() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Dados:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>CPF</label>
      <Controller
        name="cpf"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Cleave
            {...field}
            options={{
              delimiters: [".", ".", "-"],
              blocks: [3, 3, 3, 2],
              numericOnly: true,
            }}
            placeholder="000.000.000-00"
          />
        )}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default App;
