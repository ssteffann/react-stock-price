import Highcharts from 'highcharts/highstock';
import Indicators from 'highcharts/indicators/indicators-all';

Indicators(Highcharts);

export const initChart = (chartId: string, title: string, data: Array<any> = [], showSma?: boolean) => {
    const series: Array<any> = [{
        name: 'Price',
        data: data,
        id: 'price',
        tooltip: {
            valueDecimals: 2
        }
    }];

    if (showSma) {
        series.push({
            type: 'sma',
            linkedTo: 'price',
            zIndex: 1,
            marker: {
                enabled: false
            }
        })
    }

    // @ts-ignore
    return Highcharts.stockChart(chartId, {
        rangeSelector: {
            enabled: false
        },
        title: {
            text: title,
        },
        xAxis: {
            type: 'datetime'
        },
        plotOptions: {
            series: {
                dataGrouping: {
                    enabled: false
                }
            }
        },
        series
    })
}
