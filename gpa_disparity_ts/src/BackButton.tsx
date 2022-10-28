import {Stack, Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Routes, Route} from 'react-router-dom';

interface ButtonProps {
  // figure out later what type should be
  onClick : any
}

function BackButton(props: ButtonProps) {
  return (
    <div className="back-button">
      {/* using stack just to adjust the position of button, 
      especially if we add forward button or others in future */}
      <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
        <Button onClick = {props.onClick} class = 'contained' startIcon = {<ArrowBackIcon/>}
      color = 'primary' size = 'medium'> <ArrowBackIcon/> </Button>
      </Stack>

      <Routes>
        {/* root path */}
        <Route path="/" />
        {/* spefic course path */}
        <Route path="courseinfo/:subject/:course_number" />
      </Routes>
    </div>
  );
};

export default BackButton;


