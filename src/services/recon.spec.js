import { getSheetFile } from "../test";
import { checkReconAbility } from "./recon";
import { excelFileToArrayBuffer, workBookToJson } from "./sheet";

describe("ReconService", function () {
  describe("checkReconAbility", function () {
    it("should fail if data1 is null", (done) => {
      checkReconAbility(null, null).catch((reason) => {
        expect(reason.message).toBe("data1 is required");
        done();
      });
    });
    it("should fail if data1 is undefined", (done) => {
      checkReconAbility(undefined, null).catch((reason) => {
        expect(reason.message).toBe("data1 is required");
        done();
      });
    });
    it("should fail if data1 is number", (done) => {
      checkReconAbility(1, null).catch((reason) => {
        expect(reason.message).toBe("data1 is required");
        done();
      });
    });
    it("should fail if data1 is string", (done) => {
      checkReconAbility("", null).catch((reason) => {
        expect(reason.message).toBe("data1 is required");
        done();
      });
    });
    it("should fail if data1 is map", (done) => {
      checkReconAbility({}, null).catch((reason) => {
        expect(reason.message).toBe("data1 is required");
        done();
      });
    });
    it("should fail if data1 is function", (done) => {
      checkReconAbility(() => {}, null).catch((reason) => {
        expect(reason.message).toBe("data1 is required");
        done();
      });
    });
    it("should fail if data2 is null", (done) => {
      checkReconAbility([], null).catch((reason) => {
        expect(reason.message).toBe("data2 is required");
        done();
      });
    });
    it("should fail if data2 is undefined", (done) => {
      checkReconAbility([], undefined).catch((reason) => {
        expect(reason.message).toBe("data2 is required");
        done();
      });
    });
    it("should fail if data2 is number", (done) => {
      checkReconAbility([], 2).catch((reason) => {
        expect(reason.message).toBe("data2 is required");
        done();
      });
    });
    it("should fail if data2 is string", (done) => {
      checkReconAbility([], "1").catch((reason) => {
        expect(reason.message).toBe("data2 is required");
        done();
      });
    });
    it("should fail if data2 is map", (done) => {
      checkReconAbility([], {}).catch((reason) => {
        expect(reason.message).toBe("data2 is required");
        done();
      });
    });
    it("should fail if data2 is function", (done) => {
      checkReconAbility([], () => {}).catch((reason) => {
        expect(reason.message).toBe("data2 is required");
        done();
      });
    });
    it("should return true if recon check pass", async () => {
      const file = await getSheetFile("test1.xlsx");
      const file2 = await getSheetFile("test1.xlsx");
      const ab = await excelFileToArrayBuffer(file);
      const ab2 = await excelFileToArrayBuffer(file2);
      const json1 = await workBookToJson(ab);
      const json2 = await workBookToJson(ab2);
      const data1 = json1[Object.keys(json1)[0]];
      const data2 = json2[Object.keys(json2)[0]];
      const is = await checkReconAbility(data1, data2);
      expect(is).toEqual(true);
    });
    it("should return false if recon check fail", async () => {
      const file = await getSheetFile("test1.xlsx");
      const file2 = new File([""], "test3.xlxs");
      const ab = await excelFileToArrayBuffer(file);
      const ab2 = await excelFileToArrayBuffer(file2);
      const json1 = await workBookToJson(ab);
      const json2 = await workBookToJson(ab2);
      const data1 = json1[Object.keys(json1)[0]];
      const data2 = json2[Object.keys(json2)[0]];
      const is = await checkReconAbility(data1, data2);
      expect(is).toEqual(false);
    });
  });
});
