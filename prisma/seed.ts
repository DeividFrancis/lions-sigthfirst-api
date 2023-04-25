import { prisma } from "../src/configs/prisma";
import { situacoes } from "../src/constants/situacoes";

async function main() {
  situacoes.forEach(async (situacao) => {
    await prisma.situacao.upsert({
      where: { descricao: situacao.descricao },
      update: situacao,
      create: situacao,
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
