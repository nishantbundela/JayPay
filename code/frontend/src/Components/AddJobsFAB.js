import * as React from "react";
import Paper from "@mui/material/Paper";
import Fab from '@mui/material/Fab';
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
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
      label: "Enter Job ID",
      description: `Job ID`,
      id: 'job_id'
    },
    {
      label: "Enter Role Title",
      description: "Role Title",
      id: 'role_title'
    },
    {
      label: "Enter Employer JHED",
      description: `Employer JHED`,
      id: 'ejhed'
    },
    {
      label: "Enter Admin JHED",
      description: `Admin JHED`,
      id: 'ajhed'
    },
    {
      label: "Enter Wage",
      description: "Wage",
      id:'wage'
    },
    {
      label: "Enter Hour Limit",
      description: `Hour Limit`,
      id: 'hour_limit'
    },
    {
      label: "Enter Department",
      description: `Department`,
      id: 'department_title'
    },
    {
      label: "Job Active?",
      description: `Job Active`,
      id: 'job_active'
    },
    {
      label: "Grant ID",
      description: `Grant ID`,
      id: 'grant_id'
    }
  ];

export default function AddJobFAB({updates, updater}) {

    const [open, setOpen] = React.useState(false);
    const [dbPayload, setPayload] = React.useState({job_id:'', 
    role_title:'', 
    jhed: null, ejhed:'', 
    ajhed:'', wage:'', 
    hour_limit: '', 
    department_title: '', 
    job_active: '', grant_id:''});

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      updater(2)
      console.log(updates)
      setOpen(false);
    }
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = async (e, index) => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        console.log(index)
        if(index === 8) { //Hacky way of doing this since we know the last index is 8
          const ret = await JobAPI.create(dbPayload)
          setPayload({
            ...dbPayload,
            ["returnVal"]: ret
          })
          console.log('attempted DB update')
          console.log(ret)
        }
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };

      const showResult = (val) => {
        console.log(val)
        if (val === 400) {
          return ((
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>Error: Job with entered ID already exists.</Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          ));
        } else if (val === 'P2003') {
          return ((
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>Error: Foreign Key Constraint Failed.</Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          ));
        } else {
          return ((
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>Successfully Added Job!</Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          ));
        }
      }
    
      const handleReset = () => {
        setActiveStep(0);
        setPayload({job_id:'', 
        role_title:'', 
        jhed: null, ejhed:'', 
        ajhed:'', wage:'', 
        hour_limit: '', 
        department_title: '', 
        job_active: '', grant_id:''})
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

      const handleClick = () => {
        updater(1);
        console.log(updates);
        handleOpen();
      }

    return(
        <>
        <Fab align="centre" variant="extended" aria-label="add" sx = {{backgroundColor: "#61DAFB"}} onClick={handleClick}>
            <AddIcon/> Create New Job
        </Fab>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Employees
            </Typography>
        <Box sx={{ maxWidth: 400
        
        }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                    <StepLabel
                        optional={
                            index === 8 ? (<Typography variant="caption">Last step</Typography>) : null
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
    )
}