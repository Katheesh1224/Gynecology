// import { motion } from "framer-motion";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

// const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

// const GYNECOLOGY_COMPLAINTS_DATA = [
//   { name: "Menstrual", value: 120 },
//   { name: "Vaginal", value: 95 },
//   { name: "LowerAbdpain", value: 150 },
//   { name: "PelvicPain", value: 85 },
//   { name: "InfertilityI  ssues", value: 65 },
// ];

// const ComplaintsChart = () => {
//   return (
//     <motion.div
//       className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700'
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.4 }}
//     >
//       <h2 className='text-2xl font-medium mb-4 text-gray-800'>Patient Complaints in Gynecology</h2>

//       <div className='h-80'>
//         <ResponsiveContainer>
//           <BarChart data={GYNECOLOGY_COMPLAINTS_DATA}>
//             <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
//             <XAxis dataKey='name' stroke='#9CA3AF' />
//             <YAxis stroke='#9CA3AF' />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "rgba(31, 41, 55, 0.8)",
//                 borderColor: "#4B5563",
//               }}
//               itemStyle={{ color: "#E5E7EB" }}
//             />
//             <Legend />
//             <Bar dataKey={"value"} fill='#8884d8'>
//               {GYNECOLOGY_COMPLAINTS_DATA.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </motion.div>
//   );
// };

// export default ComplaintsChart;


// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
// import axios from "axios";

// const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#22D3EE", "#F43F5E", "#3B82F6"];

// const ComplaintsChart = () => {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     const fetchComplaintsData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8081/complaints-stats');
//         setChartData(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching complaints data:", error);
//       }
//     };

//     fetchComplaintsData();
//   }, []);

//   return (
//     <motion.div
//       className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700'
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.4 }}
//     >
//       <h2 className='text-2xl font-medium mb-4 text-gray-800'>Patient Complaints in Gynecology</h2>

//       <div className='h-80'>
//         <ResponsiveContainer>
//           <BarChart data={chartData}>
//             <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
//             <XAxis dataKey='name' stroke='#000000' />
//             <YAxis stroke='#9CA3AF' />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "rgba(31, 41, 55, 0.8)",
//                 borderColor: "#4B5563",
//               }}
//               itemStyle={{ color: "#E5E7EB" }}
//             />
//             <Legend />
//             <Bar dataKey={"value"} fill='#8884d8'>
//               {chartData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </motion.div>
//   );
// };

// export default ComplaintsChart;


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import axios from "axios";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B", "#22D3EE", "#F43F5E", "#3B82F6"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: "rgba(31, 41, 55, 0.8)", padding: "10px", borderRadius: "5px", border: "1px solid #4B5563" }}>
        <p style={{ color: "#E5E7EB", margin: 0 }}>{`${payload[0].payload.name}: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const HxChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchComplaintsData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/history-stats');
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching complaints data:", error);
      }
    };

    fetchComplaintsData();
  }, []);

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-gray-700 font-bold'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className='text-2xl font-medium mb-4 text-gray-800 font-bold'>Patient Medical History in Gynecology</h2>

      <div className='h-80'>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
            <YAxis stroke='#334155' />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              payload={chartData.map((entry, index) => ({
                value: entry.name, 
                type: "square", 
                color: COLORS[index % COLORS.length],
              }))}
            />
            <Bar dataKey={"value"} fill='#8884d8'>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default HxChart;
