import React, { Component } from "react";
import "./App.css";
import Search from "./Search.js";
import "./Search.css";
import Footer from "./Footer.js";
import "./Footer.css";
import logo from "./images/react.svg";
import news from "./images/news.png";
import Navbar from "./Navbar";
//import * as THREE from "three";
//mport Globe from "worldwind-react-globe";
//import ReactGlobe from "react-globe";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 34.2,
      lon: -119.2,
      alt: 10e6
    };
    this.globeRef = React.createRef();
  }
  render() {
    const layers = [
      "eox-sentinal2-labels",
      "coordinates",
      "view-controls",
      "stars",
      "atmosphere-day-night"
    ];
    navigator.geolocation.getCurrentPosition(function(position){
      console.log(position);
      // $.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+position.coords.latitude+","+
      // position.coords.longitude+"&sensor=false", function(data){
      //   console.log(data);
      // })
    })
    return (
      <div className="app">
        {/* <div className="appHeader">
          <img className="appLogo" src={logo} alt="React Logo" />
          <div className="title">
            <h1>NEUz</h1>
            <h4>
              Powered by
              <a href="https://newsapi.org/"> NEUZ </a>
            </h4>
          </div>
          <img className="scriptLogo" src={news} alt="Javascript Logo" />
        </div> */}
        <Navbar />
        <Search default="New York" />
        <Footer />
        {/* <Globe
          ref={this.globeRef}
          layers={layers}
          latitude={this.state.lat}
          longitude={this.state.lon}
          altitude={this.state.alt}
        /> */}
        {/* <div style={{ width: "100vw", height: "100vh" }}>
          <ReactGlobe />
        </div> */}
      </div>
    );
  }
}
export default App;
