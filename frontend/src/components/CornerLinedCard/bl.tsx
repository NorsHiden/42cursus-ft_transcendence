import {unit,multiply, cos,sin, Unit} from 'mathjs'

//it return the adjacent if the flag is 0. otherwise it returns the opposite.
export const GetAdjAndOpp = (flag:number, angleRadians:Unit, hypo:number):number => {
    switch (flag) {
        case 0:
            return (multiply(cos(angleRadians), hypo))
        case 1:
            return (multiply(sin(angleRadians), hypo))
    }
    return (0)
}

export const makeshape = (size:number[], angleRadians:Unit, width:number , heigth:number):string => {

    // const
    //we have the distance of adjacent. we want to convert it to a percentage of a given length (width is the given lenght) // keep in mind that the y here is always 0
    const UpLeftPercentageWidth = (GetAdjAndOpp(0, angleRadians, size[0]) / width) * 100;

   //we have the distance of opposite . we want to convert it to a percentage of a given length (height is the given lenght) // keep in mind that the x here is always 0 
    const UpLeftPercentageHeight = (GetAdjAndOpp(1, angleRadians, size[0]) / heigth) * 100;
    
    //and repeat the same for other edges
    const UpRightPercentageWidth = (GetAdjAndOpp(0, angleRadians, size[1]) / width) * 100;
    const UpRightPercentageHeight = (GetAdjAndOpp(1, angleRadians, size[1]) / heigth) * 100;

    const DownLeftPercentageWidth = (GetAdjAndOpp(0, angleRadians, size[3]) /width) * 100;
    const DownLeftPercentageHeight = (GetAdjAndOpp(1, angleRadians, size[3]) / heigth) * 100;

    const DownRightPercentageWidth = (GetAdjAndOpp(0, angleRadians, size[2]) / width) * 100;
    const DownRightPercentageHeight = (GetAdjAndOpp(1, angleRadians, size[2]) / heigth) * 100;

    const poly = UpLeftPercentageWidth + "% 0%, "+(100 -UpRightPercentageWidth) +"% 0%,100% " + UpRightPercentageHeight + "%"+",100%" + (100 - DownRightPercentageHeight)+"%, "+ (100 - DownRightPercentageWidth) + "% 100%," + DownLeftPercentageWidth + "% 100%, 0% " + (100 - DownLeftPercentageHeight) +"%," +"0% " + UpLeftPercentageHeight + "%"; 
    
    return (poly)
}
