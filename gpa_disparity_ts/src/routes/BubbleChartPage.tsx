import DropDown from "../components/Dropdown";
import { useState } from "react";
import BubbleChart from "../components/BubbleChart/BubbleChart";
import { fetchGPAInfo, fetchSubjects } from "../network/DataFetcher";

const BubbleChartPage = () => {
  const [subject, setSubject] = useState<string | number>("CS");

  return (
    <div className="root">
      {/* Holds our root component*/}
      <DropDown
        retrieveMenuItems={fetchSubjects}
        value={subject}
        setValue={setSubject}
        label="Subject"
      />
      <BubbleChart
        subject={subject as string}
        retrieveGpasFromDb={fetchGPAInfo}
      />{" "}
    </div>
  );
};

export default BubbleChartPage;
