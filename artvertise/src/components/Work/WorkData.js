import { Component } from 'react';
import './WorkStyles.css';
// import image1 from '../images/image-0.jpeg'
// import image2 from '../images/image-1.jpeg'

class WorkData extends Component{
    render() {
        return(
            <div className={this.props.className}>
            <div className='des-text'>
                <h2>{this.props.heading}</h2>
                <p>
                    {this.props.text}
                </p>
            </div>
            <div className='image'>
                <img alt='artimage' src={this.props.img1}/>
                <img alt='artimage' src={this.props.img2}/>
            </div>
        </div>
        )
    }
}

export default WorkData;