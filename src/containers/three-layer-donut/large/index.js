import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DoughnutWrapper from '../../../components/wrapper';
import Slice from '../../../components/slice';
import Pie from '../../../components/pie';
import DistributedLayerDoughnut from '../distributedLayerDoughnut';
import './index.css'

class Circle extends Component{
    constructor(props){
        super(props);
        this.state = {
            leaveEqual : this.props.shouldRemainEqual,
            pie : this.props.pievalues,
        }
    }
    
    render(){
        const { p1,p2,p3,p4,p5 } = this.state.pie;
        return(
            <div style={{'marginTop' : '10%'}}>
                { 
                  this.state.leaveEqual === true ? (
                    <div style={{position : 'relative'}}> 
                        <Slice  slicedegree="0">
                            <Pie mainbg={this.props.bgclr} widthoffset="0" piebg={ this.props.paintShades.c1 } degree="300" />
                        </Slice>
                        <Slice clipnative slicedegree="120">
                            <Pie mainbg={this.props.bgclr} clipnative widthoffset="0" piebg={ this.props.paintShades.c2 } degree="300" />
                        </Slice>
                        <Slice clipnative slicedegree="240" >
                            <Pie mainbg={this.props.bgclr} clipnative widthoffset="0" piebg={ this.props.paintShades.c3 } degree="300" />
                        </Slice>
                    </div>
                  ) :(
                <div className ="wrapper" style={{position : 'relative'}}>
                    <Slice piebg="yellow">
                        <Slice  slicedegree={ 0 - p1 } >
                            <Pie mainbg={this.props.bgclr} widthoffset="0" piebg={ this.props.paintShades.c1 } degree={ 300 + p1} />
                        </Slice> 
                        <Slice clipnative slicedegree={ 120 - p2 }  z_axis={p2}>
                            <Pie mainbg={this.props.bgclr} clipnative widthoffset="0" piebg={ this.props.paintShades.c2 } degree={ 300 + p2 } />
                        </Slice> 
                        <Slice clipnative slicedegree={ 240 - p3  }  z_axis={p3}>
                            <Pie mainbg={this.props.bgclr} clipnative widthoffset="0" piebg={ this.props.paintShades.c3 } degree={ 300 + p3} />
                        </Slice> 
                    </Slice>
                </div> 
                 )
                }
                
                <DoughnutWrapper donutwidth="220" setpos="40" />
                <DoughnutWrapper className="modified_large_wrapper" donutwidth="240" setpos="40" />
            </div>
        );
    }
}

Circle.propTypes = {
    shouldRemainEqual : PropTypes.bool,
    pievalues : PropTypes.object,
    paintShades : PropTypes.object
}

export default Circle;
