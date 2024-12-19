import Nav from '../Component/Nav.jsx';
import NavBar from '../Component/NavBar.jsx';
import LineCharts from "./LineChartAnalysis.jsx";
import CategoryDistributionChart from "./PieChartAnalysis.jsx";
import ComplaintsChart from "./BarChartAnalysis.jsx"
import ReportAnalysis from "./PieChartAnalysisCells.jsx";
import HxChart from "./BarChartHx.jsx";
import Chatbot from '../Component/Chatbot.jsx';
import Footer from '../Component/Footer.jsx';


const Analysis = () => {
	return (
		<div className='wrapper'>
		<NavBar/>
		<Chatbot />
		<div className='main-content'>
		  <Nav/> 
		  <div className='container-big'>
			<div className='container-home font-bold'>
			  <h2 >Analysis</h2>
			  
		<div className='flex-1 overflow-auto relative z-10'>

			{/* <Header title='Overview' /> */}

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* CHARTS */}

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<LineCharts />
					<CategoryDistributionChart />
					<ComplaintsChart />
					<ReportAnalysis />
					<HxChart />
				</div>
			</main>
		</div>
		</div>
		</div>
		</div>
		<Footer />
		</div>
	);
};
export default Analysis;
