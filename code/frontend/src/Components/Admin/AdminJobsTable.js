import * as React from "react";
import Paper from "@mui/material/Paper";
import MaterialTable from "@material-table/core";
import * as JobAPI from "../../APIs/JobAPI.js";
import * as AdminAPI from "../../APIs/AdminAPI.js";
import AddJobsFAB from "../AddJobsFAB";
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PrintIcon from '@mui/icons-material/Print';
import GridOnIcon from '@mui/icons-material/GridOn';
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
// import AssignEmployee from "../AssignEmployeeModal";
import AssignEmployeeFAB from "../AssignEmployeeFAB";



export default function JobsTable({updates, updater}) {

  const [searchParams] = useSearchParams();
  const jhed = searchParams.get("jhed");

  const [data, setData] = useState([]);

  useEffect(() => {
    AdminAPI.getDepartment(jhed)
        .then((department) => {
          JobAPI.getDashboard(`department=${department}`).then((jobs) => {
            setData(jobs);
          });
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
    console.log('Fetching');
    JobAPI.getDashboard().then((jobs) => {
      setData(jobs);
    });
  }, [updates])

  const columns = [
    { field: "id", title: "Job ID", filtering: false },
    { field: "title", title: "Title", sorting: false },
    { field: "department", title: "Department" },
    { field: "jhed", title: "Employee JHED", render:rowData => (rowData.employee_name === '') ? <AssignEmployeeFAB id={rowData.id}/> : rowData.jhed },
    { field: "employee_name", title: "Employee Name", defaultSort: "asc" },
    { field: "employer_name", title: "Supervisor" },
  ];


  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <MaterialTable
        columns={columns}
        data={data}
        title="Jobs Information"
        options={{ filtering: true}}
        employee-dashgrid
        
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
    <AddJobsFAB updates = {updates} updater = {updater}/>
    </Paper>
  );
}
