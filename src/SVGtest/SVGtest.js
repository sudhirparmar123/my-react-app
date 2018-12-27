import React,{Component} from 'react'
import ReactSVG from 'react-svg'
import svgimg from'../AJ_Digital_Camera.svg';

class SVGtest extends Component{
    render(){
       return <ReactSVG src={svgimg} />
    }
}
export default SVGtest;