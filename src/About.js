import React, { Component } from 'react';
import './About.css';
import tejas from './images/tejas.jpg';
import pratyusha from './images/pratyusha.JPG';
import rashmi from './images/rashmi.jpg';
import vaibhav from './images/vaibhav.jpeg';

class About extends Component{
    render() {
        return (            
            <div className="container" id="about">
            <br/><br/>
                <div className="row">​              
                    <div className="col-sm-3">
                        <div className="card1" >
                            <div className="card-body">
                                <h5 className="card-title">DevOps Engineer</h5>
                                <img className="card-img-top" src={tejas} alt="Card image" ></img>
                                <p className="card-text">Tejas Nadgoud</p>
                                <a href="#" className="btn btn-primary">More Info..</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card1" >
                            <div className="card-body">
                                <h5 className="card-title">Full Stack Developer</h5>
                                <img className="card-img-top" src={vaibhav} alt="Card image" ></img>
                                <p className="card-text">Vaibhav Dhoke</p>
                                <a href="#" className="btn btn-primary">More Info..</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card1">
                            <div className="card-body">
                                <h5 className="card-title">Developer, Traveller</h5>
                                <img className="card-img-top" src={rashmi} alt="Card image" ></img>
                                <p className="card-text">Rashmi Patil</p>
                               
                                <a href='www.linkedin.com/in/rashmigpatil' target="_blank" className="btn btn-primary" >More Info..</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card1">
                            <div className="card-body">
                                <h5 className="card-title">Software Engineer</h5>
                                <img className="card-img-top" src={pratyusha} alt="Card image" ></img>
                                <p className="card-text">Pratyusha Kar</p>
                                <a href="#" className="btn btn-primary">More Info..</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;