import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="footerSection">
        <div className="social">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-2x fa-facebook" aria-hidden="true" />
          </a>

          <a
            href="https://twitter.com/home"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-2x fa-twitter" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/rashmigpatil"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-2x fa-linkedin" aria-hidden="true" />
          </a>
          <a
            href="https://aboutme.google.com/u/0/?referer=gplus"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-2x fa-google-plus" aria-hidden="true" />
          </a>
          <a
            href="https://www.skype.com/en/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-2x fa-skype" aria-hidden="true" />
          </a>
          <a
            id="repo"
            href="https://github.com/tejasnadgoud/neuZ"
            target="_blank"
            rel="noopener noreferrer"
          >
            Repo
            <i className="fa fa-code-fork" aria-hidden="true" />
          </a>
        </div>

        <a className="smoothScroll" href="#">
          <i className="fa fa-2x fa-arrow-up" aria-hidden="true" />
        </a>
        <span className="coffee">Copyright &copy; neuz.com 2019</span>

        {/* <span className="coffee">
           Made with
           <i className="fa fa-coffee" aria-hidden="true" />
         </span> */}
      </div>
      //   <div className="container-fluid bg-primary py-3">
      // <div className="container">
      //   <div className="row">
      //     <div className="col-md-7">
      //         <div className="row py-0">
      //       <div className="col-sm-1 hidden-md-down">
      //           <a className="bg-circle bg-info" href="#">
      //             <i className="fa fa-2x fa-fw fa-address-card" aria-hidden="true "></i>
      //           </a>
      //         </div>
      //         <div class="col-sm-11 text-white">
      //             <div><h4>  Contact</h4>
      //                 <p>   <span className="header-font">M</span>y<span className="header-font">w</span>website.com</p>
      //             </div>
      //         </div>
      //         </div>
      //     </div>
      //     <div className="col-md-5">
      //       <div className="d-inline-block">
      //         <div className="bg-circle-outline d-inline-block" >
      //           <a href="https://www.facebook.com/"><i className="fa fa-2x fa-fw fa-facebook text-white"></i>
      // </a>
      //         </div>
      //         <div className="bg-circle-outline d-inline-block">
      //           <a href="https://twitter.com/">
      //             <i className="fa fa-2x fa-fw fa-twitter text-white"></i></a>
      //         </div>

      //         <div className="bg-circle-outline d-inline-block">
      //           <a href="https://www.linkedin.com/company/">
      //             <i className="fa fa-2x fa-fw fa-linkedin text-white"></i></a>
      //         </div>
      //         <div className="bg-circle-outline d-inline-block">
      //           <a href="https://www.google.com/">
      //             <i className="fa fa-2x fa-fw fa-google text-white"></i></a>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      // </div>
    );
  }
}

export default Footer;
