import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import MenuItem from '@mui/material/MenuItem';

const freqs = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
  {
    value: '5',
    label: '5',
  },
  {
    value: '6',
    label: '6',
  },
];

const freqs_period = [
  {
    value: 'weekly',
    label: 'weekly',
  },
  {
    value: 'pay period',
    label: 'pay period',
  },
  {
    value: 'monthly',
    label: 'monthly',
  },
];

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));


export default function NotificationOptions() {
  const [value, setValue] = React.useState(null);
  const [freq, setFreq] = React.useState('1');
  const [freqPeriod, setFreqPeriod] = React.useState('weekly');

  const handleChange = (event) => {
    setFreq(event.target.value);
  };

  const handleChangePeriod = (event) => {
    setFreqPeriod(event.target.value);
  };


  return (
    
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      
      <FormGroup>
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 2.5}} defaultChecked />}
          label="Send for Overdue Timesheet"
          value="start"
        />
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 2.5 }} defaultChecked />}
          label="Send for Disapproved Timesheet"
          value="start"
        />
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 2.5 }} defaultChecked />}
          label="Send for Approved Timesheet"
          value="start"
        />
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 2.5 }} defaultChecked />}
          label="Send for Approval Reminders"
          value="start"
        />
      </FormGroup>

      <div style={{ display: "flex", verticalAlignment:'center'}}>
      <Typography m='10px' variant="h5" gutterBottom component="div">
        Send Notifications &nbsp;
        <TextField
          id="noti-freq"
          select
          value={freq}
          onChange={handleChange}
          variant="filled"
        > 
          {freqs.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        &nbsp;
        times every  
        &nbsp;
        <TextField
          id="noti-freq-period"
          select
          value={freqPeriod}
          onChange={handleChangePeriod}
          variant="filled"
        >
          {freqs_period.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        &nbsp;
        at 
        &nbsp;
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="8:00 AM"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Typography>
      </div>
      
    </Paper>
  );
}