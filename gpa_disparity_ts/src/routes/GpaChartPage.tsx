import DropDown from "../components/Dropdown";
import { useState } from "react";
import GpaChart from "../components/GpaChart/GpaChart";
import { fetchGPAInfo, fetchSubjects } from "../network/DataFetcher";
import { ClassVals } from "../components/GpaChart/utility/GpaChartUtility";
import { Legend } from "../components/Legend";

const GpaChartPage = () => {
  const [subject, setSubject] = useState<string | number>("");
  const [extrema, setExtrema] = useState<ClassVals>({
    min_size: 0,
    max_size: 0,
  });

  return (
    <div
      className="root"
      style={{
        maxHeight: "100vh",
        minHeight: "100vh",
        paddingLeft: "4rem",
        paddingRight: "4rem",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <GpaChart
          subject={subject as string}
          retrieveGpasFromDb={fetchGPAInfo}
          setExtrema={setExtrema}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "3.3rem",
        }}
      >
        <DropDown
          retrieveMenuItems={fetchSubjects}
          value={subject}
          setValue={setSubject}
          label="Subject"
        />
        <Legend extrema={extrema} />
      </div>
    </div>
  );
};

export default GpaChartPage;
