/**
 * Script to generate CSV file for Periods table.
 */
const fs = require('fs');

/**
 * Configure program variables here.
 *
 * periodLength: during of one pay period in days
 * numYears: number of years of data to generate
 * startPayPeriod: start date of the pay period (*note that month is from range [0, 11])
 */
const periodLength = 14;
const numYears = 10;
let startPayPeriod = new Date(2022, 0, 10);


const numEntries = numYears * 52 / (periodLength / 7);
let endPayPeriod = new Date(startPayPeriod.getFullYear(), startPayPeriod.getMonth(), startPayPeriod.getDate() + periodLength - 1);

const columns = ["id", "start_date", "end_date"];
let periods = [];

// entering data to array
for (let i = 1; i <= numEntries; i++) {
    const startString = `${startPayPeriod.getMonth()+1}/${startPayPeriod.getDate()}/${startPayPeriod.getFullYear()}`
    const endString = `${endPayPeriod.getMonth()+1}/${endPayPeriod.getDate()}/${endPayPeriod.getFullYear()}`
    const entry = [i, startString, endString];
    console.log(entry);
    periods.push(entry);
    startPayPeriod.setDate(startPayPeriod.getDate() + periodLength);
    endPayPeriod.setDate(endPayPeriod.getDate() + periodLength)
}

// compiling data to String
const header = columns.join(",");
let csvContent = header + "\r\n";
periods.forEach(function(rowArray) {
    const row = rowArray.join(",");
    csvContent += row + "\r\n";
});

// writing data to CSV
fs.writeFile('period.csv', csvContent, (err => {
    if (err) throw err;
}));