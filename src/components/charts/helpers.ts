import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export const initChart = (chartId: any, data: Array<any> = []) => {
    const chart = am4core.create(chartId, am4charts.XYChart);

    chart.data = data;
    // Create axes
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    // Create axes
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "price";
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = "{valueY}";
    // series.tooltip.pointerOrientation = "vertical";
    // series.tooltip.background.cornerRadius = 20;
    // series.tooltip.background.fillOpacity = 0.5;
    // series.tooltip.label.padding(12, 12, 12, 12)

    // Add scrollbar
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    // @ts-ignore
    chart.scrollbarX.series.push(series);

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    return chart;
}
