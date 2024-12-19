// import React, { useState, useEffect } from 'react';
import './home.css';
import Nav from './Component/Nav.jsx';
import NavBar from './Component/NavBar.jsx';
import StatCards from './Component/StatCard.jsx';
import Chatbot from './Component/Chatbot.jsx';
import Footer from './Component/Footer.jsx';
import { BarChart2, UserMinus, Users, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import LineCharts from "./Analysis/LineChartAnalysis.jsx";
import CategoryDistributionChart from "./Analysis/PieChartAnalysis.jsx";
import axios from 'axios';
import { useEffect, useState } from 'react';

const Home = () =>{
    console.log("home rendered");
	const [stats, setStats] = useState({
		totalPatients: 0,
		activePatients: 0,
		dischargedPatients: 0,
		admissionRate: '0%',
	  });


	useEffect(() => {
		const fetchStats = async () => {
		  try {
			const response = await axios.get('http://localhost:5000/analysis/stats');
			const data = response.data;
			setStats({
			  totalPatients: data.total_patients,
			  activePatients: data.active_patients,
			  dischargedPatients: data.discharged_patients,
			  admissionRate: data.admission_rate,
			});
		  } catch (error) {
			console.error('Error fetching stats:', error);
		  }
		};
	
		fetchStats();
	  }, []);
  
  return(
    <div className='wrapper'>
      <NavBar/>
	  <Chatbot />
      <div className='main-content'>
        <Nav/> 
        <div className='container-big'>
          <div className='container-home'>

            <h2 style={{fontWeight:"bold"}} >Welcome to GYNECOLOGY Department</h2>
           
			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				 {/* STATS  */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCards name='Total patients' icon={Users} value={stats.totalPatients} color='#6366F1'  />
					<StatCards name='Active' icon={UserCheck} value={stats.activePatients} color='#8B5CF6' />
					<StatCards name='Discharged' icon={UserMinus} value={stats.dischargedPatients} color='#EC4899' />
					<StatCards name='Admission rate' icon={BarChart2} value={stats.admissionRate} color='#10B981' />
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
	<Footer />
	</div>
  );

}
export default Home;

