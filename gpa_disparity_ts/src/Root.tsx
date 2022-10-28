import DropDown from "./dropdown";
import BubbleChart from "./BubbleChart";
import { useState } from "react";

function retrieveSubjectsFromDB() {
    return ["CS", "ECE", "ME", "MEB"];
  }

const [subject, setSubject] = useState<string | number>("CS");
// is set course number needed?
const [course_number, /*setCourseNubmer*/] = useState(0);

function Root() {
    return (
      <div className="root">
        {/* Holds our root component*/}
        <DropDown
        retrieveMenuItems={retrieveSubjectsFromDB}
        value={subject}
        setValue={setSubject}
        label="Subject"
      />
      <BubbleChart /> 
      </div>
    );
  };

  export default Root;