import React, {FunctionComponent, useEffect} from 'react';
import {initChart} from './helpers'

interface Props {
    data: Array<any>,
    id: string,
    title: string,
    showSma?: boolean,
}

const LineChart: FunctionComponent<Props> = ({data, id, title, showSma}) => {
    useEffect(() => {
        initChart(id, title, data, showSma);
    }, [data, showSma, id, title])


    return (
        <div id={id} style={{width: "100%", height: "500px"}}/>
    );
};

LineChart.displayName = 'LineChart';

export default LineChart;
