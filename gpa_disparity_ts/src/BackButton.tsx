import { Stack, Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
      
    </div>
  );
};

export default BackButton;


