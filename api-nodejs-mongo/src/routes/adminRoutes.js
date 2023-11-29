import express from "express";
import authenticate from "../middlewares/authenticate.js";
import AdminController from "../controller/AdminController.js";

const router = express.Router();

router.post('/admin/geraradmin', async (req, res) => {
    try {
      await AdminController.gerarAdmin();
      res.status(200).json({ message: 'Administrador padrão criado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar administrador padrão.' });
    }
  });
router.get("/admin/listar",AdminController.listarAdmin)
router.post("/admin/cadastrar",authenticate, AdminController.cadastrarAdmin);
router.delete("/admin/deletarusuario/:id", authenticate, AdminController.deletarUsuario);


export default router;