import React, { useEffect, useState } from "react";
import { columnOptions, validate4Recon } from "../services/reconform";
import { selectContainer } from "../styles";
import { reconFormContainer } from "../styles/reconform";
import FileInput from "./fileinput";
import Label from "./label";

function ValidateButton({ validateP, onClick }) {
  return (
    <button
      disabled={validateP}
      onClick={onClick}
      style={{
        background: "#00F0FF",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "4px",
        width: "100%",
        height: "30px"
      }}
    >
      <span
        style={{
          fontFamily: "Roboto",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: "16px",
          lineHeight: "19px",
          color: "#000000"
        }}
      >
        {validateP ? "Wait..." : "Validate for reconcilation"}
      </span>
    </button>
  );
}

function ReportButton({ mH, rH, onClick }) {
  const [progress, setProgress] = useState(false);
  return (
    <button
      disabled={progress}
      onClick={() => {
        if (!mH || mH === "") {
          alert("Choose match column");
          return;
        }
        if (!rH || rH === "") {
          alert("Choose reconcile column");
          return;
        }
        setProgress(true);
      }}
      style={{
        background: "#00F0FF",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "4px",
        width: "100%",
        height: "30px"
      }}
    >
      <span
        style={{
          fontFamily: "Roboto",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: "16px",
          lineHeight: "19px",
          color: "#000000"
        }}
      >
        {progress ? "Wait..." : "Run reconcilation"}
      </span>
    </button>
  );
}

function FinalizeForm({
  file1,
  file2,
  matchHeader,
  reconHeader,
  setMatchHeader,
  setReconHeader
}) {
  const [mH, setMh] = useState([]);
  const [rH, setRh] = useState([]);
  useEffect(
    function () {
      columnOptions(file1, file2).then((o) => {
        o.unshift("");
        setMh(o);
        setRh(o);
      });
    },
    [file1, file2]
  );
  return (
    <div
      style={{
        marginTop: "10px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Label text={"Match column"} />
      <select
        onChange={(e) => {
          setMatchHeader(e.target.value);
        }}
        style={selectContainer()}
      >
        {mH.map((x) => {
          return (
            <option key={x} value={x}>
              {x}
            </option>
          );
        })}
      </select>
      <Label text={"Reconcile column"} />
      <select
        onChange={(e) => {
          setReconHeader(e.target.value);
        }}
        style={selectContainer()}
      >
        {rH.map((y) => {
          return (
            <option key={y} value={y}>
              {y}
            </option>
          );
        })}
      </select>
      <ReportButton mH={matchHeader} rH={reconHeader} />
    </div>
  );
}

function ReconForm() {
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [validateP, setValidateP] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [mH, setMh] = useState();
  const [rH, setRh] = useState();

  return (
    <div style={reconFormContainer()}>
      <Label text={"Source"} />
      <FileInput
        label={file1 ? file1.name : "File 1"}
        setFile={(f) => {
          setFile1(f);
          setIsValid(false);
          setMh(null);
          setRh(null);
        }}
      />
      <Label text={"Compare with"} />
      <FileInput
        label={file2 ? file2.name : "File 2"}
        setFile={(f) => {
          setFile2(f);
          setIsValid(false);
          setMh(null);
          setRh(null);
        }}
      />
      {isValid ? (
        <FinalizeForm
          setMatchHeader={setMh}
          setReconHeader={setRh}
          matchHeader={mH}
          reconHeader={rH}
          file1={file1}
          file2={file2}
        />
      ) : (
        <ValidateButton
          onClick={() => {
            if (!file1) {
              alert("Upload file 1");
              return;
            }
            if (!file2) {
              alert("Upload file 2");
              return;
            }
            setValidateP(true);
            validate4Recon(file1, file2)
              .then((v) => {
                setIsValid(v);
              })
              .catch((reason) => {
                alert(reason.message);
              })
              .finally(() => {
                setValidateP(false);
              });
          }}
          validateP={validateP}
        />
      )}
    </div>
  );
}

export default ReconForm;
