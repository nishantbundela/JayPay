import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
        Total Hours this Pay Period:
      </Typography>
      <Typography variant="h4">
        14 
      </Typography>
      <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
        Total Gross Pay:
      </Typography>
      <Typography variant="h3">
        $ 210.00
      </Typography>

    </CardContent>
  </React.Fragment>
);

export default function EmployeeGrossPayCard() {
  return (
    <Box >
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}