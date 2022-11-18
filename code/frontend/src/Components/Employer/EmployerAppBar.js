import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar } from './EmployerPeripheral';
import { Button } from '@mui/material';

export function EmployerAppBar(open, handleDrawerOpen) {
    return <AppBar position="fixed" open={open} sx = {{backgroundColor: "#61DAFB"}}>
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                Welcome Supervisor!
            </Typography>
            <Button color = 'inherit' sx = {{backgroundColor: "#61DAFB"}} onClick={(e) => {e.preventDefault();window.location.href="/"}}>Logout</Button>
        </Toolbar>
    </AppBar>;
}
