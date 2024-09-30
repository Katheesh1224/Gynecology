// import React, { useState, useEffect } from 'react';
import './home.css';
import Nav from './Component/Nav.jsx';
import NavBar from './Component/NavBar.jsx';
import StatCards from './Component/StatCard.jsx';
import { BarChart2, UserMinus, Users, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import LineCharts from "./Analysis/LineChartAnalysis.jsx";
import CategoryDistributionChart from "./Analysis/PieChartAnalysis.jsx";
// import ComplaintsChart from "./Analysis/BarChartAnalysis.jsx"

const Home = () =>{
    console.log("home rendered");
  
  return(
    <div className='wrapper'>
      <NavBar/>
      <div className='main-content'>
        <Nav/> 
        <div className='container-big'>
          <div className='container-home'>
            <h2>Welcome to GYNECOLOGY Department</h2>
           
			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				 {/* STATS  */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCards name='Total patients' icon={Users} value='1,801' color='#6366F1' />
					<StatCards name='Active' icon={UserCheck} value='1,234' color='#8B5CF6' />
					<StatCards name='Discharged' icon={UserMinus} value='567' color='#EC4899' />
					<StatCards name='Admission rate' icon={BarChart2} value='12.5%' color='#10B981' />
				</motion.div>

        {/* CHARTS */}

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<LineCharts />
					<CategoryDistributionChart />
					{/* <ComplaintsChart /> */}
				</div>
        </main>
		

            
          </div>
        </div>
      </div>
    </div>
  );

}
export default Home;

