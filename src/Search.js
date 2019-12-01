import React, { Component } from 'react';
import axios from 'axios';
import Display from './Display.js';
import './Display.css';
import Outlet from './Outlet.js';
import './Outlet.css';

class Search extends Component {
  constructor(props) {
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: [],
      count: 0,
      //value:'bbc-news'
      value: props.default
    };
    console.log("Value in search.js: ", this.state.value);
    this.handleChange = this.handleChange.bind(this);
    this.searchQuery = this.searchQuery.bind(this);
    console.log("Value of search is: ", this.value);
    this.apiUrl = `https://newsapi.org/v2/sources?language=en&apiKey=${process.env.REACT_APP_API_KEY}`;
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ value: event.target.value });
    console.log("handle change search value: ",this.state.value);
  }

  searchQuery(event) {
    this.setState({ value: event.target.value});
    console.log("handleSearch function search value: ",this.state.value);
  }

  // Lifecycle method
  componentWillMount() {
    // Make HTTP reques with Axios
    axios.get(this.apiUrl).then(res => {
      // Set state with result
      this.setState({ data: res.data.sources });
      this.setState({ count: res.data.sources.length });
      //console.log(this.state.data);
      console.log("Data: ",this.state.data);
    });
  }

  render() {
    return (
      <div className="">
        {/* <h4>Select from {this.state.count} News Outlets</h4> */}
        <h4>What do you want to know</h4>
        {/* <select value={this.state.value} onChange={this.handleChange}>
          >
          {this.state.data.map((outlet, i) => {
            return (
              <option key={i} value={outlet.id}>
                {outlet.name}
              </option>
            );
          })}
        </select> */}

       <input type="text" id="searchquery" defaultValue={this.state.value} ></input>
        <br/><br/>
        <button type="submit" className="btn btn-default" id="searchNews" onClick={this.handleChange}>Search</button>
        <Outlet default={this.state.value} />
        <Display default={this.state.value} />
      </div>
    );
  }
}

export default Search;
