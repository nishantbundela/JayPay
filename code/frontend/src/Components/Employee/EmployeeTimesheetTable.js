import * as React from "react";
import Paper from "@mui/material/Paper";
import MaterialTable from '@material-table/core'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PrintIcon from '@mui/icons-material/Print';
import GridOnIcon from '@mui/icons-material/GridOn';
import {useSearchParams} from "react-router-dom";
import {useState, useEffect} from 'react';
import * as TimesheetAPI from '../../APIs/TimesheetAPI.js';

export default function TimesheetTable() {

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

  const [columns, setColumns] = useState([
    {field: 'job_id', title: 'Job ID'},
    {field: 'jhed', title: 'JHED'},
    {field: 'date', title: 'Date'},
    {field: 'start_hours', title: 'Start Hour', type: 'string'},
    {field: 'end_hours', title: 'End Hour', type: 'string'},
    {field: 'total_hours', title:'Total Hours', type:'decimal', editable: 'never'},
    {field: 'approved', title:'Approved', type: 'boolean', editable: 'never'},
  ]);

  const [data, setData] = useState([
      // {job_id: '12345', jhed: '123A45', date: '4/12/2022', start_hours: '4:00', end_hours: '6:00', approval: true}
      ]);
  const [searchParams] = useSearchParams();
  const jhed = searchParams.get("jhed");

  const submitTimesheet = () => {
    /*
    Iterate through each row submitted by employee. Data is stored in an array, with
    each row corresponding to an index.
    */
    data.forEach(sendRow);
  }

  async function sendRow(row) {
    /*
    A function that sends each row to update the database for each array element.
    */
    const ret = await TimesheetAPI.create(row.job_id, row.jhed, row.date, 
      row.start_hours, row.end_hours, row.approval) //we don't do array destructuring here lol
      console.log(ret)
  }

  useEffect( () => {
    (async () => {
      const response = await TimesheetAPI.getAllCurrent(jhed);
      setData(response)
    })()
  }, [])

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <MaterialTable columns = {columns} data = {data} title = "Timesheet View"
      
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
      }}
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

      <Button variant="contained" endIcon={<SendIcon />} onClick={submitTimesheet}>
        Submit Timesheet
      </Button>
    </Paper>
  );
}
