async function validateData(data1, data2) {
  if (!Array.isArray(data1)) {
    throw { message: "data1 is required" };
  }
  if (!Array.isArray(data2)) {
    throw { message: "data2 is required" };
  }
}

/**
 *
 * @param {Array} data
 * @returns {Array<string>}
 */
function getHeader(data) {
  return data[0].map((x) => x.toString().trim().toLowerCase());
}

/**
 *
 * @param {Array} data1
 * @param {Array} data2
 * @returns {Array<string>}
 */
export function getMathchedHeaders(data1, data2) {
  const header1 = getHeader(data1);
  const header2 = getHeader(data2);
  const matchHeaders = [];
  header1.forEach((h) => {
    if (header2.indexOf(h) > 0) {
      matchHeaders.push(h);
    }
  });
  return matchHeaders;
}

/**
 *
 * @param {Array} data
 * @returns {Array}
 */
function getRow(data) {
  if (Array.isArray(data) && data.length > 1) {
    return data.slice(1);
  }
  return [];
}

/**
 *
 * @param {Array} data1
 * @param {array} data2
 * @returns {Promise<boolean>}
 */
export async function checkReconAbility(data1, data2) {
  await validateData(data1, data2);
  const matchHeaders = getMathchedHeaders(data1, data2);
  return Array.isArray(matchHeaders) && matchHeaders.length > 0;
}

async function validateRow(data1, data2, mH, rH) {
  await validateData(data1, data2);
  if (typeof mH !== "string") {
    throw { message: "match header must be string" };
  }
  if (typeof rH !== "string") {
    throw { message: "recon header must be string" };
  }
}

/**
 *
 * @param {Array} data1
 * @param {array} data2
 * @param {string} matchHeader
 * @param {string} reconHeader
 * @returns {Promise<{
 *  fail: {
 *    ref: string,
 *    expect: *,
 *    actual: *
 * }[],
 *  pass: {
 *    ref: string,
 *    expect: *,
 *    actual: *
 * }[],
 * unknow: {
 *    ref: string,
 *    expect: *,
 *    actual: *
 * }[]
 * }>}
 */
export async function reconReport(data1, data2, matchHeader, reconHeader) {
  await validateRow(data1, data2, matchHeader, reconHeader);
  matchHeader = matchHeader.trim().toLowerCase();
  reconHeader = reconHeader.trim().toLowerCase();
  const headers1 = getHeader(data1);
  const headers2 = getHeader(data2);
  const mH1Index = headers1.indexOf(matchHeader);
  const rH1Index = headers1.indexOf(reconHeader);
  const mH2Index = headers2.indexOf(matchHeader);
  const rH2Index = headers2.indexOf(reconHeader);
  const rows1 = getRow(data1);
  let rows2 = getRow(data2);
  const result = {
    unknow: [],
    fail: [],
    pass: []
  };
  rows1.forEach((r1) => {
    const mH1Value = r1[mH1Index];
    const rH1Value = r1[rH1Index];
    for (const r2 of rows2) {
      const mH2Value = r2[mH2Index];
      const rH2Value = r2[rH2Index];
      if (mH1Value === mH2Value) {
        if (rH1Value === rH2Value) {
          result.pass.push({
            ref: mH1Value,
            expect: rH1Value,
            actual: rH2Value
          });
        } else {
          result.fail.push({
            ref: mH1Value,
            expect: rH1Value,
            actual: rH2Value
          });
        }
        rows2.splice(rows2.indexOf(r2), 1);
        break;
      }
    }
  });
  if (rows2.length > 0) {
    rows2.forEach((r3) => {
      result.unknow.push({
        ref: r3[mH2Index],
        expect: null,
        actual: r3[rH2Index]
      });
    });
  }
  return result;
}
