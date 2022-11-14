import DropDown from "../components/Dropdown";
import { useState } from "react";
import GpaChart from "../components/GpaChart/GpaChart";
import { fetchGPAInfo, fetchSubjects } from "../network/DataFetcher";

const GpaChartPage = () => {
  const [subject, setSubject] = useState<string | number>("");

  return (
    <div className="root">
      {/* Holds our root component*/}
      <DropDown
        retrieveMenuItems={fetchSubjects}
        value={subject}
        setValue={setSubject}
        label="Subject"
      />
      <GpaChart subject={subject as string} retrieveGpasFromDb={fetchGPAInfo} />{" "}
    </div>
  );
};

export default GpaChartPage;
