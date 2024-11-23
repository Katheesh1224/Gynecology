// import React, { useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { motion } from 'framer-motion';

// const patientData = {
//   year: [
//     { name: "2020", patientCount: 4500 },
//     { name: "2021", patientCount: 5200 },
//     { name: "2022", patientCount: 6100 },
//     { name: "2023", patientCount: 6800 },
//     { name: "2024", patientCount: 7300 },
//   ],
//   month: {
//     2023: [
//       { name: "Jan", patientCount: 420 },
//       { name: "Feb", patientCount: 380 },
//       { name: "Mar", patientCount: 510 },
//       { name: "Apr", patientCount: 460 },
//       { name: "May", patientCount: 540 },
//       { name: "Jun", patientCount: 720 },
//       { name: "Jul", patientCount: 610 },
//       { name: "Aug", patientCount: 590 },
//       { name: "Sep", patientCount: 680 },
//       { name: "Oct", patientCount: 630 },
//       { name: "Nov", patientCount: 710 },
//       { name: "Dec", patientCount: 750 },
//     ]
//   },
//   day: {
//     "2023-08": [
//       { name: "1", patientCount: 30 },
//       { name: "2", patientCount: 25 },
//       { name: "3", patientCount: 32 },
//       { name: "4", patientCount: 29 },
//       { name: "5", patientCount: 28 },
//       // Add up to 30 days
//     ]
//   }
// };

// const LineCharts = () => {
//   const [selectedView, setSelectedView] = useState("year"); // 'year', 'month', 'day'
//   const [selectedYear, setSelectedYear] = useState(2023); // Default selected year
//   const [selectedMonth, setSelectedMonth] = useState("08"); // Default selected month (August)

//   const handleViewChange = (e) => setSelectedView(e.target.value);
//   const handleYearChange = (e) => setSelectedYear(e.target.value);
//   const handleMonthChange = (e) => setSelectedMonth(e.target.value);

//   let chartData;
//   if (selectedView === "year") {
//     chartData = patientData.year;
//   } else if (selectedView === "month") {
//     chartData = patientData.month[selectedYear];
//   } else if (selectedView === "day") {
//     chartData = patientData.day[`${selectedYear}-${selectedMonth}`];
//   }

//   return (
//     <motion.div
//       className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.2 }}
//     >
//       <h2 className='text-2xl font-medium mb-4 text-gray-800'>Patient Count Overview</h2>

//       {/* Selection controls */}
//       <div className="flex justify-between items-center mb-4">
//         <select onChange={handleViewChange} value={selectedView} className="p-2 bg-gray-700 text-gray-100 rounded">
//           <option value="year">Year-wise</option>
//           <option value="month">Month-wise</option>
//           <option value="day">Day-wise</option>
//         </select>

//         {selectedView !== "year" && (
//           <select onChange={handleYearChange} value={selectedYear} className="p-2 bg-gray-700 text-gray-100 rounded">
//             <option value="2020">2020</option>
//             <option value="2021">2021</option>
//             <option value="2022">2022</option>
//             <option value="2023">2023</option>
//             <option value="2024">2024</option>
//           </select>
//         )}

//         {selectedView === "day" && (
//           <select onChange={handleMonthChange} value={selectedMonth} className="p-2 bg-gray-700 text-gray-100 rounded">
//             <option value="01">January</option>
//             <option value="02">February</option>
//             <option value="03">March</option>
//             <option value="04">April</option>
//             <option value="05">May</option>
//             <option value="06">June</option>
//             <option value="07">July</option>
//             <option value="08">August</option>
//             <option value="09">September</option>
//             <option value="10">October</option>
//             <option value="11">November</option>
//             <option value="12">December</option>
//           </select>
//         )}
//       </div>

//       <div className='h-80'>
//         <ResponsiveContainer width={"100%"} height={"100%"}>
//           <LineChart data={chartData}>
//             <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
//             <XAxis dataKey={"name"} stroke='#9ca3af' />
//             <YAxis stroke='#9ca3af' />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "rgba(31, 41, 55, 0.8)",
//                 borderColor: "#4B5563",
//               }}
//               itemStyle={{ color: "#E5E7EB" }}
//             />
//             <Line
//               type='monotone'
//               dataKey='patientCount'
//               stroke='#6366F1'
//               strokeWidth={3}
//               dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
//               activeDot={{ r: 8, strokeWidth: 2 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </motion.div>
//   );
// };

// export default LineCharts;



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

        const response = await axios.get('http://localhost:8081/admission-stats', { params });
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, [selectedView, selectedYear, selectedMonth]);

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

      <div className='h-80'>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
            <XAxis dataKey={"name"} stroke='#334155' />
            <YAxis stroke='#334155' />
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
