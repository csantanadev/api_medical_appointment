import "dotenv/config";
import { app } from "./app";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

process.on("uncaughtException", (err) => {
  console.log(`erro no servidor ${err}`);
});
