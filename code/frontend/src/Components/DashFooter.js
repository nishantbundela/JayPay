import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AppBar } from './Admin/AdminPeripheral';

export default function DashFooter(open) {

    return (
        <AppBar position="fixed" open={open}
        sx ={{top: "auto", bottom: "0", backgroundColor:'#eeeeee' }}>
        <Toolbar>
            <Box display = 'flex' flexGrow = {1}>
            {/*This box is here just for spacing purposes*/}
            </Box>
            <Typography 
            gutterBottom variant="subtitle2"
            color="#b3b3b3">

            2022 @ JayPay 

            </Typography>
        </Toolbar> 
        </AppBar>
    )
}