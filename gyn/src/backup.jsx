import './home.css';
import Nav from './Component/Nav.jsx';
import NavBar from './Component/NavBar.jsx';
import Chatbot from './Component/Chatbot.jsx';
import Footer from './Component/Footer.jsx';

const Home = () => {


  return (
    <div className='wrapper2'>
      <NavBar />
      <Chatbot />
      <div className='main-content'>
        <Nav />
        <div className='container-big'>
            <div className='container'>
            <div className="banner-img">
            </div>
            <h1 style={{ textAlign: 'center' ,fontWeight:"bold"}}>"மெய்ப்பொருள் காண்பது அறிவு"</h1>
            <br />
            <h2 style={{fontWeight:"bold"}}>Welcome to the GYNECOLOGY Department</h2>
            
            <p className='description'>
              The gynecology department is dedicated to providing comprehensive healthcare
              services for women, focusing on the diagnosis, treatment, and management of
              reproductive health issues. This includes routine check-ups, prenatal and
              postnatal care, fertility counseling, and advanced treatments for gynecological
              disorders such as endometriosis, PCOS, and fibroids. The department is equipped
              with modern medical technologies and staffed by highly skilled gynecologists,
              nurses, and support personnel, ensuring compassionate and personalized care for
              women across all stages of life. Additionally, it emphasizes patient education,
              empowering women to make informed decisions about their health.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
