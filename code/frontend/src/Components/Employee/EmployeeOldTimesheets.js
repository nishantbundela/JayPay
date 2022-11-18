import * as React from "react";
import Paper from "@mui/material/Paper";
import MaterialTable from '@material-table/core'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PrintIcon from '@mui/icons-material/Print';
import GridOnIcon from '@mui/icons-material/GridOn';
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import * as TimesheetAPI from "../../APIs/TimesheetAPI";


export default function OldTimesheetTable() {

  // Code below should be used to import data from the database.
  // Replace EmployeeAPI with the employee timesheet API when it is created.
  // Replace the "employees" query with the appropriate quuery for the API
  /*
  const [data, setData] = useState([]);
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  useEffect(() => {
    EmployeeAPI.getDashboard()
      .then(employees => {
        setData(employees)
      })
  }, [])
  */

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
    XLSX.writeFile(workBook, "MyTimesheet.xlsx")}

  // Export as Pdf function
  const downloadPdf = () => {
    const doc = new jsPDF()
    doc.text("Student Details", 20, 10)
    doc.autoTable({
      theme: "grid",
      columns: columns.map(col => ({ ...col, dataKey: col.field })),
      body: data
    })
    doc.save('MyTimesheet.pdf')
  }

  const { useState } = React;

  const [columns, setColumns] = useState([
    {field: 'jhed', title: 'JHED', filtering: false},
    {field: 'job_id', title: 'Job ID'},
    {field: 'date', title: 'Date'},
    {field: 'start_hours', title: 'Start Hour', type: 'string', filtering: false},
    {field: 'end_hours', title: 'End Hour', type: 'string', filtering: false},
    {field: 'total_hours', title: 'Total Hours', type: 'string', filtering: false},
    {field: 'approved', title:'Approval Status', type: 'boolean'}
  ]);

  const [data, setData] = useState([
    // {jhed: '123A45', job_id: '12345', date: '4/12/2022', start_hours: '4:00', end_hours: '6:00',  totalHours: '2.0', approval: true},
  ]);
  const [searchParams] = useSearchParams();
  const jhed = searchParams.get("jhed");

  useEffect( () => {
    (async () => {
      const response = await TimesheetAPI.getAllPast(jhed);
      setData(response)
    })()
  }, [])

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <MaterialTable columns = {columns} data = {data} title = "Timesheet View"
      options = {{filtering: true}} 
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

    </Paper>
  );
}
