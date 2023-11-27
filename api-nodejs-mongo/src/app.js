import express from "express";
import db from './database/index.js'
import usuarioRoutes from "./routes/usuariosRoutes.js";
import autenticacaoRoutes from "./routes/autenticacaoRoutes.js";
import publicacoesRoutes from "./routes/publicacoesRoutes.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conectado com o banco");
});

const app = express();
app.use(express.json());
app.use(autenticacaoRoutes);
app.use(usuarioRoutes);
app.use(publicacoesRoutes);


export default app;
