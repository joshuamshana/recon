async function validate(data1, data2) {
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
 * @param {Array} data1
 * @param {array} data2
 * @returns {Promise<boolean>}
 */
export async function checkReconAbility(data1, data2) {
  await validate(data1, data2);
  const matchHeaders = getMathchedHeaders(data1, data2);
  return Array.isArray(matchHeaders) && matchHeaders.length > 0;
}
