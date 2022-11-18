import * as React from "react";
import Paper from "@mui/material/Paper";
import MaterialTable from '@material-table/core'
import EmployerReminderModal from "./EmployerReminderNotificationModal";
import {Link} from '@material-ui/core'
import * as TimesheetAPI from '../../APIs/TimesheetAPI';
import Button from "@mui/material/Button";
import {useSearchParams} from "react-router-dom";
import {useState, useEffect} from "react";

export default function TimesheetTable() {

  const columns = [
    {field: 'jhed', title: 'JHED', filtering: false},
    {field: 'job_id', title: 'Job ID'},
    {field: 'date', title: 'Date'},
    {field: 'start_hours', title: 'Start Hour', type: 'string', filtering: false},
    {field: 'end_hours', title: 'End Hour', type: 'string', filtering: false},
    {field: 'total_hours', title: 'Total Hours', type: 'string', filtering: false},
    {field: 'approved', title:'Approval Status', type: 'boolean'}
  ];

  const [data, setData] = useState([
    // {jhed: '123A45', job_id: '12345', date: '4/12/2022', start_hours: '4:00', end_hours: '6:00',  totalHours: '2.0', approval: true},
  ]);
  const [searchParams] = useSearchParams();
  const jhed = searchParams.get("jhed");

  useEffect( () => {
    (async () => {
      const response = await TimesheetAPI.getAll(jhed);
      setData(response)
    })()
  }, [])

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <MaterialTable columns = {columns} data = {data} title = "Timesheet View"
      options = {{filtering: true}}
      />
    </Paper>
  );
}
