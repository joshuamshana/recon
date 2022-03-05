/**
 *
 * @param {string} name
 * @returns {Promise<File>}
 */
export async function getSheetFile(name) {
  const fileUrl = "https://kpo1e9.csb.app/" + name;
  const r = await fetch(fileUrl);
  const blob = await r.blob();
  return new File([blob], name);
}
