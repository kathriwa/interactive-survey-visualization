import { Tabs, TabsProps } from 'antd';
import LineChart from './charts/LineChart';
import StackedBarChart from './charts/StackedBarChart';


const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Line Chart',
    children: <LineChart />,
  },
  {
    key: '2',
    label: 'Bar Chart',
    children: <StackedBarChart />,
  },
];


const MyPlot = () => {


  return (
    <>
        <h1>Charts</h1>
        <div style={{ height: "auto", width: "100%", maxWidth: "100%", minWidth: "100%", marginTop: "20px" }}>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    </>
  );
};

export default MyPlot;