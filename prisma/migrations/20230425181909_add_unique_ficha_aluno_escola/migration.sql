/*
  Warnings:

  - A unique constraint covering the columns `[aluno,escola]` on the table `Ficha` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ficha_aluno_escola_key" ON "Ficha"("aluno", "escola");
