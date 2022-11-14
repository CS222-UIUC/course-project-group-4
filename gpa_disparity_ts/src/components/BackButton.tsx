import { Stack, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  // figure out later what type should be
  onClick?: () => void;
}

function BackButton(props: ButtonProps) {
  const navigate = useNavigate();
  const default_onClick = () => {
    navigate(-1);
  };
  const { onClick = default_onClick } = props;
  return (
    <div className="back-button">
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}
      >
        <Button
          onClick={onClick}
          variant="contained"
          startIcon={<ArrowBackIcon />}
          color="primary"
          size="medium"
        >
          {" "}
          Back{" "}
        </Button>
      </Stack>
    </div>
  );
}

export default BackButton;
