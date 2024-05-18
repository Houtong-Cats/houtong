import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import woman from '/woman_full_body.png';
import man from '/man_full_body.png';

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
        <div className='min-w-screen h-screen bg-[#70675F] font-cherry overflow-x-hidden'>
            <div className='flex flex-col md:flex-row'>
                <div className='text-white pl-[5vw] leading-snug fadeIn'>
                    <h1 className='md:text-[35px] text-[40px] pt-[2vw]'>VirtuDrip</h1>
                    <h1 className='md:text-[70px] text-[60px] w-[300px] md:w-[45vw] mt-[100px] md:mt-[4vw]'>Get fitted up from your camera.</h1>
                    <p className='md:text-[2vw] text-[20px] font-poppins mt-[2vw] w-[300px]'>Get fitted up through your camera</p>
                    <Link to="/items/123">     
                        <button 
                            className='mt-[10vw] md:mt-[3vw] rounded-xl w-[171px] h-[75px] text-[18px] font-poppins bg-[#AE967F] font-bold shadow hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                            aria-label='Button'>
                            Get Started
                        </button>
                    </Link>
                    <div className='hidden md:flex flex-row mt-[6vw] font-poppins'>
                        <div>
                            <h1 className='text-[3vw]  text-center font-bold'>60,000</h1>
                            <div className='w-[15vw] text-center'>
                                <p>tonnes of clothing goes to landfills every year.</p>
                            </div>
                        </div>
                        <div className='pl-[3vw]'>
                            <h1 className='text-[3vw] text-center font-bold'>60,000</h1>
                            <div className='w-[15vw]  text-center'>
                                <p>tonnes of clothing goes to landfills every year.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-screen ml-[10vw] flex md:flex-row flex-col items-center justify-center'>
                    {isMobile ? (
                        <>
                            <img className="mt-[-300px] ml-[75vw] w-[300px] mb-[-350px] mr-4" src={man} alt="Man full body" />
                            <img className="w-[300px] ml-[-200px]" src={woman} alt="Woman full body" />
                        </>
                    ) : (
                        <>
                            <img className="w-[20rem] mr-4" src={man} alt="Man full body" />
                            <img className="w-[24rem]" src={woman} alt="Woman full body" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}