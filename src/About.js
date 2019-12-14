import React, { Component } from 'react';
import './About.css';
import tejas from './images/tejas.jpg';
import pratyusha from './images/pratyusha.JPG';
import rashmi from './images/rashmi.jpg';
import vaibhav from './images/vaibhav.jpeg';
import formslogo from './images/formslogo.jpg'

class About extends Component{
    render() {
        return (            
            <div className="container" id="about">
            <br/><br/>

            <div class="w3-container" id="about2">
                <div class="w3-content" >
                    
                     <br/>
                         <h5><p><b>Discover and get inspired by the stories that shape your world</b></p></h5>
                    <div class="w3-panel w3-leftbar w3-light-grey">
                     <p><i>"A part of your everyday life"</i></p>
                     
                    </div>
                </div>
                <br/>
                <img className="card-img-top1" src={formslogo} alt="Card image" ></img> 
                 <p><strong>Write to us:</strong> neuznews@gmail.com</p>
                <p><strong>Address:</strong> 360 Huntington Ave, Boston, MA 02115</p>

            </div>


                <div className="row">​              
                    <div className="col-sm-3">
                        <div className="card1" >
                            <div className="card-body">
                                <h5 className="card-title">DevOps Engineer</h5>
                                <img className="card-img-top" src={tejas} alt="Card image" ></img>
                                <p className="card-text">Tejas Nadgoud</p>
                                {/* <a href="#" className="btn btn-primary">More Info..</a> */}
                                <a href="mailto:nadgoud.t@gmail.com"> nadgoud.t@gmail.com</a>
	                
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card1" >
                            <div className="card-body">
                                <h5 className="card-title">Full Stack Developer</h5>
                                <img className="card-img-top" src={vaibhav} alt="Card image" ></img>
                                <p className="card-text">Vaibhav Dhoke</p>
                                {/* <a href="#" className="btn btn-primary">More Info..</a> */}
                                <a href="mailto:vaibhavdhoke@gmail.com"> vaibhavdhoke@gmail.com</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card1">
                            <div className="card-body">
                                <h5 className="card-title">Developer, Traveller</h5>
                                <img className="card-img-top" src={rashmi} alt="Card image" ></img>
                                <p className="card-text">Rashmi Patil</p>
                                <a href="mailto:rashmi24195@gmail.com"> rashmi24195@gmail.com</a>
                                {/* <a href='www.linkedin.com/in/rashmigpatil' target="_blank" className="btn btn-primary" >More Info..</a> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="card1">
                            <div className="card-body">
                                <h5 className="card-title">Software Engineer</h5>
                                <img className="card-img-top" src={pratyusha} alt="Card image" ></img>
                                <p className="card-text">Pratyusha Kar</p>
                                {/* <a href="#" className="btn btn-primary">More Info..</a> */}
                                <a href="mailto:pratyusha23kar@gmail.com"> pratyusha23kar@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;