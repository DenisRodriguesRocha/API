import express from "express";
import authenticate from "../middlewares/authenticate.js";
import PublicacaoController from "../controller/PublicacaoController.js";

const router = express.Router();

router.get("/publicao/listar/:id", PublicacaoController.listarPublicacoesPorId);
router.get("/publicacao/listar", PublicacaoController.listarPublicacoes);
router.post("/publicacao/cadastrar", authenticate, PublicacaoController.cadastrarPublicacao);
router.put("/publicacao/atualizar/:id", authenticate, PublicacaoController.atualizarPublicacao);
router.delete("/publicacao/deletar/:id", authenticate, PublicacaoController.removerPublicacao);

export default router;