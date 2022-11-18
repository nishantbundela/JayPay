import * as React from 'react';
import { Grid } from '@mui/material';
import AdminPayPeriodCard from './AdminPayPeriodCard';
import AdminTotalEmployeeCard from './AdminTotalEmployeeCard';
import AdminTotalHoursCard from './AdminTotalHoursCard';
import AdminSubmittedDonut from './AdminSubmittedDonut';
import AdminCumulativeHours from './AdminCumulativeHours';

export function AdminGrid() {
    return <Grid container spacing={3}>
        <Grid item xs sx={{backgroundColor: '#FFFFFF'}}>
            <AdminPayPeriodCard/>
        </Grid>
        <Grid item xs={6} sx={{backgroundColor: '#FFFFFF' }}>
            <AdminTotalEmployeeCard />
        </Grid>
        <Grid item xs sx={{backgroundColor: '#FFFFFF' }}>
            <AdminTotalHoursCard />
        </Grid>
        <Grid item xs={4} sx={{backgroundColor: '#FFFFFF'}}>
            <AdminSubmittedDonut />
        </Grid>
        <Grid item xs={8} sx={{backgroundColor: '#FFFFFF'}}>
            <AdminCumulativeHours />
        </Grid>
        
    </Grid>
    ;
}
