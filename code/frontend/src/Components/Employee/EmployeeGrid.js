import * as React from 'react';
import { Grid } from '@mui/material';
import AdminPayPeriodCard from '../Admin/AdminPayPeriodCard';
import EmployeeInfoCard from '../Employee/EmployeeInfoCard';
import EmployeeCalendar from '../Employee/EmployeeCalendar';
import GrossPayCard from './EmployeeGrossPayCard';

export function EmployeeGrid() {
    return (
    <Grid container 
    direction={"row"}>
        <Grid item xs sx={{backgroundColor: '#FFFFFF', width:'100%'}}>
            <AdminPayPeriodCard />
        </Grid>
        <Grid item xs sx={{backgroundColor: '#FFFFFF'}}>
            <EmployeeInfoCard />
        </Grid>
           
        {/*<Grid item xs sx={{backgroundColor: '#FFFFFF', width:'100%'}}>*/}
        {/*    <GrossPayCard/>*/}
        {/*</Grid>*/}
        <Grid item xs sx={{backgroundColor: '#FFFFFF', width:'100%'}}>
            <EmployeeCalendar />
        </Grid>
        
    </Grid>
    );
}
