import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import * as TimesheetAPI from "../../APIs/TimesheetAPI";

const card = (currentTotal, prevTotal) => {
  return (
      <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            Total Hours
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            This Pay Period:
          </Typography>
          <Typography variant="h4">
            {currentTotal}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Last Pay Period:
          </Typography>
          <Typography variant="h4">
            {prevTotal}
          </Typography>
        </CardContent>
      </React.Fragment>
  );
};

export default function EmployerInfoCard() {
  const [currentTotal, setCurrentTotal] = useState(0);
  const [prevTotal, setPrevTotal] = useState(0);

  const [searchParams] = useSearchParams();
  const jhed = searchParams.get("jhed");

  useEffect(() => {
    TimesheetAPI.getTotalHoursByPeriod("employee", jhed)
        .then((data) => {
          if (data) {
            const periods = data[1];
            if (periods.length > 1) {
              setCurrentTotal(Math.round(periods[periods.length - 1].total_hours));
              setPrevTotal(Math.round(periods[periods.length - 2].total_hours));
            }
          }
        });
  });

  return (
    <Box sx={{ minWidth: 275, maxWidth: 375}}>
      <Card variant="outlined">{card(currentTotal, prevTotal)}</Card>
    </Box>
  );
}