import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { EmployeeAppBar } from './EmployeeAppBar';
import DashFooter from '../DashFooter';
import TimesheetTable from './EmployeeTimesheetTable';
import {EmployeeGrid} from './EmployeeGrid';
import NotificationOptions from './EmployeeNotifications';
import OldTimesheetTable from './EmployeeOldTimesheets';
import ArticleIcon from '@mui/icons-material/Article';

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemButtonClick = (event, component) => {
    switch (component) {
      case "Overview":
        setShowDefault(true);
        setShowTimesheet(false);
        setShowOldTimesheet(false);
        setShowNotifications(false);
        break;
      case "Upload Timesheet":
        setShowDefault(false);
        setShowTimesheet(true);
        setShowOldTimesheet(false);
        setShowNotifications(false);
        break;
      case "Old Timesheets":
        setShowDefault(false);
        setShowTimesheet(false);
        setShowOldTimesheet(true);
        setShowNotifications(false);
        break;
      case "Notifications":
        setShowDefault(false);
        setShowTimesheet(false);
        setShowOldTimesheet(false);
        setShowNotifications(true);
        break;
      default:
        setShowDefault(true);
        setShowTimesheet(false);
        setShowOldTimesheet(false);
        setShowNotifications(false);
        break;
    }
  };

  const [showDefault, setShowDefault] = React.useState(true);
  const [showTimesheet, setShowTimesheet] = React.useState(false);
  const [showOldTimesheet, setShowOldTimesheet] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);

  const iconList = [<AccountCircleIcon />, <ListAltIcon />, <ArticleIcon />];


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {EmployeeAppBar(open, handleDrawerOpen)}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Overview", "Upload Timesheet", "Old Timesheets"].map((text, index) => (
            <ListItemButton
              key={text}
              onClick={(event) => handleListItemButtonClick(event, text)}
            >
              <ListItemIcon>{iconList[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          {["Notifications"].map((text, index) => (
            <ListItemButton 
            key={text}
            onClick={(event) => handleListItemButtonClick(event, text)}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {showDefault && EmployeeGrid()}
        {showTimesheet && <TimesheetTable/>}
        {showOldTimesheet && <OldTimesheetTable/>}
        {showNotifications && <NotificationOptions/>}
        
        {DashFooter(open) }
      </Main>
      
    </Box>
    
  );
}