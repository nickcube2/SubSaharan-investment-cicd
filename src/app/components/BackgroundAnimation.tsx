// import ConnectivityGlobe from "./3d-components/Connectivityglobe";

import AnimatedMap from "./AnimatedMap";




const BackgroundAnimation = () => {
    return (
        <div className="w-full h-full flex flex-row items-center justify-center">
             {/* Background Map */}
             <div className="w-1/2 h-[600px] mr-4">
              
           </div>
           <div className="w-1/2">
            {/* <ConnectivityGlobe /> */}
            <AnimatedMap />
           </div>
        </div>
    );
};

export default BackgroundAnimation; 