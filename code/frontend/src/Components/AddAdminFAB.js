import * as React from "react";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import TextField from "@mui/material/TextField";
import * as AdminAPI from "../APIs/AdminAPI.js";


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

const steps = [
  {
    label: "Enter JHED",
    description: `JHED`,
    id: 'jhed'
  },
  {
    label: "Enter Department",
    description: `Department`,
    id: 'department'
  },
];

export default function AddAdminFAB() {
  const [open, setOpen] = React.useState(false);
  const [dbPayload, setPayload] = React.useState({
    jhed: '',
    department: null
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = async (e, index) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if(index === steps.length - 1) {
      const returnVal = await AdminAPI.create(dbPayload);
      setPayload({
        ...dbPayload,
        ["returnVal"]: returnVal
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setPayload({
      jhed: '',
      department: null,
    });
  };

  const handleChange = (event) => {
    /*
    At each step in the stepper, this function will add the text field's input to the dbPayload
    state variable, which gets sent to the backend
    */
    const value = event.target.value;
    setPayload({
      ...dbPayload,
      [event.target.name]: value
    });
  };

  const showResult = (val) => {
    if (val === 'P2002') {
      return ((
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>Error: Admin with entered jhed already exists.</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
      ));
    } else if (val === 'P2003') {
      return ((
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>Error: Department with entered title doesn't exist.</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
      ));
    } else {
      return ((
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>Successfully Added Admin!</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
      ));
    }
  };

  return (
    <>
      <Fab
        variant="extended"
        aria-label="add"
        sx={{ backgroundColor: "#61DAFB" }}
        onClick={handleOpen}
      >
        <AddIcon /> Add Admin
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Admin
          </Typography>
          <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === steps.length - 1 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <TextField
                      id="standard-basic"
                      label={dbPayload[step.id] === '' ? step.description: dbPayload[step.id]}
                      variant="standard"
                      name = {step.id}
                      onChange={handleChange}
                    />
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={(e) => handleNext(e, index)}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? "Finish" : "Continue"}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && showResult(dbPayload["returnVal"])}
          </Box>
        </Box>
      </Modal>
    </>
  );
}
