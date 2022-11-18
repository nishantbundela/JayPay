import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import * as TimesheetAPI from "../../APIs/TimesheetAPI";

const card = (totalHours, changeString) => {
  return (
      <React.Fragment>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Total Hours Submitted:
          </Typography>
          <Typography variant="h4">
            {totalHours}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {changeString}
          </Typography>
        </CardContent>
      </React.Fragment>
  );
};

export default function EmployerTotalHoursCard() {
  const [totalHours, setTotalHours] = useState(0);
  const [changeString, setChangeString] = useState("");

  const [searchParams] = useSearchParams();
  const jhed = searchParams.get("jhed");

  useEffect(() => {
    TimesheetAPI.getTotalHoursByPeriod("employer", jhed)
        .then((data) => {
          if (data) {
            setTotalHours(Math.round(data[0]));
            const periods = data[1];
            if (periods.length > 1) {
              const currentPeriod = periods[periods.length - 1];
              const prevPeriod = periods[periods.length - 2];
              let change = Math.round(currentPeriod.total_hours - prevPeriod.total_hours);
              if (change < 0) {
                change = Math.abs(change);
                setChangeString(`Down ${change} hours from last pay period`);
              } else if (change > 0) {
                setChangeString(`Up ${change} hours from last pay period`);
              } else {
                setChangeString("No change from last period");
              }
            } else {
              setChangeString("");
            }
          } else {
            setTotalHours(0);
            setChangeString("");
          }
        });
  });

  return (
    <Box sx={{ minWidth: 175, maxWidth: 275}}>
      <Card variant="outlined">{card(totalHours, changeString)}</Card>
    </Box>
  );
}