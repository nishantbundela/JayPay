import * as React from "react";
import Paper from "@mui/material/Paper";
import MaterialTable from '@material-table/core'
import * as EmployeeAPI from "../../APIs/EmployeeAPI.js";
import * as EmployerAPI from "../../APIs/EmployerAPI.js";
import {Link} from '@material-ui/core'
import AddAdminFAB from "../AddAdminFAB";
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PrintIcon from '@mui/icons-material/Print';
import GridOnIcon from '@mui/icons-material/GridOn';
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as AdminAPI from "../../APIs/AdminAPI";
import IconButton from '@mui/material/IconButton';
import LinkIcon from '@mui/icons-material/Link';



export default function PeopleTable() {

  const columns = [
    {field: 'link', title: 'View Timesheet', render:rowData=><Jhedlink jhed={rowData.jhed}/>, filtering: false},
    {field: 'jhed', title: 'JHED'},
    {field: 'first_name', title: 'First Name'},
    {field: 'last_name', title: 'Last Name'},
    {field: 'job_id', title: 'Job ID'},
    {field: 'job_title', title: 'Job Title'},
    {field: 'employer', title: 'Supervisor'},
    {field: 'submitStatus', title: 'Submit Status', type: 'boolean'},
    {field: 'faculty', title: 'Faculty', type: 'boolean'}
  ];

    const [searchParams] = useSearchParams();
    const jhed = searchParams.get("jhed");

    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            const department = await AdminAPI.getDepartment(jhed);
            const employees = await EmployeeAPI.getDashboard(`department=${department}`);
            const employers = await EmployerAPI.getDashboard(`department=${department}`);
            const data = employers.concat(employees);
            setData(data);
        })()
    }, [])

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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <MaterialTable columns = {columns} data = {data} title = "People Information"
      options = {{filtering: true}}
      // Insert appropriate CRUD functions into onRowUpdate, handleRowAdd & onRowDelete
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
        /*exportMenu: [{
            label: 'Export PDF',
            exportFunc: (cols, datas) => ExportPdf(cols, datas, 'People Information')
          }, {
            label: 'Export CSV',
            exportFunc: (cols, datas) => ExportCsv(cols, datas, 'People Information')
          }]}}*/
      /> 
    <AddAdminFAB/>
    </Paper>
  );
}
