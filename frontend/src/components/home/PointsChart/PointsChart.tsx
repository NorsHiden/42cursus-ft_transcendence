import Chart from 'react-apexcharts'
import { renderToString } from 'react-dom/server';

import CornerLinedCard from '../../CornerLinedCard/CornerLinedCard';

function PointsChart(){
    const state = {
        options: {
            
            markers: {
                colors: "#FFFFFF",
                strokeColors:"#1B191D",
                strokeWidth:3,
                showNullDataPoints: true,
                size:0,
                hover: {
                  size: 7,
                },
                // fillColor: "#FFFFFFF",
                
              },
            colors: ["#FE5821"],
              stroke: {
                curve: 'smooth',
                lineCap:"round",
                
              },
            grid:{
                show:false
              },
            chart: {
                id: 'apexchart-example',
                type: "line",
                color:"",
                animations: {
                    initialAnimation: {
                      enabled: false
                    }
                  },
                zoom:false,
                toolbar:{
                    show:false
                  },
            },
            xaxis: {
                crosshairs:{
                    show:false
                },    
                tooltip:{
                    enabled:false
                },
                show: true,
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                show: false,
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            tooltip: {
                custom: function({ series, seriesIndex, dataPointIndex, w }) {
                    // console.log("im inside tooltip: ",series, seriesIndex, dataPointIndex, w)
                    return (
                      renderToString(<CornerLinedCard childComp={
                          <div className="center w-[24px] h-[12px] flex items-center">
                              <p style={{ color: "black" }} className="font-sans center text-[8px] font-extrabold">{series[seriesIndex][dataPointIndex]}</p>
                          </div>
                      }
                          fill="[color:#FFFFFF]" cornerredius="0.5" stroke="[color:#D7D7D7]" cornershape={[3, 0, 3, 0]} strokesize={2} width={24} height={12} margine="" />
                      )
                  );
                  
                },
                theme: false,
                style: {
                    // fontSize: '12px',
                    fontFamily: undefined
                  },
                  
                },
        },
        series: [{
            name: 'series-1',
            data: [1, 80, 1, 90, 40, 70, 0]
            // data: [0, 80, 100, 452, 300, 610, 30000]
        },
        
    ]
    }

    return(
        <>
            <Chart options={state.options} series={state.series} />
        </>
    )
}


export default PointsChart