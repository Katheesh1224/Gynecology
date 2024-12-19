import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import axios from 'axios';

const LineCharts = () => {
  const [selectedView, setSelectedView] = useState("year"); // 'year', 'month', 'day'
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default selected year
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default selected month (1-12)
  const [chartData, setChartData] = useState([]);

  // Fetch data based on the selected view
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const params = {
          view: selectedView,
          year: selectedView !== 'year' ? selectedYear : undefined,
          month: selectedView === 'day' ? selectedMonth : undefined,
        };

        const response = await axios.get('http://localhost:5000/analysis/admission-stats', { params });

        // Log to verify the structure of the data
        console.log('Fetched Chart Data:', response.data);

        // Ensure the data is in the correct format
        const formattedData = response.data.map(item => ({
          name: item.name, // This could be the year, month, or day
          patientCount: item.patientCount, // Make sure this is a number
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, [selectedView, selectedYear, selectedMonth]);

  // Calculate the dynamic Y-axis range
  const getYAxisDomain = () => {
    const patientCounts = chartData.map(item => item.patientCount);
    const maxValue = Math.max(...patientCounts);
    const minValue = Math.min(...patientCounts);

    // Adjust the domain to have a margin around the min and max values
    const max = Math.ceil(maxValue * 1.2);  // Add 20% margin on top
    const min = Math.floor(minValue * 0.8); // Add 20% margin on bottom

    return [min, max];
  };

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className='text-2xl font-medium mb-4 text-gray-800 font-bold'>Patient Admission Trends</h2>

      {/* Selection controls */}
      <div className="flex justify-between items-center mb-4">
        <select onChange={(e) => setSelectedView(e.target.value)} value={selectedView} className="p-2 bg-gray-700 text-gray-100 rounded">
          <option value="year">Year-wise</option>
          <option value="month">Month-wise</option>
          <option value="day">Day-wise</option>
        </select>

        {selectedView !== "year" && (
          <select onChange={(e) => setSelectedYear(e.target.value)} value={selectedYear} className="p-2 bg-gray-700 text-gray-100 rounded">
            {[2020, 2021, 2022, 2023, 2024].map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        )}

        {selectedView === "day" && (
          <select onChange={(e) => setSelectedMonth(e.target.value)} value={selectedMonth} className="p-2 bg-gray-700 text-gray-100 rounded">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className='h-60'>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
            <XAxis dataKey={"name"} stroke='#334155' />
            <YAxis 
              stroke='#334155' 
              domain={getYAxisDomain()}  // Use dynamic Y-axis domain
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.8)",
                borderColor: "#4B5563",
              }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Line
              type='monotone'
              dataKey='patientCount'
              stroke='#6366F1'
              strokeWidth={3}
              dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default LineCharts;
