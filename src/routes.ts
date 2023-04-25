import { Request, Response, Router, response } from "express";
import { FichaController } from "./controllers/FichaController";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router();

router.get("/ficha", FichaController.findAll);
router.put("/ficha/:id", FichaController.update);
router.put("/ficha/importacao", FichaController.importXLS);

router.get("/situacao", async (_, res: Response) => {
  const data = await prisma.situacao.findMany();
  res.json(data);
});

export { router };
