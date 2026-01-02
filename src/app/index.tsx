import Herosection from "./components/Sections/Herosection";
import AboutSection from "./components/Sections/About";
import Expertise from "./components/Sections/Expertise";
import ContactUs from "./components/Sections/Contact-us";
import Connect from "./components/Sections/Connect";
import ScrollToTop from "./components/ScrollToTop"; // Adjusted path for components

function Homepage() {
    return (
        <>
        <div className="relative">
            {/* Hero section with sticky positioning */}
            <Herosection />
            
            {/* Main content */}
            <div className="relative z-10 border-t-2 border-gray-800 pri-bg-color">
                <AboutSection />
                <Expertise/>               
                <Connect/>
                <ContactUs/>
            </div>
            
        </div>
        <ScrollToTop/>
        </>
       
    )
} 

export default Homepage;