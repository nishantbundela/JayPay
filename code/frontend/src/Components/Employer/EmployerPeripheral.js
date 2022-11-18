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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MailIcon from '@mui/icons-material/Mail';
import { EmployerAppBar } from './EmployerAppBar';
import DashFooter from '../DashFooter';
import {EmployerGrid} from './EmployerGrid';
import JobsTable from './EmployerJobsTable';
import PeopleTable from './EmployerPeopleTable';
import TimesheetTable from './EmployerTimesheetTable';

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
      case "Department":
        setShowDefault(true);
        setShowJobs(false);
        setShowPeople(false);
        break;
      case "Jobs":
        setShowDefault(false);
        setShowJobs(true);
        setShowPeople(false);
        break;
      case "People":
        setShowDefault(false);
        setShowJobs(false);
        setShowPeople(true);
        break;
      default:
        setShowDefault(true);
        setShowJobs(false);
        setShowPeople(false);
        break;
    }
  };

  const [showDefault, setShowDefault] = React.useState(true);
  const [showJobs, setShowJobs] = React.useState(false);
  const [showPeople, setShowPeople] = React.useState(false);
  const [count, setCount] = React.useState(0);

  const iconList = [<AccountBalanceIcon />, <GroupsIcon />, <PersonIcon />];
  const subIconList = [<MailIcon/>];

  React.useEffect( () => {
    //nothing to do here, just bootleg subscription 
    //mechanism to state changes in child
  }, [count]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {EmployerAppBar(open, handleDrawerOpen)}
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
          {["Overview", "Jobs", "People"].map((text, index) => (
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
        
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {showDefault && EmployerGrid()}
        {showJobs && <JobsTable updates = {count} updater = {setCount}/>}
        {showPeople && <PeopleTable/>}
        
        {DashFooter(open) }
      </Main>
      
    </Box>
    
  );
}
