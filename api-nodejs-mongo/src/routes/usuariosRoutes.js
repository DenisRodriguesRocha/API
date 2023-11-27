import express from "express";
import UsuariosController from "../controller/UsuariosController.js"
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/usuario/:id", UsuariosController.listarUsuarioPorId);
router.get("/usuario", UsuariosController.listarUsuarios);
router.post("/usuario/registro", UsuariosController.cadastrarUsuario);
router.put("/usuario/:id", authenticate, UsuariosController.atualizarUsuario);
router.delete("/usuario/:id", authenticate, UsuariosController.removerUsuario);

export default router;