import React, { Component } from "react";
import * as d3 from "d3";
import "./AreaChart.css";

class AreaChart extends Component {
  //Initialize state. In this case date is initialized with Apr because is the first month
  state = {
    data: [
      {
        date: "Apr",
        sample: 0,
        score: 0,
        vsly: 0,
      },
    ],
  };

  drawAreaChart() {
    //Enum for Months
    const Months = {
      Apr: 0,
      May: 1,
      Jun: 2,
      Jul: 3,
    };

    const margin = { top: 30, right: 20, bottom: 40, left: 50 },
      width = 575 - margin.left - margin.right,
      height = 350 - margin.top - margin.bottom;

    //Scalar Linear axis for the Chart
    const x = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.state.data, function (d) {
          const month = d.date;
          return Months[month];
        }),
      ])
      .range([0, width]);
    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.state.data, function (d) {
          return d.score;
        }),
      ])
      .range([height, 0]);

    var xAxis = d3
      .axisBottom(x)
      .tickFormat(function (d) {
        return d.date;
      })
      .ticks(0);

    //Setting parameters for drawing the chart area
    const area = d3
      .area()
      .x(function (d) {
        const month = d.date;
        return x(Months[month]);
      })
      .y0(height)
      .y1(function (d) {
        return y(d.score);
      })
      .curve(d3.curveMonotoneX);

    //Remove any chart that was appended before
    d3.selectAll("#svgArea").remove();

    //Create a new area space to make the area chart
    const svg = d3
      .select("#areaChart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("id", "svgArea")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Color
    var gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "100%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");
    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#0039e6")
      .attr("stop-opacity", 1);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#adc2eb")
      .attr("stop-opacity", 1);

    // Create Area Chart

    svg
      .append("path")
      .datum(this.state.data)
      .attr("class", "area")
      .attr("d", area)
      .style("fill", "url(#gradient)");

    //Labels
    svg
      .append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + 295 + ")")
      .call(xAxis)
      .style("stroke", "red");

    svg
      .selectAll(".areaText")
      .data(this.state.data)
      .enter()
      .append("text")
      .attr("class", "areatext")
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("x", function (d, i) {
        const month = d.date;
        return x(Months[month]);
      })
      .attr("y", function (d, i) {
        return y(d.score) - 15;
      })
      .text(function (d) {
        return d.score + " %";
      });
    svg
      .selectAll(".areaText2")
      .data(this.state.data)
      .enter()
      .append("text")
      .attr("class", "areatext")
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .attr("x", function (d) {
        const month = d.date;
        return x(Months[month]);
      })
      .attr("y", function (d, i) {
        return height + 30;
      })
      .text(function (d) {
        return d.date;
      });

    svg
      .selectAll(".areaPoints")
      .data(this.state.data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        const month = d.date;
        return x(Months[month]);
      })
      .attr("cy", function (d, i) {
        return y(d.score);
      })
      .attr("r", 5)
      .attr("stroke", "white")
      .attr("stroke-width", "2")
      .attr("fill", "rgb(13, 94, 138)");
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (prevProps.dataChart !== this.props.dataChart) {
      this.setState({ data: this.props.dataChart });
    }
    return null;
  }
  componentDidUpdate() {
    this.drawAreaChart();
  }
  render() {
    return <div></div>;
  }
}

export default AreaChart;
