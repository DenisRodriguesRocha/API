import express from "express";
import db from './database/index.js'
import usuarioRoutes from "./routes/usuariosRoutes.js";
import autenticacaoRoutes from "./routes/autenticacaoRoutes.js";
import publicacoesRoutes from "./routes/publicacoesRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import swaggerUI from 'swagger-ui-express'
import swaggerDoc from '../swagger_doc.json' assert { type: 'json' };


db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conectado com o banco");
});

const app = express();
app.use(express.json());
app.use(autenticacaoRoutes);
app.use(usuarioRoutes);
app.use(publicacoesRoutes);
app.use(adminRoutes);
app.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerDoc))

export default app;
