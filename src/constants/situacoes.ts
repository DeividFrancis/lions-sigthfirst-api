import { Situacao } from "@prisma/client";

const PENDENTE = "clgwlidrl000008jlcmlsc3s3";
const ENTREGAR = "CLGWA2AIK0004U41WFGZC1Q08";
const OCULOS_NAO_RETIRADO = "CLGWA2AIK0002U41WB640A4M7";
const EXAME_AGENDADO = "CLGWA2AIM0006U41WP68MX4ZF";
const ENTREGUE = "CLGWA2AIZ000CU41W7GF6J5RN";
const EXAME_REALIZADO = "CLGWA2AIO000AU41W4QVKX8H7";
const ENC_RETIRAR_OCULOS = "CLGWA2AIO0008U41WB4PIWWPI";
const OCULOS_RETIRADO = "CLGWA2AHW0000U41WOFEWOKNC";
const NAO_COMPARECEU = "CLGWA2AJ1000EU41W3WCCKBRQ";

const situacoes: Situacao[] = [
  {
    id: PENDENTE,
    descricao: "Pendente",
    cor: "#f2ad46",
  },
  {
    id: ENTREGAR,
    descricao: "Entregar",
    cor: "#a358fd",
  },
  {
    id: OCULOS_NAO_RETIRADO,
    descricao: "Óculos não retirado",
    cor: "#f34c24",
  },
  {
    id: EXAME_AGENDADO,
    descricao: "Exame agendado",
    cor: "#0c3daa",
  },
  {
    id: ENTREGUE,
    descricao: "Entregue",
    cor: "#00cf84",
  },
  {
    id: EXAME_REALIZADO,
    descricao: "Exame realizado",
    cor: "##00cf84",
  },
  {
    id: ENC_RETIRAR_OCULOS,
    descricao: "Encaminhado para retirar óculos",
    cor: "#f2ad46",
  },
  {
    id: OCULOS_RETIRADO,
    descricao: "Óculos retirado",
    cor: "#00cf84",
  },
  {
    id: NAO_COMPARECEU,
    descricao: "Não compareceu",
    cor: "#f34c24",
  },
];

export {
  situacoes,
  PENDENTE,
  ENTREGAR,
  OCULOS_NAO_RETIRADO,
  EXAME_AGENDADO,
  ENTREGUE,
  EXAME_REALIZADO,
  ENC_RETIRAR_OCULOS,
  OCULOS_RETIRADO,
  NAO_COMPARECEU,
};
