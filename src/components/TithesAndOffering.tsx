import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Typography } from './Typography';

interface TithesAndOfferingsChartProps {
  tithesData: { label: string; value: number; date?: string }[];
  offeringsData: { label: string; value: number; date?: string }[];
}

const TithesAndOfferingsChart: React.FC<TithesAndOfferingsChartProps> = ({ tithesData, offeringsData }) => {
  // Calculate total values for tithes and offerings
  const totalTithes = tithesData.reduce((acc, curr) => acc + curr.value, 0);
  const totalOfferings = offeringsData.reduce((acc, curr) => acc + curr.value, 0);

  // Function to format date as "Month - Year"
  const formatDate = (date: string) => {
    const options = { month: 'long', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US');
    return formattedDate;
  };

  return (
    <div className='flex'>
      <div className='flex border bg-[#F4F0FE] py-4 px-10 rounded-2xl'>
        <div className='flex flex-row'>
          <div className='flex-grow'>
            <LineChart width={600} height={300} >
              <XAxis dataKey='date' tickFormatter={formatDate} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' data={tithesData} dataKey='value' stroke='#8884d8' strokeWidth={1} name='Tithes' />
              <Line type='monotone' data={offeringsData} dataKey='value' stroke='#82ca9d' strokeWidth={1} name='Offerings' />
            </LineChart>
          </div>
          <div className='flex flex-col gap-4 px-10 items-center justify-center'>
            <div className='flex flex-col'>
              <Typography variant='paragraph' className='font-bold'>
                Tithes
              </Typography>
              <Typography variant='paragraph_md'>{totalTithes} ₱</Typography>
            </div>
            <hr className='border-gray-300' />
            <div className='flex flex-col'>
              <Typography variant='paragraph' className='font-bold'>
                Offering
              </Typography>
              <Typography variant='paragraph_md'>{totalOfferings} ₱</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TithesAndOfferingsChart;
