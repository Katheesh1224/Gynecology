// import React, { useState, useEffect } from 'react';
import './home.css';
import Nav from './component/Nav.jsx';
import NavBar from './component/NavBar.jsx';
import StatCard from './component/StatCard.jsx';
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

const Home = () =>{
    console.log("home rendered");

    // const [patientCounts, setPatientCounts] = useState({ admittedCount: 0, dischargedCount: 0 });
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //   const fetchPatientCounts = async () => {
    //     try {
    //       const response = await fetch('/api/patient-counts');
    //       if (!response.ok) {
    //         throw new Error('Failed to fetch patient counts');
    //       }
    //       const data = await response.json();
    //       console.log('Fetched Data:', data); // Log the data to check if it's correct
    //       setPatientCounts(data);
    //     } catch (err) {
    //       setError(err.message);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
    
    //   fetchPatientCounts();
    // }, []);
    
  
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
					<StatCard name='Total patients' icon={Zap} value='1,801' color='#6366F1' />
					<StatCard name='Active' icon={Users} value='1,234' color='#8B5CF6' />
					<StatCard name='Discharged' icon={ShoppingBag} value='567' color='#EC4899' />
					<StatCard name='Admission rate' icon={BarChart2} value='12.5%' color='#10B981' />
				</motion.div>

        {/* CHARTS */}

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* <SalesOverviewChart /> */}
					{/* <CategoryDistributionChart /> */}
					{/* <SalesChannelChart /> */}
				</div>
        </main>
		

            {/* <div className='without-h2'>
              <div className='container-home-middle'>
                <div className='container-small-card'>
                  <div className='small-card'>
                    <p className='title'>Admitted Patient Count</p>
                  </div>
                  <div className='small-card'>
                    <p className='title'>Current Patient Count</p>
                  </div>
                  <div className='small-card'>
                    <p className='title'>Discharged Patient Count</p>
                  </div>
                </div>

                <div className='graph'>
                <img src="./graph.png" alt="" className="" />

                </div>
              </div>
              <div className='container-home-right'>
                <div className='divided'></div>
                <div className='divided'></div>
              </div>
            </div> */}
            
            
          </div>
        </div>
      </div>
    </div>
  );

}
export default Home;

