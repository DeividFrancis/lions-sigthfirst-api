/*
  Warnings:

  - A unique constraint covering the columns `[descricao]` on the table `Situacao` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `exameRealizado` to the `Ficha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turno` to the `Ficha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ficha" ADD COLUMN     "exameRealizado" BOOLEAN NOT NULL,
ADD COLUMN     "turno" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Situacao_descricao_key" ON "Situacao"("descricao");
