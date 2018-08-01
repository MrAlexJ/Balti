import React from "react";
import Carousel from "nuka-carousel";
import "./Stats.css";

const Stats = props => {
    console.log("USER STATS", props.data)

    return ( 
        <Carousel className="nuka-carousel" wrapAround={true} autoplay={true}>
        {props.data.map(stats => {
            console.log(stats.first_name)
            return(
             <div>   
            <h4>{stats.first_name} | accomplished: {stats.total_completed}</h4>
            </div> 
            )   
        })}
           
        </Carousel>
    );
}





export default Stats;