import { Divider } from 'antd';
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import { Typography } from './Typography';

// TithesAndOfferingsChart component
interface TithesAndOfferingsChartProps {
  tithesData: { label: string, value: number, date?: string }[]; // Make date property optional
  offeringsData: { label: string, value: number, date?: string }[]; // Make date property optional
}

const TithesAndOfferingsChart: React.FC<TithesAndOfferingsChartProps> = ({ tithesData, offeringsData }) => {
  // Calculate total values for tithes and offerings
  const totalTithes = tithesData.reduce((acc, curr) => acc + curr.value, 0);
  const totalOfferings = offeringsData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className='flex '>
      <div className='flex border bg-[#F4F0FE]  py-4 px-10 rounded-2xl  '>
        <div className='flex flex-row'>
          <div className='  flex-grow'>
            <LineChart
              width={600}
              height={300}
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" data={tithesData} dataKey="value" stroke="#8884d8" strokeWidth={3} name="Tithes" />
              <Line type="monotone" data={offeringsData} dataKey="value" stroke="#82ca9d" strokeWidth={3} name="Offerings" />
            </LineChart>
          </div>
          <div className="flex flex-col gap-4 px-10 items-center justify-center">
            <div className='flex flex-col'>
              <Typography variant='paragraph' className='font-bold' >Tithes</Typography>
              <Typography variant='paragraph_md'>{totalTithes} ₱</Typography>
            </div>
            <Divider />
            <div className='flex flex-col'>
              <Typography variant='paragraph' className='font-bold' >Offering</Typography>
              <Typography variant='paragraph_md' className=''>{totalOfferings} ₱</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TithesAndOfferingsChart;
