import React, { Component } from "react";
import ReactDOM from "react-dom";
import data from "./json-data/data.json";
import Grid from "@material-ui/core/Grid";
import CircularChart from "./components/CircularChart";
import AreaChart from "./components/AreaChart";
import "./index.css";

class App extends Component {
  state={areaDataObject:[{
    date:"",
    sample:0,
    score:0,
    vsly:0
 }],
buttonClicked:""};

  setAreaDataName=(event)=>{
    const nameButton=event.currentTarget.id;
    const areaData="areaData";  
    const valuesAreaChart=data[0][areaData][nameButton];    
    this.setState((prevState, props) => ({
      buttonClicked: nameButton
  }));
  this.setState((prevState, props) => ({
    areaDataObject:valuesAreaChart
}));
  }
  render() {
    //Initialize the color for the Unclicked Buttons
    let colorCircleChart="#415FC3";
    //Iterate the Json Files to extract the necessary data to create the Circular Chart
    const circlecharts = data.map((object) =>
      object.gaugeData.map((card, index) => {
        this.state.buttonClicked===card.name ? (colorCircleChart="#6ABBD0"):(colorCircleChart="#415FC3")
        return (          
          <Grid item xs={4} key={index}>            
            <div className="componentContainer">            
              <button className="charContainer" id={card.name} onClick={this.setAreaDataName}>                  
                  <h3 style={{color:colorCircleChart}}>{card.name}</h3>
                  <span id={"chartN" + index} className="circularStyle"></span>                  
                  <CircularChart charIndex={index} data={card.score} colorCircle={colorCircleChart} buttonName={index}/>                  
                  <div className="footerChart">Sample:{card.sample}</div>
              </button>
            </div>
          </Grid>
        );
      })
    );

    return (
      <table>
        <tbody>
        <tr>
          <td rowSpan={2} className="leftNav">
            <div>
            <ul className="leftNavLinks">
              <li>&#x1F588;</li>
              <li>&#x1F4CA;</li>
              <li>&#128231;</li>
              <li>&#x25F3;</li>
              <li>&#x1F5CE;</li>
            </ul>
            </div>
          </td>
          <td className="navTop">
            <h3>Diagnostic Tool</h3>
            <ul className="navTopLinks">
              <li>Logged In as General User</li>
              <li>&#xFF5C;</li>
              <li>&#x2637;</li>
              <li>&#x2B07;</li>
              <li>&#x1F5B6;</li>
              <li>&#x2754;</li>
              <li>&#x27B2;</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>
          <p className="performanceManagement">PERFORMANCE MANAGENT</p>
        <div className="diagnosticTool">
          <p><span className="globeIcon">&#x1F310;</span>Diagnostic Tool</p>
          <span className="diagnosticToolIcon">&#x1F588;</span>
        </div>
        <div className="chartsContainer">
        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={6}>
              <h3>Filters</h3>
              <div>                
                <ul className="circularChartInfo">
                  <li>All CQA Results <span className="infoIcon" >&#x24D8;</span> </li>
                  <li>CQAs with Closed Loop <span className="infoIcon" >&#x24D8;</span> </li>
                </ul>
              </div>
              <div>
                <Grid container spacing={1}>
                  <Grid container item xs={12} spacing={3}>
                    {circlecharts}
                  </Grid>
                </Grid>              
              </div>
              </Grid>
              <Grid item xs={6}> 
                <div className="areaSection">
                <div className="headerAreaCSection">
                    <p>{this.state.buttonClicked} TREND</p>
                    <div className="buttonsAreaSec">
                      <button className="dayButton">Day</button>
                      <button className="weekButton">Week</button>
                      <button className="monthButton">Month</button>
                      <button className="quarterButton">Quarter</button>
                      <button className="halfButton">Half</button>
                      <button className="yearButton">Year</button>
                    </div>
                  </div>               
                <div id="areaChart">                  
                  <AreaChart dataChart={this.state.areaDataObject}/>
                </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
          </td>
        </tr>
        </tbody>
      </table>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
