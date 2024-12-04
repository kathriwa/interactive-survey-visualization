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
  explanationType: Array<string>;
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
  explanationType: string;
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
        text: 'Personality',
        value: 'Personality',
      },
      {
        text: 'Experience',
        value: 'Experience',
      },
      {
        text: 'Demographic',
        value: 'Demographic',
      }
    ],
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
        return false
      },
  },
  {
    title: 'Measured Effect',
    dataIndex: 'measuredEffect',
    key: 'measuredEffect',
  },
  {
    title: 'Effect Found',
    dataIndex: 'effectFound',
    key: 'effectFound',
    filters: [
      {
        text: 'Yes',
        value: 'Yes',
      },
      {
        text: 'No',
        value: 'No',
      },
      {
        text: 'Both',
        value: 'Both',
      }
    ],

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
    render: (domain: Array<string>) => domain.join(', '),
  },
  {
    title: 'Modality',
    dataIndex: 'modality',
    key: 'modality',
    render: (modality: Array<string>) => modality.join(', '),

  },
  {
    title: 'Explainability Type',
    dataIndex: 'explainabilityType',
    key: 'explainabilityType',
    render: (explainabilityType: Array<string>) => explainabilityType.join(', '),

  },
  {
    title: 'Recommender Type',
    dataIndex: 'recommenderType',
    key: 'recommenderType',
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
    fetch('/src/db/characteristics_effects.json')
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