import { Ficha } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import { EXAME_REALIZADO, PENDENTE } from "../constants/situacoes";
import { prisma } from "~/configs/prisma";
import { FichaXlsxHelper } from "~/helpers/FilchaXlsxHelper";

const fichaFindSchema = z.object({
  escola: z.string().optional(),
  aluno: z.string().optional(),
  turma: z.string().optional(),
  turno: z.string().optional(),
  comissao: z.string().optional(),
  situacao: z.object({ id: z.string() }).optional(),
  especial: z.coerce.boolean().optional(),
  apresentaProblema: z.boolean().optional(),
  observacao: z.string().optional(),
  exameRealizado: z.coerce.boolean().optional(),
});

async function findAll(req: Request, res: Response) {
  const {
    escola,
    aluno,
    turma,
    turno,
    comissao,
    situacao,
    especial,
    apresentaProblema,
    exameRealizado,
  } = fichaFindSchema.parse(req.query);

  const fichas = await prisma.ficha.findMany({
    include: {
      situacao: true,
    },
    where: {
      escola: {
        contains: escola,
      },
      aluno: {
        contains: aluno,
      },
      turma,
      turno,
      comissao,
      situacao,
      especial,
      apresentaProblema,
      exameRealizado,
    },
  });
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

    if (notaOlhoDireito >= 25 || notaOlhoEsquerdo >= 25 || notaTotal >= 45) {
      data.apresentaProblema = true;
      data.notaOlhoTotal = notaTotal;
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

  res.json({ message: "Dados atualizado com sucesso!" });
}

async function importXLS(req: Request, res: Response) {
  const file: any = req.files?.file;

  const fichasXls = FichaXlsxHelper.read(file);
  const fichaListPromises = fichasXls.map((f) =>
    prisma.ficha.upsert({
      where: { aluno_escola: { aluno: f.aluno, escola: f.escola } },
      update: {
        ...f,
      },
      create: {
        ...f,
        situacao: {
          connect: { id: PENDENTE },
        },
      },
    })
  );

  const resDB = await Promise.all(fichaListPromises);

  res.json({ message: "OK", data: resDB });
}

export const FichaController = {
  findAll,
  update,
  importXLS,
};
