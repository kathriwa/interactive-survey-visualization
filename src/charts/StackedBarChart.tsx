import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface BarChartData {
  label: string;
  data: number[];
  backgroundColor: string;
}

const StackedBarChart = () => {
  const [data, setData] = useState<BarChartData[]>([]);

  useEffect(() => {
    fetch('./bar_chart_data.json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const data2 = {
    // labels: ['social awareness', 'age', 'agreeableness'], // characteristics
    labels: ['Social Awareness', 'Age', 'Agreeableness', 'Conscientiousness', 'Country Of Residence', 'Decision-Making Strategy', 'Domain Knowledge', 'Extraversion', 'Gender', 'Level Of Education', 'Need For Cognition', 'Neuroticism', 'Openness', 'Personal Innovativeness', 'Propensity To Trust Others', 'Rationality', 'Technical Expertise', 'Trust In Technology', 'Valence', 'Visualization Literacy'],
    // labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], // characteristics
    datasets: data,
  };
  console.log(data2);


  // create a custom onClick function for the legend
  const legendOnClick = (_: any, legendItem: any, legend: any) => {
    console.log(legendItem);
    console.log(legend)
    const index = legendItem.datasetIndex;
    const ci = legend.chart;
    if (ci.isDatasetVisible(index)) {
      ci.hide(index);
      ci.hide(index+1);
      legendItem.hidden = true;
    } else {
      ci.show(index);
      ci.show(index+1);
      legendItem.hidden = false;
    }
  }

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Characteristics-Effects Chart',
      },
      legend: {
        labels: {
          filter: (legendItem: any) => {
            // const allowedLabels = ['transparency', 'age', 'agreeableness']; // Specify desired labels
            // return allowedLabels.includes(legendItem.text);
            // ensure that the legend only shows labels which do not end in '-neg'
            return !legendItem.text.endsWith('-neg');
          },
          font: {
            size: 14
          }
        },
        onClick: legendOnClick
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          font: {
            size: 14
          }
        }
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: '# Papers which found an Effect', // Add your label here
          font: {
            size: 14
          }
        },
        min: -15,
        max: 15,
},
    },
    animation: {
      duration: 0,
    },
  };

  return (
    <div style={{ width: '100%' }}>
      <Bar data={data2} options={options} />
    </div>
  )
};

export default StackedBarChart;