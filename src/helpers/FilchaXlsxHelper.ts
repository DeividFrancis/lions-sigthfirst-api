import XLSX from "xlsx";

export interface FichaXlsx {
  escola: string;
  professor: string;
  aluno: string;
  turma: string;
  turno: string;
  comissao: string;
}

const CELLS = ["aluno", "escola", "turma", "turno", "professor", "comissao"];
// const CELLS =

function read(file: any) {
  const workbook = XLSX.read(file.data);

  const sheetNameList = workbook.SheetNames;
  const sheetName = sheetNameList[0];
  const sheet = workbook.Sheets[sheetName];

  // const data = XLSX.utils.sheet_to_json(sheet);

  const data = [];

  const range = XLSX.utils.decode_range(sheet["!ref"]!); // Decodifica o range das células
  for (let rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
    // Loop através das linhas da planilha
    const objFull = CELLS.reduce((obj, cellName, cellIndex) => {
      const cell = sheet[XLSX.utils.encode_cell({ r: rowNum, c: cellIndex })];

      obj[cellName] = cell?.v;
      return obj;
    }, {} as any);

    data.push(objFull);
  }

  return data as FichaXlsx[];
}

export const FichaXlsxHelper = {
  read,
};
