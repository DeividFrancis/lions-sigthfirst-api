-- CreateTable
CREATE TABLE "Ficha" (
    "id" TEXT NOT NULL,
    "escola" TEXT NOT NULL,
    "professor" TEXT NOT NULL,
    "turma" TEXT NOT NULL,
    "comissao" TEXT NOT NULL,
    "aluno" TEXT NOT NULL,
    "notaOlhoDireito" INTEGER NOT NULL,
    "notaOlhoEsquerdo" INTEGER NOT NULL,
    "notaOlhoTotal" INTEGER NOT NULL,
    "especial" BOOLEAN NOT NULL,
    "observacao" TEXT NOT NULL,
    "apresentaProblema" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "situacaoId" TEXT NOT NULL,

    CONSTRAINT "Ficha_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "Ficha_situacaoId_fkey" FOREIGN KEY ("situacaoId") REFERENCES "Situacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
