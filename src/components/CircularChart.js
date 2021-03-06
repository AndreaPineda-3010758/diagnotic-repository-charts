import React, {Component} from "react";
import * as d3 from "d3";
import "./CircularChart.css";

class CircularChart extends Component{
    drawChart(){
        const data = [{
            value: this.props.data
        }, {
            value: 100-this.props.data
        }];
    const width=200;
    const height=200;    
    const textInside1=this.props.data+" %";
    const textInside2="N/A"
    //Remove any chart that had before
    d3.select("#svgCircular"+this.props.buttonName).remove();

    const svg = d3.select("#chartN"+this.props.charIndex)
    .append("svg")
    .attr("id","svgCircular"+this.props.buttonName)
    .attr("width", width)
    .attr("height", height);
    const radius = 80;
    const g = svg.append('g').attr('transform', `translate(${width/2}, ${height/2})`);    
    const color = d3.scaleOrdinal([this.props.colorCircle,'#CCCCCC']);
    const pie = d3.pie().sort(null).value(d => d.value);
    const path = d3.arc().outerRadius(radius).innerRadius(radius-20);
    const pies = g.selectAll('.arc').data(pie(data)).enter().append('g').attr('class', 'arc');
    pies.append('path').attr('d', path).attr('fill', d => color(d.data.value));
    pies.append('text').text(textInside1).attr('transform', `translate(${-20}, ${0})`).attr("class","textInside1").style("fill",this.props.colorCircle);
    pies.append('text').text(textInside2).attr('transform', `translate(${-10}, ${20})`).attr("class","textInside2");
    }
    componentDidUpdate(){
        this.drawChart();
    }
    componentDidMount(){
        this.drawChart();
    }
    
    render(){
        return(
            <div>
            </div>
        )
    }
}

export default CircularChart;