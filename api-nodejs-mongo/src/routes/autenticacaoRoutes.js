import express from "express";
import AutenticacaoController from "../controller/autenticacaoController.js";

const router = express.Router();

router.post("/autenticacao/login/usuario", AutenticacaoController.loginUsuario);
router.post("/autenticacao/login/admin", AutenticacaoController.loginAdmin);

export default router;