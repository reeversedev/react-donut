import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DoughnutWrapper from '../minimalcomponents/wrapper';
import Slice from '../minimalcomponents/slice';
import Pie from '../minimalcomponents/pie'
import Button from '../minimalcomponents/button';
import Wrapper from '../minimalcomponents/divwrapper';

class Circle extends Component{
    constructor(props){
        super(props);
        this.state = {
            leaveEqual : this.props.shouldRemainEqual,
            progress : this.props.progressrate,
            showBtn : true,
            value : ''
        }
    }
    
    componentDidMount () {
        this.setState({
            value : Math.floor(this.props.progressrate * (100 / 360)) + '%'
        })
    }

    // User Defined Methods

    incProgress = () => {
        this.setState({
            progress : this.state.progress + 5
        })
    }

    decProgress = () => {
        this.setState({
            progress : this.state.progress - 5
        })
    }

    removeOffset = () => {
        this.setState({
            showBtn : false,
            value : Math.floor(this.state.progress * (100 / 360)) + '%'
        })
    }

    render(){
        const { progress } = this.state;
        return(
            <div style={{'marginTop' : '20%'}}>
             <Wrapper mainbg="white" >
                <div className ="wrapper" style={{position : 'relative'}}>
                    <Slice piebg="yellow">
                    {(progress > 180) ? (<div>
                        
                        <Slice  slicedegree={ 0 } >
                                <Pie mainbg={this.props.bgclr} widthoffset="28" piebg={ this.props.paintShades.c1 }  degree={ 0 } />
                            </Slice> 
                            <Slice clipnative slicedegree={ 0 }  z_axis={progress}>
                                <Pie mainbg={this.props.bgclr} clipnative widthoffset="28" piebg={ this.props.paintShades.c2 }  degree={ 180 + progress } />
                            </Slice> 
                    </div>) :(
                        <div>
                            <Slice  slicedegree={ 0 } >
                                <Pie mainbg={this.props.bgclr} widthoffset="28" piebg={ this.props.paintShades.c2 }  degree={ 0 } />
                            </Slice> 
                            <Slice clipnative slicedegree={ 180 }  z_axis={progress}>
                                <Pie mainbg={this.props.bgclr} clipnative widthoffset="28" piebg={ this.props.paintShades.c1 }  degree={ 180 + progress } />
                            </Slice> 
                        </div>
                    )}
                    </Slice>
                </div> 
                <DoughnutWrapper mainbg={this.props.bgclr} donutwidth="220" setpos="40" >
                    {this.state.value}
                </DoughnutWrapper>
            </Wrapper>
                {this.state.showBtn === true ?(<div>
                    <Button leftpos="20%" onClick={this.incProgress}> + </Button>
                    <Button leftpos="22%" onClick={this.decProgress}> - </Button>
                    <Button leftpos="24%" onClick={this.removeOffset}> Set </Button>
                 </div>) : <div> </div> 
                }
               
            </div>
        );
    }
}

Circle.propTypes = {
    shouldRemainEqual : PropTypes.bool,
    sizeoffset : PropTypes.number,
    progressrate : PropTypes.number
}

export default Circle;