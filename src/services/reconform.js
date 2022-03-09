import { checkReconAbility, getMathchedHeaders, reconReport } from "./recon";
import { excelFileToArrayBuffer, workBookToJson } from "./sheet";

async function data12(file1, file2) {
  const ab = await excelFileToArrayBuffer(file1);
  const ab2 = await excelFileToArrayBuffer(file2);
  const json1 = await workBookToJson(ab);
  const json2 = await workBookToJson(ab2);
  const data1 = json1[Object.keys(json1)[0]];
  const data2 = json2[Object.keys(json2)[0]];
  return [data1, data2];
}

export async function validate4Recon(file1, file2) {
  const data = await data12(file1, file2);
  return await checkReconAbility(data[0], data[1]);
}

export async function columnOptions(file1, file2) {
  const data = await data12(file1, file2);
  return getMathchedHeaders(data[0], data[1]);
}

export async function generateReport(matchHeader, recomHeader, file1, file2) {
  const data = await data12(file1, file2);
  return reconReport(data[0], data[1], matchHeader, recomHeader);
}
