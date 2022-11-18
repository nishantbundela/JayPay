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
import * as JobAPI from "../APIs/JobAPI.js";

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
  ];
  
export default function AssignEmployeeFAB(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [dbPayload, setPayload] = React.useState({jhed: null, job_id: props.id});


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const handleNext = async () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
        const returnVal = await JobAPI.assignEmployee(dbPayload.job_id, dbPayload.jhed);
        setPayload({
            ...dbPayload,
            ["returnVal"]: returnVal
        });
    };

  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    // const handleReset = () => {
    //   setActiveStep(0);
    // };

    const handleReset = () => {
        setActiveStep(0);
        setPayload({jhed:'',job_id: props.id})
    };

    const handleChange = async (event) => {
        const value = event.target.value;
        setPayload({
            ...dbPayload,
            [event.target.name]: value
        });
      };

    const showResult = (val) => {
        if (val === 'P2003') {
            return ((
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>Error: Employee with entered JHED does not exist.</Typography>
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
        <Button onClick={handleOpen}>Assign</Button>
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
            <Box sx={{ maxWidth: 400 }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      optional={
                        index === 0 ? (
                          <Typography variant="caption"></Typography>
                        ) : null
                      }
                    >
                      {step.label}
                    </StepLabel>
                    <StepContent>
                    <TextField
                      id="standard-basic"
                      label={dbPayload[step.id] == '' ? step.description: dbPayload[step.id]}
                      variant="standard"
                      name = {step.id}
                      onChange={handleChange}
                    />
                      <Box sx={{ mb: 2 }}>
                        <div>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            {index === steps.length - 1 ? 'Assign' : 'Continue'}
                          </Button>
                          {/* <Button
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Back
                          </Button> */}
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