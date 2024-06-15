import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography } from './Typography';
import { Separator } from './ui/separator';

interface TithesAndOfferingsChartProps {
  tithesData: { label: string; value: number; date?: string }[];
  offeringsData: { label: string; value: number; date?: string }[];
}

const TithesAndOfferingsChart: React.FC<TithesAndOfferingsChartProps> = ({ tithesData, offeringsData }) => {
  // Calculate total values for tithes and offerings
  const totalTithes = tithesData.reduce((acc, curr) => acc + curr.value, 0);
  const totalOfferings = offeringsData.reduce((acc, curr) => acc + curr.value, 0);

  // Combine the data for the bar chart
  const combinedData = tithesData.map((item, index) => ({
    date: item.date,
    tithes: item.value,
    offerings: offeringsData[index] ? offeringsData[index].value : 0,
  }));

  // Function to format date as "Month - Year"
  const formatDate = (date: string) => {
    const options = { month: 'long', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US');
    return formattedDate;
  };

  return (
    <div className='flex'>
      <div className='flex shadow bg-white py-4 px-4  rounded-2xl'>
        <div className='flex flex-row'>
          <div className='flex-grow'>
            <ResponsiveContainer width={600} height={300}>
              <BarChart data={combinedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey='date' tickFormatter={formatDate} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='tithes' fill='#8884d8' name='Tithes' />
                <Bar dataKey='offerings' fill='#82ca9d' name='Offerings' />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className='flex flex-col gap-4 px-10 items-center justify-center'>
            <div className='flex flex-col'>
              <Typography variant='paragraph' className='font-bold'>
                Tithes
              </Typography>
              <Typography variant='paragraph_md'>{totalTithes} ₱</Typography>
            </div>
            <Separator />
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
