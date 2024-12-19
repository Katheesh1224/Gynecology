import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#6366F1', '#8B5CF6', '#0284c7', '#c026d3'];

const CategoryDistributionChart = () => {
  const [scanData, setScanData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/analysis/scan-data')
      .then((response) => response.json())
      .then((data) => {
        // Parse the values as numbers
        const formattedData = [
          { name: 'CT Scan', value: Number(data.CT) || 0 },
          { name: 'MRI Scan', value: Number(data.MRI) || 0 },
          { name: 'Ultrasound (TAS)', value: Number(data.TAS) || 0 },
          { name: 'Ultrasound (TUS)', value: Number(data.TUS) || 0 },
        ];
        setScanData(formattedData);
        setLoading(false); // Stop loading when data is fetched
        console.log('Formatted Data:', formattedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Stop loading in case of error
      });
  }, []);

  // Render loading spinner if data is still being fetched
  if (loading) {
    return (
      <motion.div
        className='bg-gray-800 bg-opacity-30 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className='text-2xl font-medium mb-4 text-gray-800 font-bold'>Scan Suggestions Analysis</h2>
        <div className='h-80 flex justify-center items-center'>
          <p className='text-lg text-gray-500'>Loading...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-30 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 font-bold'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className='text-2xl font-medium mb-4 text-gray-800 font-bold'>Scan Suggestions Analysis</h2>
      <div className='h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={scanData}
              cx='50%'
              cy='50%'
              labelLine={false}
              outerRadius={80}
              fill='#8884d8'
              dataKey='value'
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {scanData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                borderColor: '#4B5563',
              }}
              itemStyle={{ color: '#E5E7EB' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default CategoryDistributionChart;
