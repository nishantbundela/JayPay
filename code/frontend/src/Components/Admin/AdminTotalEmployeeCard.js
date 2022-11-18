import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from "react";
import * as AdminAPI from "../../APIs/AdminAPI.js";
import {useSearchParams} from "react-router-dom";

const card = (total) => {
    return (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Total Employees in Department:
                </Typography>
                <Typography variant="h4">
                    {total}
                </Typography>
            </CardContent>
        </React.Fragment>
    );
};

export default function AdminTotalEmployeeCard() {
    const [totalNumEmployees, setTotalNumEmployees] = useState(0);
    const [searchParams] = useSearchParams();
    const jhed = searchParams.get("jhed");

    useEffect(() => {
        AdminAPI.getTotalNumEmployees(jhed)
            .then((total) => {
                setTotalNumEmployees(total);
            });
    })

  return (
    <Box sx={{ minWidth: 275, maxWidth: 375}}>
      <Card variant="outlined">{card(totalNumEmployees)}</Card>
    </Box>
  );
}