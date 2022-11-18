import * as React from "react";
import Paper from "@mui/material/Paper";
import MaterialTable from '@material-table/core'
import EmployerReminderModal from "./EmployerReminderNotificationModal";
import {Link} from '@material-ui/core'
import * as TimesheetAPI from '../../APIs/TimesheetAPI';
import Button from "@mui/material/Button";



// const columns = [
//   {field: 'jhed', title: 'JHED'},
//   {field: 'first', title: 'First Name'},
//   {field: 'last', title: 'Last Name'},
//   {field: 'jobID', title: 'Job ID'},
//   {field: 'jobName', title: 'Job Name'},
//   {field: 'date', title: 'Date'},
//   {field: 'start_hours', title: 'Start Hour', type: 'string'},
//   {field: 'end_hours', title: 'End Hour', type: 'string'},
//   {field: 'totalHours', title: 'Total Hours', type: 'string'},
//   {field: 'approval', title:'Approval Status', type: 'boolean'}
// ];

/*
The below is all dummy data to be filled in by the database
*/

export default function TimesheetTable() {
  const dummyData = [
    {jhed: '123A45', first_name: 'Jay', last_name: 'Pay', job_id: '123456', job_title: 'OOSE CA', date: '4/8/2022', start_hours: '4:00', end_hours: '6:00', totalHours: '2.0', approval: true},
  ];

  const columns = [
    {field: 'jhed', title: 'JHED', defaultFilter: ""},
    {field: 'first_name', title: 'First Name'},
    {field: 'last_name', title: 'Last Name'},
    {field: 'job_id', title: 'Job ID'},
    {field: 'job_title', title: 'Job Name'},
    {field: 'start_hours', title: 'Start Hours'},
    {fiels: 'end_hours', title: 'End Hours'},
    {field: 'total_hours', title: 'Total Hours Logged', type: 'double'},
    {field: 'submit_status', title: 'Submit Status', type: 'boolean'},
    {field: 'approval', title:'Approval Status', editable: 'false', render:rowData => (<DisableButton jhed={rowData.jhed}/>)},
    //{field: 'Email', title:'Send Email', editable: 'false', render: (rowData) => rowData && (<ApproveEmail/>)}
  ];

  function DisableButton(props) {    // Approve button function
    const [status, setStatus] = React.useState('Approve');
    const submitEmail = async (e) => {
    const mailerState = { jhed: props.jhed,
    msg: "Your timesheet has been approved!" }
      status === 'Approve' ? setStatus('Disapprove') : setStatus('Approve')
      //TimesheetAPI.updateApprovalStatus()
      e.preventDefault();
      console.log({ mailerState });
      const response = await fetch("http://localhost:3001/send", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ mailerState }),
      })
        .then((res) => res.json())
        .then(async (res) => {
          const resData = await res;
          console.log(resData);
          if (resData.status === "success") {
            alert(`Message Sent`);
          } else if (resData.status === "fail") {
            alert(`Message Not Sent`);
          }
        })
        // .then(() => {
        //   setMailerState({
        //     jhed : "",
        //   });
        // });
    };
    return (
      <Button onClick={submitEmail} variant='contained' color = {status === 'Approve' ? 'primary' : 'error'} fullWidth>{status}</Button>
      )  
    }
    
    // function Jhedlink (props) {
    //   const value = props.jhed
    //   function linkclick () {
    //     childToParent(linkinfo)
    //   }

    //   return (<Button variant="text" onClick={linkclick} fullWidth>Timesheets</Button>)
    // }

   
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <MaterialTable columns = {columns} data = {dummyData} title = "Timesheet View"
      options = {{filtering: true}}
      /> 
      <EmployerReminderModal onChange = {EmployerReminderModal()}/>
    </Paper>
  );
}
