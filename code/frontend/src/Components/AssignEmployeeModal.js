import * as React from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

export default function AssignEmployee(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [dbPayload, setPayload] = React.useState({
        jhed: '',
      });
    const handleChange = (event) => {
        const value = event.target.value;
        console.log(dbPayload)
        setPayload({
          ...dbPayload,
          [event.target.name]: value
        });
      };
    return(
        <>
        <Button onClick={handleOpen}>Assign Employee</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Assign Employee to Job
            </Typography>
            <TextField id="standard-basic" label="JHED" variant="standard" onChange = {handleChange} />
            <Button variant="text" >Done</Button>
            </Box>
        </Modal>
            </>
        

    );
}