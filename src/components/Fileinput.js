import React, { useState } from "react";
import { ReactComponent as UploadIcon } from "../raws/upload_file.svg";
import { ReactComponent as RemoveIcon } from "../raws/remove.svg";
import { fileInputContainer, inputButton } from "../styles/fileinput";

function FileInput({ label, setFile }) {
  const inputRef = React.createRef();
  const [fx, setFx] = useState(false);
  return (
    <div>
      <div
        style={{
          marginBottom: "10px",
          ...fileInputContainer()
        }}
      >
        <div style={{ flexGrow: 1, padding: "1px", textAlign: "start" }}>
          <div style={{ flexGrow: 1, textAlign: "start" }}>{label}</div>
        </div>
        <button
          style={{
            display: "inline-block",
            ...inputButton()
          }}
          onClick={(e) => {
            if (fx === true) {
              setFile(null);
              setFx(false);
              inputRef.current.value = "";
            } else {
              inputRef.current.click();
            }
          }}
        >
          {fx ? <RemoveIcon /> : <UploadIcon />}
        </button>
      </div>
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        multiple={false}
        onChange={(e) => {
          setFile(e.target.files[0]);
          setFx(true);
        }}
      />
    </div>
  );
}

export default FileInput;
