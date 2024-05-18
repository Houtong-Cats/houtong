import { Link } from 'react-router-dom'
import woman from '/woman_full_body.png'
import man from '/man_full_body.png'
export default function Index() {

    return (
        <div className='min-w-screen h-screen bg-[#70675F] font-cherry overflow-x-hidden'>
            <div className='flex flex-row grid-cols-1 md:grid-cols-2'>
                <div className='text-white pl-[5vw] leading-snug fadeIn'>
                    <h1 className='md:text-[35px] text-[12px] pt-[2vw]'>VirtuDrip</h1>
                    <h1 className='md:text-[70px] text-[28px] w-[45vw] mt-[4vw]'>Get fitted up from your camera.</h1>
                    <p className='text-[2vw] font-poppins mt-[2vw]'>Get fitted up through your camera</p>
                    <Link to="/Home">     
                        <button 
                            className='mt-[2vw] w-[13vw] h-[4vw] text-[1.5vw] font-poppins bg-[#AE967F] font-bold rounded-md shadow hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                            aria-label='Button'>
                            Get Started
                        </button>
                    </Link>
                    <div className='flex flex-row mt-[6vw] font-poppins'>
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
                <div className='h-screen ml-[10vw] flex items-center justify-center hidden md:flex'>
  <img className="w-[20rem] mr-4" src={man} alt="Man full body" />
  <img className="w-[24rem]" src={woman} alt="Woman full body" />
</div>
            </div>
            
        </div>
    );
}