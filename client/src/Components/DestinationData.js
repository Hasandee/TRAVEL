import React, { Component } from 'react';
import '../Styles/Destination.css';
import Sigiriya1 from '../Assests/img5.jpg';
import Sigiriya2 from '../Assests/img6.jpg';

class DestinationData extends Component{
    render(){
        return(
           <div className={this.props.className}>
            <div className="des-text">
                <h2>{this.props.heading}</h2>
           <p>{this.props.text}</p>
            </div>
            <div className="image">
                <img alt="img" src={this.props.img1}/>
                <img alt="img" src={this.props.img2}/>
               
            </div>


         </div>  

        );
    }
}
export default DestinationData


