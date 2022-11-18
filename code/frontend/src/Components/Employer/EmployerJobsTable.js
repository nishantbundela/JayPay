import * as React from 'react';
import Paper from '@mui/material/Paper';
import MaterialTable from '@material-table/core'
import * as JobAPI from "../../APIs/JobAPI.js";
import AddJobsFAB from "../AddJobsFAB";
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PrintIcon from '@mui/icons-material/Print';
import GridOnIcon from '@mui/icons-material/GridOn';
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

import AssignEmployee from "../AssignEmployeeModal";
import AssignEmployeeFAB from "../AssignEmployeeFAB";

const columns = [
  { field: 'id', title: 'Job ID', filtering: true },
  // { field: 'assignStatus', title: 'Assigned', type: 'boolean'},
  { field: 'title', title: 'Role Name', sorting: true},
  { field: 'wage', title: "Wage", type:'double'},
  { field: 'hour_limit', title: "Hour Limit", type:'int'}, 
  { field: 'jhed', title: 'Employee JHED', filtering: true, render:rowData => (rowData.employee_name === '') ? <AssignEmployeeFAB id={rowData.id}/> : rowData.jhed},
  { field: 'employee_name', title: 'Employee Name', defaultSort: "asc", filtering: true},
];


export default function JobsTable({updates, updater}) {
  const [data, setData] = useState([]);

  const [searchParams] = useSearchParams();
  const jhed = searchParams.get("jhed");

  useEffect(() => {
    JobAPI.getDashboard(`ejhed=${jhed}`)
        .then((jobs) => {
          setData(jobs);
        });
  }, [updates]);

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
    XLSX.writeFile(workBook, "JobsInformation.xlsx")}

  // Export as Pdf function
  const downloadPdf = () => {
    const doc = new jsPDF()
    doc.text("Student Details", 20, 10)
    doc.autoTable({
      theme: "grid",
      columns: columns.map(col => ({ ...col, dataKey: col.field })),
      body: data
    })
    doc.save('JobsInformation.pdf')
  }

  React.useEffect( () => {
    JobAPI.getDashboard().then((jobs) => {
      setData(jobs);
    });
  }, [updates])

  return (
  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <MaterialTable columns = {columns} data = {data} title = "Jobs Information"
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
    /> 
  <AddJobsFAB updates={updates} updater={updater}/> 
  </Paper>
  );
}
