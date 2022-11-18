import * as React from 'react';
import Chart from 'react-apexcharts';
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import * as EmployerAPI from "../../APIs/EmployerAPI";

const options = {
    labels: ['Submitted']
}

export default function EmployerSubmittedDonut() {
    const [percent, setPercent] = useState([0]);
    const [searchParams] = useSearchParams();
    const jhed = searchParams.get("jhed");

    useEffect(() => {
        EmployerAPI.getDashboardInfo(jhed)
            .then((total) => {
                setPercent([total[3]]);
            });
    }, []);

    return(
        
        <Chart type = 'radialBar' series = {percent} options = {options}/>
        
    );
}