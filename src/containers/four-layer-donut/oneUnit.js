import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";
import DoughnutWrapper from "../../components/wrapper";
import Slice from "../../components/slice";
import Pie from "../../components/pie";
import "./oneunit.css";

// static values to supply for wrapper
const c_values = ["c2", "c3", "c4"];
const p_values = ["p2", "p3", "p4"];

// Slice-pie wrapper for equal parts
const SlicePieWrapperForEqaulParts = props => {
  const wrapper = c_values.map((item, index) => (
    <React.Fragment key={index}>
      <Slice clipnative slicedegree={90 * (index + 1)}>
        <Pie
          mainbg={props.bgclr}
          clipnative
          widthoffset={props.widthoffset}
          piebg={props.paintShades[c_values[index]]}
          degree="270"/>
      </Slice>
    </React.Fragment>
  ));

  return wrapper;
};

// Slice-pie wrapper for in-equal parts
const SlicePieWrapperForIneqaulParts = props => {
  // static values to supply for wrapper
  const wrapper = c_values.map((item, index) => (
    <React.Fragment key={index}>
      <Slice
        clipnative
        slicedegree={90 * (index + 1) - props.pValue[p_values[index]]}
        z_axis={props.pValue[p_values[index]]}>
        <Pie
          mainbg={props.bgclr}
          clipnative
          widthoffset={props.widthoffset}
          piebg={props.paintShades[c_values[index]]}
          degree={270 + props.pValue[p_values[index]]}/>
      </Slice>
    </React.Fragment>
  ));
  return wrapper;
};

const MultipleDoughnutWrapper = props => {
  const doughnutSize = props.doughnutSize;
  if (doughnutSize === "large") {
    return (
      <Fragment>
        <DoughnutWrapper donutwidth="220" setpos="40"/>
        <DoughnutWrapper
          className="modified_large_wrapper"
          donutwidth="240"
          setpos="40"/>
      </Fragment>
    );
  } else if (doughnutSize === "medium") {
    return (
      <Fragment>
        <DoughnutWrapper donutwidth="155" setpos="74"/>
        <DoughnutWrapper
          className="modified_medium_wrapper"
          donutwidth="175"
          setpos="74"/>
      </Fragment>
    );
  } else if (doughnutSize === "small") {
    return (
      <Fragment>
        <DoughnutWrapper donutwidth="110" setpos="95"/>
      </Fragment>
    );
  }
};

const Circle = props => {
  const {p1, p2, p3, p4, p5} = props.pievalues;
  const paintShadesRemaining = {
    p2,
    p3,
    p4,
    p5
  };
  return (
    <div>
      {props.shouldRemainEqual
        ? (
          <div style={{
            position: "relative"
          }}>
            <Slice slicedegree="0">
              <Pie
                mainbg={props.bgclr}
                widthoffset={props.widthoffset}
                piebg={props.paintShades.c1}
                degree="270"/>
            </Slice>
            {/* Except for first slice-pie wrapper, other are just dynamically rendered components*/}
            <SlicePieWrapperForEqaulParts {...props}/>
          </div>
        )
        : (
          <div className="wrapper" style={{
            position: "relative"
          }}>
            <Slice piebg="yellow">
              <Slice slicedegree={0 - p1}>
                <Pie
                  mainbg={props.bgclr}
                  widthoffset={props.widthoffset}
                  piebg={props.paintShades.c1}
                  degree={270 + p1}/>
              </Slice>
              {/* Except for first slice-pie wrapper, other are just dynamically rendered components*/}
              <SlicePieWrapperForIneqaulParts
                widthoffset={props.widthoffset}
                pValue={paintShadesRemaining}
                paintShades={props.paintShades}
                bgclr={props.bgclr}/>
            </Slice>
          </div>
        )}
      <MultipleDoughnutWrapper doughnutSize={props.doughnutSize}/>
    </div>
  );
};

Circle.propTypes = {
  shouldRemainEqual: PropTypes.bool,
  pievalues: PropTypes.object,
  paintShades: PropTypes.object,
  bgclr: PropTypes.string
};

Circle.defaultProps = {
  paintShades: {
    c1: "#D1A917",
    c2: "#2C9DC2",
    c3: "#D12A6A",
    c4: "#535353"
  },
  pievalues: {
    p1: 5,
    p2: 20,
    p3: 25,
    p4: 30
  }
};

export default Circle;
