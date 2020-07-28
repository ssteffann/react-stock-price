import React, {FunctionComponent, useEffect, useMemo} from 'react';
import {initChart} from './helpers'

interface Props {
    data: Array<any>
}

const LineChart: FunctionComponent<Props> = ({data}) => {
    const chart = useMemo(() => {
        return initChart('lineChart', data);
    }, [data])


    useEffect(() => {
        return () => {
            chart && chart.dispose();
        }
    }, []);

    return (
        <div id="lineChart" style={{width: "100%", height: "500px"}}/>
    );
};

LineChart.displayName = 'LineChart';

export default LineChart;
