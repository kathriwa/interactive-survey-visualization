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
    labels: ['Age', 'Agreeableness', 'Conscientiousness', 'Country of Residence', 'Decision-Making Strategy', 'Domain Knowledge', 'Extraversion', 'Gender', 'Level of Education', 'Need for Cognition', 'Neuroticism', 'Openness', 'Personal Innovativeness', 'Propensity to Trust Others', 'Rationality', 'Social Awareness', 'Technical Expertise', 'Trust in Technology', 'Valence', 'Visualization Literacy'],
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
      legend: {
        labels: {
          filter: (legendItem: any) => {
            return !legendItem.text.endsWith('-neg');
          },
          font: {
            size: 14
          }
        },
        onClick: legendOnClick
      },
      tooltip: {
        xAlign: "center" as "center",
        callbacks: {
          label: function(_: any) {
            return "";
          },
          afterTitle: function(tooltipItem: any) {
            let label = tooltipItem[0].dataset.label;
            if (label.endsWith('-neg')) {
              label = label.slice(0, -4);
            }
            return `${label}`;
          },
          beforeBody: function(tooltipItem: any) {
            let num = 0;
            let num_neg = 0;
            if (tooltipItem[0].dataset.label.endsWith('-neg')) {
              let label = tooltipItem[0].dataset.label.slice(0, -4);
              num_neg = -tooltipItem[0].raw;
              let column_index = tooltipItem[0].dataIndex;
              num = data2.datasets.filter((item: any) => item.label === label)[0].data[column_index];
            }
            else {
              let label = tooltipItem[0].dataset.label;
              let label_neg = label + '-neg';
              num = tooltipItem[0].raw;
              let column_index = tooltipItem[0].dataIndex;
              num_neg = -data2.datasets.filter((item: any) => item.label === label_neg)[0].data[column_index];
            }
            return `Found:        ${num}\nNot Found: ${num_neg}`;
          }
        }
      }
    },
    // responsive: true,
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
          text: '# Papers which found an Effect',
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
    <div>
      <Bar data={data2} options={options} />
    </div>
  )
};

export default StackedBarChart;