import express from "express";
import authenticate from "../middlewares/authenticate.js";
import PublicacaoController from "../controller/PublicacaoController.js";

const router = express.Router();

router.get("/publicao/:id", PublicacaoController.listarPublicacoesPorId);
router.get("/publicacao", PublicacaoController.listarPublicacoes);
router.post("/publicacao/registro", authenticate, PublicacaoController.cadastrarPublicacao);
router.put("/publicacao/:id", authenticate, PublicacaoController.atualizarPublicacao);
router.delete("/publicacao/:id", authenticate, PublicacaoController.removerPublicacao);

export default router;