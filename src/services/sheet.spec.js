import { getSheetFile } from "../test";
import { excelFileToArrayBuffer, workBookToJson } from "./sheet";

describe("SheetService", function () {
  describe("workBookToJson", function () {
    it("fail if data is null", (done) => {
      workBookToJson(null).catch((reason) => {
        expect(reason.message).toBe("workbook data required");
        done();
      });
    });
    it("fail if data is undefined", (done) => {
      workBookToJson(undefined).catch((reason) => {
        expect(reason.message).toBe("workbook data required");
        done();
      });
    });
    it("fail if data is empty string", (done) => {
      workBookToJson("").catch((reason) => {
        expect(reason.message).toBe("workbook data required");
        done();
      });
    });
    it("should return json if workdata is valid", async () => {
      const file = await getSheetFile("test1.xlsx");
      const ab = await excelFileToArrayBuffer(file);
      const json = await workBookToJson(ab);
      expect(json).toBeInstanceOf(Object);
      expect(Object.keys(json)).toHaveLength(1);
      expect(json[Object.keys(json)[0]]).toHaveLength(4);
      expect(json[Object.keys(json)[0]][0]).toEqual([
        "Account",
        "Operating date",
        "Value date",
        "reference",
        "Description",
        "Debit",
        "Credit",
        "Relative reference"
      ]);
    });
  });
  describe("excelFileToArrayBuffer", function () {
    it("should fail if file is null", (done) => {
      excelFileToArrayBuffer(null).catch((reason) => {
        expect(reason.message).toBe("data is not file");
        done();
      });
    });
    it("should fail if file is undefined", (done) => {
      excelFileToArrayBuffer(undefined).catch((reason) => {
        expect(reason.message).toBe("data is not file");
        done();
      });
    });
    it("should fail if file is string", (done) => {
      excelFileToArrayBuffer("").catch((reason) => {
        expect(reason.message).toBe("data is not file");
        done();
      });
    });
    it("should fail if file is number", (done) => {
      excelFileToArrayBuffer(1).catch((reason) => {
        expect(reason.message).toBe("data is not file");
        done();
      });
    });
    it("should fail if file is function", (done) => {
      excelFileToArrayBuffer(() => {}).catch((reason) => {
        expect(reason.message).toBe("data is not file");
        done();
      });
    });
    it("should fail if file is object", (done) => {
      excelFileToArrayBuffer({}).catch((reason) => {
        expect(reason.message).toBe("data is not file");
        done();
      });
    });
    it("should return array buffer from file", async () => {
      const file = new File(["test"], "test.txt");
      const ab = await excelFileToArrayBuffer(file);
      expect(ab).toBeInstanceOf(ArrayBuffer);
    });
  });
});
