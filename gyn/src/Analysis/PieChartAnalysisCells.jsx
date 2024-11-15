import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const categoryDataRBC = [
	{ name: "Low RBC", value: 1200 },
	{ name: "Normal RBC", value: 4500 },
	{ name: "High RBC", value: 800 },
];

const categoryDataWBC = [
	{ name: "Low WBC", value: 900 },
	{ name: "Normal WBC", value: 3200 },
	{ name: "High WBC", value: 600 },
];

const categoryDataPlatelets = [
	{ name: "Low Platelets", value: 1100 },
	{ name: "Normal Platelets", value: 2800 },
	{ name: "High Platelets", value: 400 },
];
const COLORS = ["#6366F1", "#8B5CF6", "#0284c7", "#c026d3", "#1e40af"];

const CategoryDistributionChartCells = () => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-30 backdrop-blur-md shadow-lg  lg:col-span-2 rounded-xl p-20 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-2xl font-medium mb-4 text-gray-800'>Cells Count Analysis</h2>
			{/* Flex container for three pie charts */}
			<div className="flex justify-between space-x-4 h-80">
				{/* Pie Chart for RBC */}
				<div className='w-1/3'>
					<h3 className='text-center text-gray-200 mb-2'>Red Blood Cells (RBC)</h3>
					<ResponsiveContainer width={"100%"} height={"100%"}>
						<PieChart>
							<Pie
								data={categoryDataRBC}
								cx={"50%"}
								cy={"50%"}
								labelLine={false}
								outerRadius={90}
								fill='#8884d8'
								dataKey='value'
								label={({ percent }) => ` ${(percent * 100).toFixed(0)}%`}
							>
								{categoryDataRBC.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip
								contentStyle={{
									backgroundColor: "rgba(31, 41, 55, 0.8)",
									borderColor: "#4B5563",
								}}
								itemStyle={{ color: "#E5E7EB" }}
							/>
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>

				{/* Pie Chart for WBC */}
				<div className='w-1/4'>
					<h3 className='text-center text-gray-200 mb-2'>White Blood Cells (WBC)</h3>
					<ResponsiveContainer width={"100%"} height={"100%"}>
						<PieChart>
							<Pie
								data={categoryDataWBC}
								cx={"50%"}
								cy={"50%"}
								labelLine={false}
								outerRadius={90}
								fill='#8884d8'
								dataKey='value'
								label={({  percent }) => `${(percent * 100).toFixed(0)}%`}
							>
								{categoryDataWBC.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip
								contentStyle={{
									backgroundColor: "rgba(31, 41, 55, 0.8)",
									borderColor: "#4B5563",
								}}
								itemStyle={{ color: "#E5E7EB" }}
							/>
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>

				{/* Pie Chart for Platelets */}
				<div className='w-1/3'>
					<h3 className='text-center text-gray-200 mb-2'>Platelets (PLT) </h3>
					<ResponsiveContainer width={"100%"} height={"100%"}>
						<PieChart>
							<Pie
								data={categoryDataPlatelets}
								cx={"50%"}
								cy={"50%"}
								labelLine={false}
								outerRadius={90}
								fill='#8884d8'
								dataKey='value'
								label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
							>
								{categoryDataPlatelets.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip
								contentStyle={{
									backgroundColor: "rgba(31, 41, 55, 0.8)",
									borderColor: "#4B5563",
								}}
								itemStyle={{ color: "#E5E7EB" }}
							/>
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
		</motion.div>
	);
};

export default CategoryDistributionChartCells;