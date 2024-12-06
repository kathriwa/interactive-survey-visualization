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
        // [nan 'Need For Cognition' 'Visualization Literacy' 'Personal Innovativeness' 'Technical Expertise' 'Gender' 'Propensity To Trust Others' 'Age' 'Conscientiousness' 'Neuroticism' 'Extraversion' 'Openness' 'Agreeableness' 'Domain Knowledge' 'Level Of Education' 'Social Awareness' 'Rationality' 'Decision-Making Strategy' 'Valence' 'Country Of Residence' 'Trust In Technology']
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
        // TODO: increase width of filder dropdown
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
        // ['', 'App', 'Art', 'Banking', 'Book', 'Document', 'Driving', 'E-Commerce', 'Education', 'Energy Saving', 'Health', 'Job', 'Movie', 'Multiple', 'Music', 'News', 'Online Dating', 'POI', 'Programming', 'Social', 'Video Tag']
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
        //  ['Textual' 'Hybrid' 'Visual' 'Audio' 'Numerical' 'Tabular' 'Not Mentioned' nan]
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