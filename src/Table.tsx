import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: React.Key;
  userCharacteristic: string;
  measuredEffect: string;
  effectFound: Array<string>;
  domain: Array<string>;
  modality: Array<string>;
  explainabilityType: Array<string>;
  recommenderType: Array<string>;
  level2: Array<DataType2>;
}

interface DataType2 {
  paperId: React.Key;
  title: string;
  firstAuthor: string;
  venue: string;
  url: string;
  effectFound: Array<string>;
  domain: string;
  modality: Array<string>;
  explainabilityType: string;
  recommenderType: Array<string>;
}

// TODO: Add filters and sorting
const columns: TableProps<DataType>['columns'] = [
  {
    title: 'User Characteristic',
    dataIndex: 'userCharacteristic',
    key: 'userCharacteristic',
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
          return ['Need For Cognition', 'Personal Innovativeness', 'Propensity To Trust Others', 'Conscientiousness', 'Neuroticism', 'Extraversion', 'Openness', 'Agreeableness', 'Social Awareness', 'Rationality', 'Decision-Making Strategy', 'Valence', 'Trust In Technology'].includes(record.userCharacteristic)
        }
        if (value === 'Experience') {
          return ['Visualization Literacy', 'Technical Expertise', 'Domain Knowledge'].includes(record.userCharacteristic)
        }
        if (value === 'Demographic') {
          return ['Gender', 'Age', 'Level Of Education', 'Country Of Residence'].includes(record.userCharacteristic)
        }
        return record.userCharacteristic ? record.userCharacteristic.includes(value as string) : false
      },
  },
  {
    title: 'Measured Effect',
    dataIndex: 'measuredEffect',
    key: 'measuredEffect',
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
      // {
      //   text: 'Explanation Preference',
      //   value: 'Explanation Preference',
      // },
      {
        text: 'Perceived Explanation Quality',
        value: 'Perceived Explanation Quality',
      },
      {
        text: 'Persuasiveness',
        value: 'Persuasiveness',
      },
      // {
      //   text: 'Satisfaction',
      //   value: 'Satisfaction',
      // },
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
      // {
      //   text: 'Other',
      //   value: 'Other',
      // }
    ],
    filterSearch: true,
    onFilter: (value, record) => record.measuredEffect ? record.measuredEffect.includes(value as string) : false,
  },
  {
    title: 'Effect Found',
    dataIndex: 'effectFound',
    key: 'effectFound',
    filters: [
      {
        text: 'No',
        value: 'No',
      },
      {
        text: 'Yes',
        value: 'Yes',
      },
      {
        text: 'Both',
        value: 'Both',
      }
    ],
    filterSearch: true,
    onFilter: (value, record) => {
      if (value === 'Both') {
      return record.effectFound.includes('Yes') && record.effectFound.includes('No');
      }
      return record.effectFound.includes(value as string);
    },
    render: (effectFound: Array<string>) => {
      return (
        <>
          {effectFound.map((effect) => {
            let color = effect === 'Yes' ? 'green' : 'red';
            return (
              <Tag color={color} key={effect}>
                {effect}
              </Tag>
            );
          })}
        </>
      )
    },
  },
  {
    title: 'Domain',
    dataIndex: 'domain',
    key: 'domain',
    filters: [
      // {
      //   text: 'App',
      //   value: 'App',
      // },
      // {
      //   text: 'Art',
      //   value: 'Art',
      // },
      // {
      //   text: 'Banking',
      //   value: 'Banking',
      // },
      // {
      //   text: 'Book',
      //   value: 'Book',
      // },
      {
        text: 'Document',
        value: 'Document',
      },
      // {
      //   text: 'Driving',
      //   value: 'Driving',
      // },
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
      // {
      //   text: 'Job',
      //   value: 'Job',
      // },
      {
        text: 'Movie',
        value: 'Movie',
      },
      // {
      //   text: 'Multiple',
      //   value: 'Multiple',
      // },
      {
        text: 'Music',
        value: 'Music',
      },
      // {
      //   text: 'News',
      //   value: 'News',
      // },
      {
        text: 'Online Dating',
        value: 'Online Dating',
      },
      {
        text: 'POI',
        value: 'POI',
      },
      // {
      //   text: 'Programming',
      //   value: 'Programming',
      // },
      {
        text: 'Social',
        value: 'Social',
      },
      // {
      //   text: 'Video Tag',
      //   value: 'Video Tag',
      // },
    ],
    filterSearch: true,
    onFilter: (value, record) => record.domain ? record.domain.includes(value as string) : false,
    render: (domain: Array<string>) => domain.join(', '),
  },
  {
    title: 'Modality',
    dataIndex: 'modality',
    key: 'modality',
    filters: [
      // {
      //   text: 'Audio',
      //   value: 'Audio',
      // },
      {
        text: 'Hybrid',
        value: 'Hybrid',
      },
      {
        text: 'Numerical',
        value: 'Numerical',
      },
      // {
      //   text: 'Tabular',
      //   value: 'Tabular',
      // },
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
    onFilter: (value, record) => record.modality ? record.modality.includes(value as string) : false,
    render: (modality: Array<string>) => modality.join(', '),

  },
  {
    title: 'Explainability Type',
    dataIndex: 'explainabilityType',
    key: 'explainabilityType',
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
    render: (explainabilityType: Array<string>) => explainabilityType.join(', '),
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
    render: (recommenderType: Array<string>) => recommenderType.join(', '),

  }
];

const columns2: TableProps<DataType2>['columns'] = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'First Author',
    dataIndex: 'firstAuthor',
    key: 'firstAuthor',
  },
  {
    title: 'Venue',
    dataIndex: 'venue',
    key: 'venue',
  },
  {
    title: 'Effect Found',
    dataIndex: 'effectFound',
    key: 'effectFound',
    render: (effectFound: Array<string>) => {
      return (
        <>
          {effectFound.map((effect) => {
            let color = effect === 'Yes' ? 'green' : 'red';
            return (
              <Tag color={color} key={effect}>
                {effect}
              </Tag>
            );
          })}
        </>
      )
    },
  },
  {
    title: 'Domain',
    dataIndex: 'domain',
    key: 'domain',
  },
  {
    title: 'Modality',
    dataIndex: 'modality',
    key: 'modality',
  },
  {
    title: 'Explainability Type',
    dataIndex: 'explainabilityType',
    key: 'explainabilityType',
  },
  {
    title: 'Recommender Type',
    dataIndex: 'recommenderType',
    key: 'recommenderType',
    render: (recommenderType: Array<string>) => recommenderType.join(', '),
  },
  {
    title: '',
    dataIndex: 'url',
    key: 'url',
    render: (url: string) => {
      return (
        <a href={url} target="_blank" rel="noreferrer">link</a>
      )
    }
  },
]

const MyTable: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    fetch('./characteristics_effects.json')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  const expandedRowRender = (record: DataType) => {
    return (
      <>
        <Table<DataType2>
          columns={columns2}
          dataSource={record.level2}
          pagination={false}
          size='small'
          />
        <br></br>
      </>
    )
  }

  return (
    <>
      <h1>User Characteristics Table</h1>
      <Table<DataType> 
        columns={columns} 
        expandable={{ expandedRowRender }}
        dataSource={data} 
        tableLayout='fixed'
        pagination={{ defaultPageSize: 50 }}
      />
    </>
  );
};

export default MyTable;