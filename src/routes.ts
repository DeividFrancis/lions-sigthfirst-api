import { Request, Response, Router, response } from "express";
import { FichaController } from "./controllers/FichaController";
import { prisma } from "./configs/prisma";
const router = Router();

router.get("/ficha", FichaController.findAll);
router.put("/ficha/:id", FichaController.update);
router.post("/ficha/upload", FichaController.importXLS);

router.get("/situacao", async (_, res: Response) => {
  const data = await prisma.situacao.findMany();
  res.json(data);
});

export { router };
