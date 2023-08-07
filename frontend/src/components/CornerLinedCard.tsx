import {twMerge} from "tailwind-merge";
import React from 'react'

/** this is a reusable component. sift message la biti t3rf kifach tst3mlo hehe (gha 9ra l interface a yban lik lblan)*/


interface ParentCompProps {
    childComp?: React.ReactNode;// this the card content pass any component you want
    stroke?: string; //stroke color the string should be in this format "[color:#4E301F]"  use hexa in value
    fill?: string;   // fill color same format as stroke
    margine?: string;  // same forma as tailwind margines
    polygonpoints?:string; // this is the points that make ur shape searche about polygone clip-path to understand more or visite this website to make ur own shapes (https://www.cssportal.com/css-clip-path-generator/) example of the string input "14.42% -0.15%, 100% 0%, 100.23% 80.16%, 87.12% 100.88%, 0% 100%, -0.5% 20.08%"
    width?:number; // this is the width of the shape it should be number you may passe it ass porp like this width={1} the unit is always px
    height?:number; // same as width
    strokesize?:number // this the size of stroke you can pass props same as widht it should be number as well
    cornerredius?:string // to controll the ridius of edges
}

function CornerLinedCard(props:ParentCompProps){
    const {childComp, stroke, fill, margine, polygonpoints, cornerredius} = props;
    const width:string = "w-[" + props.width + "px]" 
    const height:string = "before:[padding-top:"+props.height+"px;]"
    const strokesizewidth:string = "w-[" + (props.width - props.strokesize) + "px]"
    const strokesizeheight:string = "before:[padding-top:"+(props.height - props.strokesize)+"px;]" 
    // const strokesizez:string = 
    return (
        <div className="cursor-pointer">
            <div style={{'--polygon-points':polygonpoints}} className={
                twMerge("modestroke inline-block [filter: url(#round)] ",
                width,
                stroke,
                    "before:content-[''] before:block ",
                    height,
                    props.margine,
                )
            } >

                
                <div className={
                    twMerge("modefill center flex items-center justify-center",
                    strokesizewidth,
                    strokesizeheight,  
                    fill
                    )
                } >
                    {childComp}
                </div>

                <svg style={{ visibility: "hidden", position: "absolute" }} width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <filter id="round">
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

export default CornerLinedCard;