import * as React from 'react';
import Chart from 'react-apexcharts';
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import * as TimesheetAPI from "../../APIs/TimesheetAPI.js";

const fillerData = [
    {
        name: 'Submitted Hours',
        data: [0]
    }
];

const fillerOptions = {
    xaxis: {
        categories: ["No data to display..."]
    },
    stroke: {
        curve: 'smooth'
    }
};

export default function AdminCumulativeHours() {
    const [series, setSeries] = useState(fillerData);
    const [options, setOptions] = useState(fillerOptions);

    const [searchParams] = useSearchParams();
    const jhed = searchParams.get("jhed");

    useEffect(() => {
        TimesheetAPI.getTotalHoursByPeriod("admin", jhed)
            .then((data) => {
                if (data) {
                    const totalHoursArray = data[1].map(period => period.total_hours);
                    let axisTitles = []
                    for (let i = 0; i < totalHoursArray.length; i++) {
                        axisTitles.push(`Period ${i + 1}`);
                    }

                    setSeries(
                        [
                            {
                                name: 'Submitted Hours',
                                data: totalHoursArray
                            }
                        ]
                    );

                    setOptions(
                        {
                            xaxis: {
                                categories: axisTitles
                            },
                            yaxis: {
                                labels: {
                                    formatter: (value) => { return Math.round(value) }
                                }
                            },
                            stroke: {
                                curve: 'smooth'
                            }
                        }
                    );
                }
            });
    }, []);

    return(
        <Chart type = 'line' series = {series} options = {options} height = '70%'/>
    );
}