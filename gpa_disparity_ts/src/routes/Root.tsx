import DropDown from "../dropdown";
import { useState } from "react";
import {
  retrieveGpasFromApi,
  retrieveSubjectsFromApi,
} from "../utility/MockData";
import BubbleChart from "../components/BubbleChart";
import { fetchGPAInfo, fetchSubjects } from "../network/DataFetcher";

function Root() {
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
}

export default Root;
