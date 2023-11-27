import express from "express";
import AutenticacaoController from "../controller/autenticacaoController.js";

const router = express.Router();

router.get("/", (req, res) => {
 res.status(200).json({ msg: "Blog api Denis" });
});

router.post("/autenticacao/login", AutenticacaoController.login);

export default router;