import Chart from 'react-apexcharts';
import { renderToString } from 'react-dom/server';

function PointsChart() {
  const options = {
    markers: {
      colors: '#FFFFFF',
      strokeColors: '#1B191D',
      strokeWidth: 3,
      showNullDataPoints: true,
      size: 0,
      hover: {
        size: 7,
      },
    },
    colors: ['#FE5821'],
    stroke: {
      curve: 'smooth',
      lineCap: 'round',
    },
    grid: {
      show: false,
    },
    chart: {
      id: 'apexchart-example',
      type: 'line',
      color: '',
      animations: {
        initialAnimation: {
          enabled: false,
        },
      },
      zoom: false,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      show: false,
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        return renderToString(
          <div className="bg-white p-2 flex items-center justify-center">
            <p className="font-sans center text-black text-sm font-semibold">
              {series[seriesIndex][dataPointIndex]}
            </p>
          </div>,
        );
      },
    },
  };

  const series = [
    {
      name: 'series',
      data: [1, 23, 1, 20, 100, 36, 0],
    },
  ];

  return <Chart options={options} series={series} type="line" width="500" />;
}

export default PointsChart;
