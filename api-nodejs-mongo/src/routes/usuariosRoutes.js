import express from "express";
import UsuariosController from "../controller/UsuariosController.js"
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/usuario/listar/:id", UsuariosController.listarUsuarioPorId);
router.get("/usuario/listar", UsuariosController.listarUsuarios);
router.post("/usuario/cadastrar", UsuariosController.cadastrarUsuario);
router.put("/usuario/atualizar/:id", authenticate, UsuariosController.atualizarUsuario);
router.delete("/usuario/deletar/:id", authenticate, UsuariosController.removerUsuario);

export default router;