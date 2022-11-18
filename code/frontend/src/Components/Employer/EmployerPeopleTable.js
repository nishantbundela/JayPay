import * as React from "react";
import Paper from "@mui/material/Paper";
import MaterialTable from '@material-table/core'
import EmployerReminderModal from "./EmployerReminderNotificationModal";
import * as EmployeeAPI from "../../APIs/EmployeeAPI";
import {Link} from '@material-ui/core'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PrintIcon from '@mui/icons-material/Print';
import GridOnIcon from '@mui/icons-material/GridOn';
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
//import AppButton from "../ApproveButton";
import Button from "@mui/material/Button";
import LinkIcon from '@mui/icons-material/Link';
import AssignEmployee from "../AssignEmployeeModal";
import * as TimesheetAPI from '../../APIs/TimesheetAPI';
import IconButton from '@mui/material/IconButton';

export default function PeopleTable() {

  // const [mailerState, setMailerState] = useState({ name: "Batman"})
  // const submitEmail = async (e) => {
  //   e.preventDefault();
  //   console.log({ mailerState });
  //   const response = await fetch("http://localhost:3001/send", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify({ mailerState }),
  //   })
  //     .then((res) => res.json())
  //     .then(async (res) => {
  //       const resData = await res;
  //       console.log(resData);
  //       if (resData.status === "success") {
  //         alert("Message Sent");
  //       } else if (resData.status === "fail") {
  //         alert("Message failed to send");
  //       }
  //     })
  //     .then(() => {
  //       setMailerState({
  //         name: "Superman",
  //       });
  //     });
  // };
  

  const [searchParams] = useSearchParams();
  const jhed = searchParams.get("jhed");

  const [data, setData] = useState([]);

  useEffect(() => {
    EmployeeAPI.getDashboard(`ejhed=${jhed}`)
        .then((employees) => {
          setData(employees);
        });
  }, [])

  // export to xlsx function
  const downloadExcel = () => {
    const newData = data.map(row => {
      delete row.tableData
      return row
    })
    const workSheet = XLSX.utils.json_to_sheet(newData)
    const workBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook, workSheet, "students")
    //Buffer
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    //Download
    XLSX.writeFile(workBook, "EmployeesInformation.xlsx")}

  // Export as Pdf function
  const downloadPdf = () => {
    const doc = new jsPDF()
    doc.text("Student Details", 20, 10)
    doc.autoTable({
      theme: "grid",
      columns: columns.map(col => ({ ...col, dataKey: col.field })),
      body: data
    })
    doc.save('EmployeesInformation.pdf')
  }

  function DisableButton(props) {    // Approve button function
    const approval = props.approval_status ? "Disapprove" : "Approve";
    const [status, setStatus] = React.useState(approval);

    const submitEmail = async (e) => {
    const mailerState = { jhed: props.jhed,
    msg: "Your timesheet has been approved!" }
      status === 'Approve' ? setStatus('Disapprove') : setStatus('Approve')
      TimesheetAPI.updateApprovalStatusCurrentPeriod(props.jhed, status);
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
    
    function Jhedlink (props) {
      const url = 'https://jaypay-lego.herokuapp.com/timesheet' + "?jhed=" + props.jhed
      function click() {
        window.open(url, '_blank');
      }
      return (
        <IconButton aria-label="See Timesheet" onClick={click}>
          <LinkIcon />
        </IconButton> )
    }
    
  
    const columns = [
      {field: 'link', title: 'View Timesheet', render:rowData=><Jhedlink jhed={rowData.jhed}/>, filtering: false},
      {field: 'jhed', title: 'JHED'},
      {field: 'first_name', title: 'First Name'},
      {field: 'last_name', title: 'Last Name'},
      {field: 'job_id', title: 'Job ID'},
      {field: 'job_title', title: 'Job Name'},
      {field: 'total_hours', title: 'Total Hours Logged', type: 'double'},
      {field: 'submit_status', title: 'Submit Status', type: 'boolean'},
      {field: 'approval_status', title:'Approval Status', render:rowData => (<DisableButton jhed={rowData.jhed} approval_status={rowData.approval_status}/>)},
      //{field: 'Email', title:'Send Email', editable: 'false', render: (rowData) => rowData && (<ApproveEmail/>)}
    ];

    // const dummyData = [
    //   {jhed: '123A45', first_name: 'Jay', last_name: 'Pay', job_id: '123456', job_title: 'OOSE CA', totalHours: '2.0', approval: true}
    // ];
  
    
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <MaterialTable columns = {columns} data = {data} title = "People Information"
      options = {{filtering: true}}
       /*
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            handleRowUpdate(newData, oldData, resolve);
      }),
      onRowAdd: (newData) =>
        new Promise((resolve) => {
          handleRowAdd(newData, resolve)
        }),
      onRowDelete: (oldData) =>
        new Promise((resolve) => {
          handleRowDelete(oldData, resolve)
        }),
      }} 

      editable={{
        
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);
              
              resolve();
            }, 1000)
          }), 
        
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);

              resolve();
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              
              resolve()
            }, 1000)
          }),
      }} */
      actions={[
          {
            icon: () => <GridOnIcon/>,// you can pass icon too
            tooltip: "Export to Excel",
            onClick: () => downloadExcel(),
            isFreeAction: true
          },
          {
            icon: () => <PrintIcon />,// you can pass icon too
            tooltip: "Export to Pdf",
            onClick: () => downloadPdf(),
            isFreeAction: true
          }

        ]}
      
      />
      <EmployerReminderModal onChange = {EmployerReminderModal()}/>
    </Paper>
  );
}