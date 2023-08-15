import {twMerge} from "tailwind-merge";
import React from 'react'
import {unit,multiply, cos,sin, string, Unit} from 'mathjs'
import { makeshape } from "./bl";
import nextId from "react-id-generator";
import PointSection from "./home/PointsSection";
import { useRef } from "react";
import useMeasure from 'react-use-measure'
/** this is a reusable component. sift message la biti t3rf kifach tst3mlo hehe (gha 9ra l interface a yban lik lblan)*/
//the other angles of the right triangle that we have always 45degree
// we have the hypothenus value and the angle is 45degre if we want to find adjacant we sould do  adj = cos(angle) * hypo
// and if we want the opposite we should od  opp = sin(angle) * hyp0;

// adj = cos(angle) * hypo, you're finding the length of the adjacent side.
//opp = sin(angle) * hypo, you're finding the length of the opposite side.

interface ParentCompProps {
    childComp?: React.ReactNode;// this the card content pass any component you want
    stroke?: string; //stroke color the string should be in this format "[color:#4E301F]"  use hexa in value
    fill?: string;   // fill color same format as stroke
    margine?: string;  // same forma as tailwind margines // this is the points that make ur shape searche about polygone clip-path to understand more or visite this website to make ur own shapes (https://www.cssportal.com/css-clip-path-generator/) example of the string input "14.42% -0.15%, 100% 0%, 100.23% 80.16%, 87.12% 100.88%, 0% 100%, -0.5% 20.08%"
    width?:number; // this is the width of the shape it should be number you may passe it ass porp like this width={1} the unit is always px
    height?:number; // same as width
    strokesize:number // this the size of stroke you can pass props same as widht it should be number as well
    cornerredius?:string // to controll the ridius of edges
    cornershape?:number[]// [0 0 0 0] TopLeft TopRight DownLeft DownRight  respectivly
    ratio?:number
}    




function CornerLinedCardTest(props:ParentCompProps){
    
    
      const [ref, bounds] = useMeasure()
    
    const pad = bounds.width * (props.ratio);
    
    const {childComp, stroke, fill, margine,cornerredius, cornershape} = props;
    
    const width:string = "w-[" + props.width + "px]" 
    const height:string = "before:[padding-top:"+pad+"px;]"
    const strokesizewidth:string = "w-[" + (props.width - props.strokesize) + "px;]"
    const strokesizeheight:string = "before:[padding-top:"+(pad - props.strokesize)+"px;]" 
    // const strokesizez:string = 
    const angleDegrees = 45; // Angle in degrees
    const angleRadians = unit(angleDegrees, 'deg'); //convert Degrees to radians

    const test = makeshape(cornershape, angleRadians, props.width , props.height);

    const id = nextId();
    const url = "url(#" + id + ")"
    console.log(bounds);   
    return (
        <div className={`curser-poiter ${props.margine}`} ref={ref}>
            <div style={{'--polygon-points':test,'--url' : url}} className={
                twMerge("modestroke",
                "w-[100%]",
                stroke,
                    "before:content-[''] before:block ",
                    height,
                )
            } >

                
                <div style={{'--url' : url}} className={
                    twMerge("modefill center ",
                    "w-[99%]",
                    strokesizeheight,  
                    fill
                    )
                } >
                    {childComp}
                </div>

                <svg style={{ visibility: "hidden", position: "absolute" }} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <filter id={id}>
                            <feGaussianBlur in="SourceGraphic" stdDeviation={cornerredius} result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                        </filter>
                    </defs>
                </svg>
            </div>
            
        </div>
    )
}



export default CornerLinedCardTest;