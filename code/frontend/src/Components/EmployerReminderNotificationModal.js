import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SendIcon from '@mui/icons-material/Send';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function EmployerReminderModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
        <Fab
        variant="extended"
        aria-label="add"
        sx={{ backgroundColor: "#61DAFB" }}
        onClick={handleOpen}
      >
        <SendIcon /> Send Reminder Notifications
      </Fab>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Send Reminder Notifications to:
            </Typography>
            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="All Employees" />
                <FormControlLabel control={<Checkbox />} label="Only Unsubmitted Employees" />
            </FormGroup>
            <Button variant="text">Send Notification</Button>
        </Box>
      </Modal>
    </div>
  );
}
