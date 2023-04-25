import { PrismaClient, Ficha } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import { EXAME_REALIZADO } from "../constants/situacoes";

const prisma = new PrismaClient();

async function findAll(req: Request, res: Response) {
  const fichas = await prisma.ficha.findMany();
  res.json({ data: fichas });
}

const fichaUpdateSchema = z.object({
  situacao: z
    .object({
      id: z.string(),
    })
    .optional(),
  observacao: z.string().optional(),
  notaOlhoDireito: z.number().optional(),
  notaOlhoEsquerdo: z.number().optional(),
});

async function update(req: Request, res: Response) {
  const id = req.params.id;
  const { situacao, observacao, notaOlhoDireito, notaOlhoEsquerdo } =
    fichaUpdateSchema.parse(req.body);

  const data: Partial<Ficha> = {
    observacao,
    notaOlhoDireito,
    notaOlhoEsquerdo,
  };

  // VALIDA SE EXAME FOI REALIZADO
  if (situacao?.id == EXAME_REALIZADO) {
    data.exameRealizado = true;
  }

  // VERIFICA OCUIDADE
  if (!!notaOlhoDireito && !!notaOlhoEsquerdo) {
    const notaTotal = notaOlhoDireito + notaOlhoEsquerdo;

    // TODO: coloca a regra aqui
    if (notaTotal > 20) {
      data.apresentaProblema = true;
    }
  }

  // VERIFICA SE TEM SITUACAO
  if (situacao) {
    data.situacaoId = situacao.id;
  }

  await prisma.ficha.update({
    where: { id },
    data: {
      ...data,
    },
  });
}

async function importXLS(req: Request, res: Response) {
  res.json({ message: "OK" });
}

export const FichaController = {
  findAll,
  update,
  importXLS,
};
