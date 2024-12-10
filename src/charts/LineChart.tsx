import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { SetStateAction, useEffect, useState } from 'react';
import { Select } from 'antd';
import { interpolateRainbow } from 'd3-scale-chromatic';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface DataType {
  key: React.Key;
  firstAuthor: string;
  title: string;
  year: number;
  venue: string;
  domain: string;
  recommenderType: string;
  effects: Array<string>;
  userCharacteristic: Array<string>;
  modalities: Array<string>;
  explainabilityType: Array<string>;
}

interface ChartData {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  backgroundColor: string;
  tension: number;
}

function interpolateColors(dataLength: number, colorScale: any) {
  var intervalSize = 1 / dataLength;
  var colorArray = [];

  for (var i = 0; i < dataLength; i++) {
    colorArray.push(colorScale((i * intervalSize)));
  }

  return colorArray;
}

const generateChartData = (papers: DataType[], selectedOption: string) => {
  const years = [2017, 2018, 2019, 2020, 2021, 2022];
  const tension = 0.3;
  let data:Array<ChartData> = [];

  const colorScheme = interpolateRainbow

  if (selectedOption === 'domain') {
    const categories = Array.from(new Set(papers.map((paper: { domain: any; }) => paper.domain)));
    const filtered = categories.filter(domain => domain !== '');

    // Remove domain with only one paper
    const filtered2 = filtered.filter(domain => !['App', 'Book', 'Driving', 'Job', 'News', 'Programming', 'Video Tag'].includes(domain));
    const sorted = filtered2.sort();

    const colors = interpolateColors(sorted.length, colorScheme);

    data = sorted.map(domain => {
      const domainData = years.map(year => {
        return papers.filter(paper => paper.domain === domain && paper.year <= year).length;
      });
      
      const line_color = colors.pop();
      
      return {
        label: domain,
        data: domainData,
        fill: false,
        borderColor: line_color,
        backgroundColor: line_color,
        tension: tension,
      };
    });
  }
  else if (selectedOption === 'effects') {
    const categories = Array.from(new Set(papers.flatMap((item) => item.effects)))
    const filtered = categories.filter(effect => effect);
    const sorted = filtered.sort();

    const colors = interpolateColors(sorted.length, colorScheme);

    data = sorted.map(category => {
      const categoryData = years.map((year) => {
        return papers.filter((item) => item.year <= year && (item.effects ? item.effects.includes(category) : false)).length
      });

      const line_color = colors.pop();
      
      return {
        label: category,
        data: categoryData,
        fill: false,
        borderColor: line_color,
        backgroundColor: line_color,
        tension: tension,
      };
    });
  }
  else if (selectedOption === 'modalities') {
    const categories = Array.from(new Set(papers.flatMap((item) => item.modalities)))
    const filtered = categories.filter(effect => effect);
    const sorted = filtered.sort();

    const colors = interpolateColors(sorted.length, colorScheme);

    data = sorted.map(category => {
      const categoryData = years.map((year) => {
        return papers.filter((item) => item.year <= year && (item.modalities ? item.modalities.includes(category) : false)).length
      });

      const line_color = colors.pop();
      
      return {
        label: category,
        data: categoryData,
        fill: false,
        borderColor: line_color,
        backgroundColor: line_color,
        tension: tension,
      };
    });
  }
  else if (selectedOption === 'explainabilityType') {
    const categories = Array.from(new Set(papers.flatMap((item) => item.explainabilityType)))
    const filtered = categories.filter(effect => effect);
    const sorted = filtered.sort();

    const colors = interpolateColors(sorted.length, colorScheme);

    data = sorted.map(category => {
      const categoryData = years.map((year) => {
        return papers.filter((item) => item.year <= year && (item.explainabilityType ? item.explainabilityType.includes(category) : false)).length
      });

      const line_color = colors.pop();
      
      return {
        label: category,
        data: categoryData,
        fill: false,
        borderColor: line_color,
        backgroundColor: line_color,
        tension: tension,
      };
    });
  }
  else if (selectedOption === 'recommenderType') {
    const categories = Array.from(new Set(papers.flatMap((item) => item.recommenderType)))
    const filtered = categories.filter(effect => effect);
    const sorted = filtered.sort();

    const colors = interpolateColors(sorted.length, colorScheme);

    data = sorted.map(category => {
      const categoryData = years.map((year) => {
        return papers.filter((item) => item.year <= year && (item.recommenderType ? item.recommenderType.includes(category) : false)).length
      });

      const line_color = colors.pop();
      
      return {
        label: category,
        data: categoryData,
        fill: false,
        borderColor: line_color,
        backgroundColor: line_color,
        tension: tension,
      };
    });
  }
  else if (selectedOption === 'userCharacteristic') {
    const categories = ["Demographic", "Experience", "Personality"];
    const filtered = categories.filter(effect => effect);
    const sorted = filtered.sort();

    const subgroups : Record<string, Array<string>> = {
      "Demographic": ["Age", "Country of Residence", "Gender", "Level of Education"],
      "Experience": ["Domain Knowledge", "Technical Expertise", "Visualization Literacy"],
      "Personality": ['Need For Cognition', 'Personal Innovativeness', 'Propensity To Trust Others', 'Conscientiousness', 'Neuroticism', 'Extraversion', 'Openness', 'Agreeableness', 'Social Awareness', 'Rationality', 'Decision-Making Strategy', 'Valence', 'Trust In Technology']
    }

    const colors = interpolateColors(sorted.length, colorScheme);

    data = sorted.map(category => {
      const categoryData = years.map((year) => {
        return papers.filter((item) => item.year <= year && (item.userCharacteristic ? item.userCharacteristic.some(char => subgroups[category].includes(char)) : false)).length
      });

      const line_color = colors.pop();
      
      return {
        label: category,
        data: categoryData,
        fill: false,
        borderColor: line_color,
        backgroundColor: line_color,
        tension: tension,
      };
    });
  }

  return {
    labels: years,
    datasets: data,
  };

  
};

const LineChart = () => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('effects');


  useEffect(() => {
    fetch('./papers.json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const handleOptionChange = (value: SetStateAction<string>) => {
    setSelectedOption(value);
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Cummulative Chart',
      },
      legend: {
        labels: {
          font: {
            size: 14
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 14
          }
        }
      },
      y: {
        ticks: {
          font: {
            size: 14
          }
        }
      }
    }
  }

  return (
    <div>
      <Select
      defaultValue="effects"
      style={{ width: 200 }}
      onChange={handleOptionChange}
      options={[
        { value: 'effects', label: 'Effects' },
        { value: 'userCharacteristic', label: 'User Characteristic' },
        { value: 'domain', label: 'Domain' },
        { value: 'modalities', label: 'Modalities' },
        { value: 'explainabilityType', label: 'Explainability Type' },
        { value: 'recommenderType', label: 'Recommender Type' },
      ]}
      />
      <Line data={generateChartData(data, selectedOption)} options={options}/>
    </div>
  );
};

export default LineChart;