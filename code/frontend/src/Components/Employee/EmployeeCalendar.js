import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'

export default function EmployeeCalendar() {
  const [value, onChange] = useState(new Date());

  const toCalendarType = (weekStartDay) =>weekStartDay === 1 ? 'US' : 'ISO 8601'

  const onClickDay = (value, event) => alert('Clicked day: ', value)

  const tileContent = ({ date, view }) => view === 'month' && date.getDay() === 1 ? <p>Timesheet Due!</p> : null


  return (
  <Box sx={{ width:'100%', height:'100%'}}>
        <Card variant="outlined"><Calendar onChange={onChange} value={value} calendarType={toCalendarType(0)} 
          onClickDay = {onClickDay} tileContent = {tileContent} />
            
          </Card>
        
    </Box>
  );
}