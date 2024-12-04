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
        // width: 200,
        sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
        // width: '10%',
        sorter: (a, b) => a.year - b.year,
    },
    {
        title: 'First Author',
        dataIndex: 'firstAuthor',
        key: 'authors',
    },
    {
        title: 'Venue',
        dataIndex: 'venue',
        key: 'venue',
    },
    {
        title: 'User Characteristic',
        dataIndex: 'userCharacteristic',
        key: 'userCharacteristic',
        // [nan 'Need For Cognition' 'Visualization Literacy' 'Personal Innovativeness' 'Technical Expertise' 'Gender' 'Propensity To Trust Others' 'Age' 'Conscientiousness' 'Neuroticism' 'Extraversion' 'Openness' 'Agreeableness' 'Domain Knowledge' 'Level Of Education' 'Social Awareness' 'Rationality' 'Decision-Making Strategy' 'Valence' 'Country Of Residence' 'Trust In Technology']
        filters: [
          {
            text: 'Experience',
            value: 'Experience',
            children: [
              {
                text: 'Visualization Literacy',
                value: 'Visualization Literacy',
              },
              {
                text: 'Technical Expertise',
                value: 'Technical Expertise',
              },
              {
                text: 'Domain Knowledge',
                value: 'Domain Knowledge',
              }
            ]
          },
          {
            text: 'Demographic',
            value: 'Demographic',
            children: [
              {
                text: 'Gender',
                value: 'Gender'
              },
              {
                text: 'Age',
                value: 'Age'
              },
              {
                text: 'Level Of Education',
                value: 'Level Of Education'
              },
              {
                text: 'Country Of Residence',
                value: 'Country Of Residence'
              }
            ]
          },
          {
            text: 'Personality',
            value: 'Personality',
            children: [
              {
                text: 'Need For Cognition',
                value: 'Need For Cognition',
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
                text: 'Conscientiousness',
                value: 'Conscientiousness',
              },
              {
                text: 'Neuroticism',
                value: 'Neuroticism',
              },
              {
                text: 'Extraversion',
                value: 'Extraversion',
              },
              {
                text: 'Openness',
                value: 'Openness',
              },
              {
                text: 'Agreeableness',
                value: 'Agreeableness',
              },
              {
                text: 'Social Awareness',
                value: 'Social Awareness',
              },
              {
                text: 'Rationality',
                value: 'Rationality',
              },
              {
                text: 'Decision-Making Strategy',
                value: 'Decision-Making Strategy',
              },
              {
                text: 'Valence',
                value: 'Valence',
              },
              {
                text: 'Trust In Technology',
                value: 'Trust In Technology',
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
        // ['Perceived Explanation Quality' 'Transparency' 'Persuasiveness' 'Usability/UX' 'Efficiency' 'Effectiveness' 'Trust']
        filters: [
            {
              text: 'Transparency',
              value: 'Transparency',
            },
            {
              text: 'Efficiency',
              value: 'Efficiency',
            },
            {
              text: 'Persuasiveness',
              value: 'Persuasiveness',
            },
            {
              text: 'Trust',
              value: 'Trust',
            },
            {
              text: 'Effectiveness',
              value: 'Effectiveness',
            },
            {
              text: 'Usability/UX',
              value: 'Usability/UX',
            },
            {
              text: 'Satisfaction',
              value: 'Satisfaction',
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
              text: 'Other',
              value: 'Other',
            }
          ],
        filterSearch: true,
        render: (effects: Array<string>) => effects ? effects.join(', ') : '',
        onFilter: (value, record) => record.effects ? record.effects.includes(value as string) : false,
    },
    {
        title: 'Domain',
        dataIndex: 'domain',
        key: 'domain',
        // ['Music' 'Health' 'Social' 'Document' 'Poi' 'Education' 'Energy Saving' 'E-Commerce' 'Movie' 'Online Dating']
        filters: [
            {
              text: 'Music',
              value: 'Music',
            },
            {
              text: 'Health',
              value: 'Health',
            },
            {
              text: 'Social',
              value: 'Social',
            },
            {
              text: 'Document',
              value: 'Document',
            },
            {
              text: 'Poi',
              value: 'Poi',
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
              text: 'E-Commerce',
              value: 'E-Commerce',
            },
            {
              text: 'Movie',
              value: 'Movie',
            },
            {
              text: 'Online Dating',
              value: 'Online Dating',
            },
          ],
        filterSearch: true,
        onFilter: (value, record) => record.domain ? record.domain.includes(value as string) : false,
    },
    {
        title: 'Modalities',
        dataIndex: 'modalities',
        key: 'modality',
        //  ['Textual' 'Hybrid' 'Visual' 'Audio' 'Numerical' 'Tabular' 'Not Mentioned' nan]
        filters: [
            {
              text: 'Hybrid',
              value: 'Hybrid',
            },
            {
              text: 'Textual',
              value: 'Textual',
            },
            {
              text: 'Visual',
              value: 'Visual',
            },
            {
              text: 'Audio',
              value: 'Audio',
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
              text: 'Not Mentioned',
              value: 'Not Mentioned',
            }
          ],
        filterSearch: true,
        render: (modalities: Array<string>) => modalities ? modalities.join(', ') : '',
        onFilter: (value, record) => record.modalities ? record.modalities.includes(value as string) : false,
    },
    {
        title: 'Explainability Type',
        dataIndex: 'explainabilityType',
        key: 'explainabilityType',
        // ['Post-Hoc' nan 'Model-Intrinsic']
        filters: [
            {
              text: 'Post-Hoc',
              value: 'Post-Hoc',
            },
            {
              text: 'Model-Intrinsic',
              value: 'Model-Intrinsic',
            },
          ],
        filterSearch: true,
        onFilter: (value, record) => record.explainabilityType ? record.explainabilityType.includes(value as string) : false,
    },
    {
        title: 'Recommender Type',
        dataIndex: 'recommenderType',
        key: 'recommenderType',
        // ['Content-Based' '-' 'Collaborative Filtering' 'Hybrid' 'None']
        filters: [
            {
              text: 'Content-Based',
              value: 'Content-Based',
            },
            {
              text: 'Collaborative Filtering',
              value: 'Collaborative Filtering',
            },
            {
              text: 'Hybrid',
              value: 'Hybrid',
            },
            {
              text: 'None',
              value: 'None',
            },
          ],
        filterSearch: true,
        onFilter: (value, record) => record.recommenderType ? record.recommenderType.includes(value as string) : false,

    },
];

const Papers: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    fetch('/src/db/papers.json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      <h1>Papers</h1>
      <Table<DataType> 
        columns={columns} 
        // expandable={{
        //   expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.title}</p>,
        //   rowExpandable: (record) => record.title !== 'Not Expandable',
        // }}
        dataSource={data} 
        // pagination={{ pageSize: 20 }}
        // tableLayout='fixed'
      />
    </>
  );
};

export default Papers;