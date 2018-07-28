import React from "react";
import machuPicchu from "./videos/machu-picchu.mp4";
import tropicalShore from "./videos/tropical-shore.mp4";

const Carousel = () => (
  
  <div id="home-carousel" className="carousel slide carousel-fade" data-ride="carousel">

    <div className="carousel-inner">

      <div className="carousel-overlay">

        <div className="carousel-content text-center">

          <h1>Balti</h1>
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modalSignUp">Sign Up</button>
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modalMoreInfo">More Info</button>

        </div>

      </div>

      <div className="carousel-item active">
          <video playsInline="" autoPlay="true" muted="" loop="true" className="carousel-video video-man" id="video-man" >
              <source src={machuPicchu} type="video/mp4" />
          </video>
      </div>

      <div className="carousel-item">
          <video playsInline="" autoPlay="true" muted="" loop="true" className="carousel-video video-woman" id="video-woman" >
              <source src={tropicalShore} type="video/mp4" />
          </video>
      </div>

    </div>

    <a className="carousel-control-prev" href="#home-carousel" role="button" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#home-carousel" role="button" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>

</div>

);

export default Carousel;
