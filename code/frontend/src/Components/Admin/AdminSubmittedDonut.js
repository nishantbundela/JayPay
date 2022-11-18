import * as React from 'react';
import Chart from 'react-apexcharts';
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import * as AdminAPI from "../../APIs/AdminAPI.js";

const options = {
    labels: ['Submitted']
}

export default function AdminSubmittedDonut() {
    const [percent, setPercent] = useState([0]);
    const [searchParams] = useSearchParams();
    const jhed = searchParams.get("jhed");

    useEffect(() => {
        AdminAPI.getSubmittedPercent(jhed)
            .then((total) => {
                setPercent(total);
            });
    }, []);

    return(
        
        <Chart type = 'radialBar' series = {percent} options = {options}/>
        
    );
}