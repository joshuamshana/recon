import React, { useState } from "react";
import ReconForm from "./components/Reconform";
import Report from "./components/Report";
import { appContainer } from "./styles";

export default function App() {
  const [report, setReport] = useState();

  return (
    <div style={appContainer()}>
      {report ? (
        <Report report={report} setReport={setReport} />
      ) : (
        <ReconForm setReport={setReport} />
      )}
    </div>
  );
}
