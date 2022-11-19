import DropDown from "../components/Dropdown";
import { useState } from "react";
import GpaChart from "../components/GpaChart/GpaChart";
import { fetchGPAInfo, fetchSubjects } from "../network/DataFetcher";
import { Box, Button } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

const GpaChartPage = () => {
  const [subject, setSubject] = useState<string | number>("");
  const navigate = useNavigate();

  return (
    <div
      className="root"
      style={{
        maxHeight: "100vh",
        minHeight: "100vh",
        paddingLeft: "4rem",
        paddingRight: "4rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Holds our root component*/}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: "2rem",
        }}
      >
        <DropDown
          retrieveMenuItems={fetchSubjects}
          value={subject}
          setValue={setSubject}
          label="Subject"
        />
        <Button
          onClick={() => {
            navigate("/courseinfo");
          }}
          variant="contained"
          //   startIcon={<ArrowBackIcon />}
          color="primary"
          size="medium"
        >
          Course Information
        </Button>
      </Box>
      <GpaChart subject={subject as string} retrieveGpasFromDb={fetchGPAInfo} />
    </div>
  );
};

export default GpaChartPage;
