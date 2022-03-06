import React, { useEffect } from "react";
import { reportTopBar } from "../styles/report";
import { ReactComponent as CloseIcon } from "../raws/close_x.svg";
import HighchartsReact from "highcharts-react-official";
import HighCharts from "highcharts";
import Table from "./Table";

function TopBar({ setReport }) {
  return (
    <div style={reportTopBar()}>
      <div style={{ marginLeft: "5px" }} />
      <CloseIcon
        style={{ cursor: "pointer" }}
        onClick={() => setReport(null)}
      />
      <span style={{ flex: "1 1 auto" }} />
    </div>
  );
}

function Report({ report, setReport }) {
  useEffect(function () {
    const cr = document.getElementsByClassName("highcharts-credits");
    cr[0].style.diplay = "none";
  }, []);
  return (
    <div>
      <TopBar setReport={setReport} />
      <div style={{ width: "250px", height: "250px", margin: "auto" }}>
        <HighchartsReact
          highcharts={HighCharts}
          style={{ width: "250px", height: "250px", margin: "auto" }}
          containerProps={{
            style: {
              width: "250px",
              height: "250px"
            }
          }}
          options={{
            chart: {
              type: "pie",
              plotBackgroundColor: null,
              plotBorderwidth: null,
              plotShadow: false
            },
            title: {
              text: ""
            },
            series: [
              {
                name: "Recon",
                colorByPoint: true,
                data: [
                  {
                    name: "Pass",
                    y: report.pass.length,
                    sliced: true
                  },
                  {
                    name: "Fail",
                    y: report.fail.length,
                    sliced: true
                  },
                  {
                    name: "Unknown",
                    y: report.unknow.length,
                    sliced: true
                  }
                ]
              }
            ]
          }}
        />
      </div>
      <Table title="Pass" data={report.pass} />
      <Table title="Fail" data={report.fail} />
      <Table title="Unknown" data={report.unknow} />
    </div>
  );
}

export default Report;
