import * as React from 'react';
import { Grid } from '@mui/material';
import AdminPayPeriodCard from '../Admin/AdminPayPeriodCard';
import EmployerInfoCard from './EmployerInfoCard';
import EmployerTotalHoursCard from './EmployerTotalHoursCard';
import EmployerSubmittedDonut from './EmployerSubmittedDonut';
import EmployerCumulativeHours from './EmployerCumulativeHours';

export function EmployerGrid() {
    return <Grid container spacing={4}>
        <Grid item xs sx={{backgroundColor: '#FFFFFF'}}>
            <AdminPayPeriodCard />
        </Grid>
        <Grid item xs={5} sx={{backgroundColor: '#FFFFFF' }}>
            <EmployerInfoCard />
        </Grid>
        <Grid item xs sx={{backgroundColor: '#FFFFFF' }}>
            <EmployerTotalHoursCard />
        </Grid>
        <Grid item xs={4} sx={{backgroundColor: '#FFFFFF'}}>
            <EmployerSubmittedDonut />
        </Grid>
        <Grid item xs={8} sx={{backgroundColor: '#FFFFFF'}}>
            <EmployerCumulativeHours />
        </Grid>
        
    </Grid>
    ;
}
