import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import * as EmployerAPI from "../../APIs/EmployerAPI.js";

const card = (total_jobs, total_employees, total_timesheets) => {
  return (
      <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Total Jobs:
          </Typography>
          <Typography variant="h4">
            {total_jobs}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Total Employees:
          </Typography>
          <Typography variant="h4">
            {total_employees}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Timesheets Pending Approval:
          </Typography>
          <Typography variant="h4">
            {total_timesheets}
          </Typography>
        </CardContent>
      </React.Fragment>
  );
};

export default function EmployerInfoCard() {
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [numPending, setNumPending] = useState(0);
  const [searchParams] = useSearchParams();
  const jhed = searchParams.get("jhed");

  useEffect(() => {
    EmployerAPI.getDashboardInfo(jhed)
        .then((total) => {
          let [numJobs, numEmployees, numPending] = total;
          setTotalJobs(numJobs);
          setTotalEmployees(numEmployees);
          setNumPending(numPending);
        });
  })

  return (
    <Box sx={{ minWidth: 275, maxWidth: 375}}>
      <Card variant="outlined">{card(totalJobs, totalEmployees, numPending)}</Card>
    </Box>
  );
}