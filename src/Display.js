import React, { Component } from 'react';
import axios from 'axios';
import './Display.css';

class Display extends Component {
  constructor(props) {
    // Pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      articles: []
    };
  }

  // Lifecycle method
  componentWillMount() {
    console.log("componentWillMount value: ",this.props.default)
    this.getArticles(this.props.default);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      console.log("display.js search value willReceiveProp: ",nextProps.default)
      // this.setState({ url: `https://newsapi.org/v2/top-headlines?sources=${nextProps.default}&apiKey=${process.env.REACT_APP_API_KEY}` });
      this.setState({ url: `https://newsapi.org/v2/everything?q={nextProps.default}&apiKey=${process.env.REACT_APP_API_KEY}` });
      console.log("Passing to getArticles: ",nextProps.default)
      this.getArticles(nextProps.default);
    }
  }

  formatDate(date) {
    var time = new Date(date);
    var year = time.getFullYear();
    var day = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var month = time.getMonth() + 1;
    var composedTime = day + '/' + month + '/' + year + ' | ' + hour + ':' + (minute < 10 ? '0' + minute : minute);
    return composedTime;
  }

  getArticles(url) {
    // const apiKey = process.env.REACT_APP_API_KEY;
    // Make HTTP reques with Axios
    console.log("url in getArticles: ",url);
    axios
      .get(`https://newsapi.org/v2/everything?q=${url}&apiKey=${process.env.REACT_APP_API_KEY}`)
      .then(res => {
        console.log("getArticles response: ",res.data.articles);
        const articles = res.data.articles;
        // Set state with result
        this.setState({ articles: articles });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    //console.log("Search value in display: ",this.url);
    return (
      <div className="cardsContainer">
        {this.state.articles.map((news, i) => {
          return (
            <div className="card" key={i}>
              <div className="content">
                <h3>
                  <a href={news.url} target="_blank" rel="noopener noreferrer">
                    {news.title}
                  </a>
                </h3>
                <p>{news.description}</p>
                <div className="author">
                  <p>
                    By <i>{news.author ? news.author : this.props.default}</i>
                  </p>
                  <p>{this.formatDate(news.publishedAt)}</p>
                </div>
              </div>
              <div className="image">
                <img src={news.urlToImage} alt="" />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Display;
