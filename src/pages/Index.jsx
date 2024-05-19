import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Index() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1000);
        };

        handleResize(); // Call the function once to set the initial state
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className="min-w-screen h-screen font-poppins overflow-x-hidden bg-cover bg-center bg-no-repeat"
            style={{ 
                backgroundImage: "url('/bg_img.jpg')",
                // Apply backgroundPositionY only on medium screens
                ...(isMobile ? {} : { backgroundPositionY: "-200px" })
            }}
        >
            <div className='flex flex-row grid md:grid-cols-2 grid-cols-1'>
                <div className='text-white pl-[5vw] leading-snug fadeIn'>
                    <h1 className='md:text-[35px] text-[40px] pt-[2vw] font-abhaya'>VirtuDrip</h1>
                    <h1 className='md:text-[70px] text-[60px] w-[300px] md:w-[35vw] min-w-[400px] mt-[100px] font-abhaya md:mt-[8vw]'>Get fitted up from your camera.</h1>
                    <p className='md:text-[2vw] md:w-[800px] text-[20px] font-poppins mt-[2vw] w-[300px]'>Try on clothes virtually to find the right size, fit, and colour.</p>
                    <Link to="/items/123">     
                        <button 
                            className='mt-[10vw] md:mt-[3vw] rounded-xl w-[200px] h-[75px] text-[18px] font-poppins bg-[#6E5B4A] font-bold shadow hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                            aria-label='Button'>
                            Get Started
                        </button>
                    </Link>
                </div>
                <div className='md:ml-[16vw] h-screen text-[30px] ml-[10vw] gap-[8vw] justify-center object-center text-white flex flex-col'>
                    <div className='text-center w-[300px] ml-[40px]'>
                        <h1 className='text-[96px] font-bold' style={{ textShadow: '2px 2px 2px rgba(0,0,0,0.5)' }}>40%</h1>
                        <p className='text-[28px]' style={{ textShadow: '2px 2px 2px rgba(0,0,0,0.5)' }}>of online clothing purchases are returned.</p>
                    </div>
                    <div className='object-center w-[300px]'>
                        <h1 className='ml-[10px] text-[80px] w-[500px] font-bold' style={{ textShadow: '2px 2px 2px rgba(0,0,0,0.5)' }}>9.5 Billion</h1>
                        <div className='w-[400px] text-center'>
                            <p className='text-[28px]' style={{ textShadow: '2px 2px 2px rgba(0,0,0,0.5)' }}>pounds of returned clothing are sent to landfill yearly.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
