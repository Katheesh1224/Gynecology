import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#6366F1", "#8B5CF6", "#0284c7", "#c026d3", "#1e40af"];

const ReportAnalysis = () => {
  const [reportType, setReportType] = useState("blood");
  const [reportData, setReportData] = useState({
    blood: {
      hemoglobin: [],
      platelets: [],
      whiteCells: [],
    },
    urine: {
      whiteCells_ur: [],
      redCells: [],
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:5000/analysis/report-analysis?type=${reportType}`)
      .then((response) => {
        const data = response.data || {};

        setReportData({
          blood: data.blood || {
            hemoglobin: [],
            platelets: [],
            whiteCells: [],
          },
          urine: data.urine || {
            whiteCells_ur: [],
            redCells: [],
          },
        });

        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data.");
        setLoading(false);
      });
  }, [reportType]);

  const renderPieChart = (data, title) => {
    if (!data || data.length === 0) {
      return (
        <div className="text-center text-gray-400">
          {title} data not available.
        </div>
      );
    }

    return (
		
      <div className="w-1/3">
        <h3 className="text-center text-[#0c4a6e] mb-2 font-bold">{title}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
     </div>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
	<motion.div
			className='bg-gray-800 bg-opacity-30 backdrop-blur-md shadow-lg  lg:col-span-2 rounded-xl p-20 border border-gray-700 font-bold'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
		<h2 className='text-2xl font-medium mb-4 text-gray-800 font-bold'>Cells Count Analysis</h2>
		

    <div className="p-10">
      <div className="mb-4">
        <label className="mr-2">Select Report Type:</label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="blood">Blood Report Analysis</option>
          <option value="urine">Urine Report Analysis</option>
        </select>
      </div>
      <div className="flex space-x-4 text-[#0c4a6e]  ">
        {reportType === "blood" && (
          <>
            {renderPieChart(reportData.blood.hemoglobin, "Hemoglobin")}
            {renderPieChart(reportData.blood.platelets, "Platelets")}
            {renderPieChart(reportData.blood.whiteCells, "White Blood Cells")}
          </>
        )}
        {reportType === "urine" && (
          <>
            {renderPieChart(reportData.urine.whiteCells_ur, "Urine White Cells")}
            {renderPieChart(reportData.urine.redCells, "Urine Red Cells")}
          </>
        )}
      </div>
    </div>
	
	</motion.div>
  );
};

export default ReportAnalysis;
