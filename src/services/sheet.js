import * as XLSX from "xlsx";

async function validateWorkBookData(data) {
  if (data === null || data === undefined || data === "") {
    throw { message: "workbook data required" };
  }
}

/**
 *
 * @param {ArrayBuffer} data
 * @returns {Promise<{
 *  [name: string]: Array<Array<string>>
 * }>}
 */
export async function workBookToJson(data) {
  await validateWorkBookData(data);
  const workbook = XLSX.read(data);
  var result = {};
  workbook.SheetNames.forEach(function (sheetName) {
    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1
    });
    if (roa.length) result[sheetName] = roa;
  });
  return result;
}

/**
 *
 * @param {File} file
 * @returns {Promise<ArrayBuffer>}
 */
export async function excelFileToArrayBuffer(file) {
  if (!(file instanceof File)) {
    throw { message: "data is not file" };
  }
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e.toString());
    reader.readAsArrayBuffer(file);
  });
}
