import React from "react";
import Label from "./Label";

function Table({ title, data }) {
  // useEffect(function () {
  //   console.log(data);
  // }, []);

  return (
    <div>
      <Label text={title} />
      <div
        style={{
          margin: "auto",
          maxWidth: "350px",
          width: "90%",
          textAlign: "start",
          background: "#FFFFFF",
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "4px",
          marginBottom: "10px"
        }}
      >
        <table>
          <thead>
            <tr>
              <td style={{ padding: "5px" }}>Reference</td>
              <td style={{ padding: "5px" }}>Expected</td>
              <td style={{ padding: "5px" }}>Actual</td>
            </tr>
          </thead>
          <tbody>
            {data.map((x) => {
              return (
                <tr style={{ border: "1px solid #000" }} key={Math.random()}>
                  <td style={{ padding: "5px" }}>{x.ref}</td>
                  <td style={{ padding: "5px" }}>{x.expect}</td>
                  <td style={{ padding: "5px" }}>{x.actual}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
