import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import * as PeriodAPI from "../../APIs/PeriodAPI.js";
import {useEffect, useState} from "react";

/*
  This component displays the current pay period. Should be renamed to PayPeriodCard
  at some point because it should be a component common to all views.
*/
const card = (start_date, end_date) => {
    return (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Pay Period
                </Typography>
                <Typography variant="h6">
                    {start_date}
                    <br />
                    -
                    <br />
                    {end_date}
                </Typography>
            </CardContent>
            {/*<CardActions>*/}
            {/*    <Button startIcon = {<ArrowBackIosIcon/>} size="small">Previous</Button>*/}
            {/*    <Button endIcon = {<ArrowForwardIosIcon/>} size="small">Next</Button>*/}
            {/*</CardActions>*/}
        </React.Fragment>
    )
}

export default function AdminPayPeriodCard() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        PeriodAPI.getCurrentPeriod()
            .then((period) => {
                setStartDate(new Date(period.start_date.toString()).toLocaleDateString('en-US', {timeZone: "UTC"}));
                setEndDate(new Date(period.end_date.toString()).toLocaleDateString('en-US', {timeZone: "UTC"}));
            });
    })

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card(startDate, endDate)}</Card>
    </Box>
  );
}