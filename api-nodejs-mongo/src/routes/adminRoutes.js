import express from "express";
import authenticate from "../middlewares/authenticate.js";
import AdminController from "../controller/AdminController.js";

const router = express.Router();

router.post('/admin/criar-admin-padrao', async (req, res) => {
    try {
      await AdminController.criarAdminPadrao();
      res.status(200).json({ message: 'Administrador padrão criado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar administrador padrão.' });
    }
  });
router.post("/admin/registro",authenticate, AdminController.criarAdmin);
router.delete("/admin/exluir/:id", authenticate, AdminController.excluirNaoAdmin);

export default router;