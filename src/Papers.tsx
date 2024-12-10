import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: React.Key;
  firstAuthor: string;
  title: string;
  year: number;
  venue: string;
  domain: string;
  recommenderType: string;
  effects: Array<string>;
  userCharacteristic: Array<string> | null;
  modalities: Array<string>;
  explainabilityType: Array<string>;
}

const columns: TableProps<DataType>['columns'] = [
  {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: '16%',
        sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
        width: '7%',
        sorter: (a, b) => a.year - b.year,
        filters: [
          {
            text: '2022',
            value: '2022',
          },
          {
            text: '2021',
            value: '2021',
          },
          {
            text: '2020',
            value: '2020',
          },
          {
            text: '2019',
            value: '2019',
          },
          {
            text: '2018',
            value: '2018',
          },
          {
            text: '2017',
            value: '2017',
          },
        ],
        onFilter: (value, record) => record.domain ? record.domain.includes(value as string) : false,
    },
    {
        title: 'First Author',
        dataIndex: 'firstAuthor',
        key: 'authors',
        width: '7%',
    },
    {
        title: 'Venue',
        dataIndex: 'venue',
        key: 'venue',
        width: '8%',
        filters: [
          {
            text: 'CHI',
            value: 'CHI',
          },
          {
            text: 'IUI',
            value: 'IUI',
          },
          {
            text: 'RecSys',
            value: 'RecSys',
          },
          {
            text: 'UMAP',
            value: 'UMAP',
          },
          {
            text: 'Other',
            value: 'Other',
          }
        ],
      filterSearch: true,
      onFilter: (value, record) => {
        if (value === 'Other') {
          return record.venue ? ['CHI', 'IUI', 'RecSys', 'UMAP'].every(v => !record.venue.includes(v)) : false
        }
        return record.venue ? record.venue.includes(value as string) : false
      }
    },
    {
        title: 'User Characteristic',
        dataIndex: 'userCharacteristic',
        key: 'userCharacteristic',
        width: '12%',
        filters: [
          {
            text: 'Experience',
            value: 'Experience',
            children: [
              {
                text: 'Domain Knowledge',
                value: 'Domain Knowledge',
              },
              {
                text: 'Technical Expertise',
                value: 'Technical Expertise',
              },
              {
                text: 'Visualization Literacy',
                value: 'Visualization Literacy',
              },
            ]
          },
          {
            text: 'Demographic',
            value: 'Demographic',
            children: [
              {
                text: 'Age',
                value: 'Age'
              },
              {
                text: 'Country Of Residence',
                value: 'Country Of Residence'
              },
              {
                text: 'Gender',
                value: 'Gender'
              },
              {
                text: 'Level Of Education',
                value: 'Level Of Education'
              },
            ]
          },
          {
            text: 'Personality',
            value: 'Personality',
            children: [
              {
                text: 'Agreeableness',
                value: 'Agreeableness',
              },
              {
                text: 'Conscientiousness',
                value: 'Conscientiousness',
              },
              {
                text: 'Decision-Making Strategy',
                value: 'Decision-Making Strategy',
              },
              {
                text: 'Extraversion',
                value: 'Extraversion',
              },
              {
                text: 'Need For Cognition',
                value: 'Need For Cognition',
              },
              {
                text: 'Neuroticism',
                value: 'Neuroticism',
              },
              {
                text: 'Openness',
                value: 'Openness',
              },
              {
                text: 'Personal Innovativeness',
                value: 'Personal Innovativeness',
              },
              {
                text: 'Propensity To Trust Others',
                value: 'Propensity To Trust Others',
              },
              {
                text: 'Rationality',
                value: 'Rationality',
              },
              {
                text: 'Social Awareness',
                value: 'Social Awareness',
              },
              {
                text: 'Trust In Technology',
                value: 'Trust In Technology',
              },
              {
                text: 'Valence',
                value: 'Valence',
              },
            ],
          }
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value, record) => {
            if (value === 'Personality') {
              // check if userCharacteristic is included in the array
              return record.userCharacteristic ? record.userCharacteristic.some(char => ['Need For Cognition', 'Personal Innovativeness', 'Propensity To Trust Others', 'Conscientiousness', 'Neuroticism', 'Extraversion', 'Openness', 'Agreeableness', 'Social Awareness', 'Rationality', 'Decision-Making Strategy', 'Valence', 'Trust In Technology'].includes(char)) : false
            }
            if (value === 'Experience') {
              return record.userCharacteristic ? record.userCharacteristic.some(char => ['Visualization Literacy', 'Technical Expertise', 'Domain Knowledge'].includes(char)) : false
            }
            if (value === 'Demographic') {
              return record.userCharacteristic ? record.userCharacteristic.some(char => ['Gender', 'Age', 'Level Of Education', 'Country Of Residence'].includes(char)) : false
            }
            return record.userCharacteristic ? record.userCharacteristic.includes(value as string) : false
          },
        render: (userCharacteristic: Array<string> | null) => userCharacteristic && userCharacteristic.join(', '),
    },
    {
        title: 'Effects',
        dataIndex: 'effects',
        key: 'effects',
        width: '11%',
        filters: [
            {
              text: 'Effectiveness',
              value: 'Effectiveness',
            },
            {
              text: 'Efficiency',
              value: 'Efficiency',
            },
            {
              text: 'Explanation Preference',
              value: 'Explanation Preference',
            },
            {
              text: 'Perceived Explanation Quality',
              value: 'Perceived Explanation Quality',
            },
            {
              text: 'Persuasiveness',
              value: 'Persuasiveness',
            },
            {
              text: 'Satisfaction',
              value: 'Satisfaction',
            },
            {
              text: 'Transparency',
              value: 'Transparency',
            },
            {
              text: 'Trust',
              value: 'Trust',
            },
            {
              text: 'Usability/UX',
              value: 'Usability/UX',
            },
            {
              text: 'Other',
              value: 'Other',
            }
          ],
        filterSearch: true,
        onFilter: (value, record) => record.effects ? record.effects.includes(value as string) : false,
        render: (effects: Array<string>) => effects ? effects.join(', ') : '',
    },
    {
        title: 'Domain',
        dataIndex: 'domain',
        key: 'domain',
        width: '9%',
        filters: [
          {
            text: 'App',
            value: 'App',
          },
          {
            text: 'Art',
            value: 'Art',
          },
          {
            text: 'Banking',
            value: 'Banking',
          },
          {
            text: 'Book',
            value: 'Book',
          },
          {
            text: 'Document',
            value: 'Document',
          },
          {
            text: 'Driving',
            value: 'Driving',
          },
          {
            text: 'E-Commerce',
            value: 'E-Commerce',
          },
          {
            text: 'Education',
            value: 'Education',
          },
          {
            text: 'Energy Saving',
            value: 'Energy Saving',
          },
          {
            text: 'Health',
            value: 'Health',
          },
          {
            text: 'Job',
            value: 'Job',
          },
          {
            text: 'Movie',
            value: 'Movie',
          },
          {
            text: 'Multiple',
            value: 'Multiple',
          },
          {
            text: 'Music',
            value: 'Music',
          },
          {
            text: 'News',
            value: 'News',
          },
          {
            text: 'Online Dating',
            value: 'Online Dating',
          },
          {
            text: 'POI',
            value: 'POI',
          },
          {
            text: 'Programming',
            value: 'Programming',
          },
          {
            text: 'Social',
            value: 'Social',
          },
          {
            text: 'Video Tag',
            value: 'Video Tag',
          },
        ],
        filterSearch: true,
        onFilter: (value, record) => record.domain ? record.domain.includes(value as string) : false,
    },
    {
        title: 'Modalities',
        dataIndex: 'modalities',
        key: 'modality',
        width: '9%',
        filters: [
            {
              text: 'Audio',
              value: 'Audio',
            },
            {
              text: 'Hybrid',
              value: 'Hybrid',
            },
            {
              text: 'Numerical',
              value: 'Numerical',
            },
            {
              text: 'Tabular',
              value: 'Tabular',
            },
            {
              text: 'Textual',
              value: 'Textual',
            },
            {
              text: 'Visual',
              value: 'Visual',
            },
          ],
        filterSearch: true,
        onFilter: (value, record) => record.modalities ? record.modalities.includes(value as string) : false,
        render: (modalities: Array<string>) => modalities ? modalities.join(', ') : '',
    },
    {
        title: 'Explainability Type',
        dataIndex: 'explainabilityType',
        key: 'explainabilityType',
        width: '10%',
        filters: [
            {
              text: 'Model-Intrinsic',
              value: 'Model-Intrinsic',
            },
            {
              text: 'Post-Hoc',
              value: 'Post-Hoc',
            },
          ],
        filterSearch: true,
        onFilter: (value, record) => record.explainabilityType ? record.explainabilityType.includes(value as string) : false,
    },
    {
        title: 'Recommender Type',
        dataIndex: 'recommenderType',
        key: 'recommenderType',
        width: '11%',
        filters: [
            {
              text: 'Collaborative Filtering',
              value: 'Collaborative Filtering',
            },
            {
              text: 'Content-Based',
              value: 'Content-Based',
            },
            {
              text: 'Hybrid',
              value: 'Hybrid',
            },
          ],
        filterSearch: true,
        onFilter: (value, record) => record.recommenderType ? record.recommenderType.includes(value as string) : false,

    },
];

const Papers: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    // fetch('/src/db/papers.json')
    fetch('./papers.json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div style={{ minWidth: '1200px' }}>
      <h1>Papers</h1>
      <Table<DataType> 
      columns={columns} 
      dataSource={data} 
      tableLayout='fixed'
      />
    </div>
  );
};

export default Papers;