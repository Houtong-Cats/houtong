import Navbar from "../assets/navbar";
export default function Color () {
    return (
        <div className="bg-[#322C27] min-h-screen w-screen">
            <div className="flex flex-row">
                
                <div className="flex-col pl-[3vw]">
                    <Navbar></Navbar>
                    <div className="pl-[3vw]">
                    <div className="text-white">
                        <h1 className="mt-[5vw] leading-tight font-abhaya text-[90px] w-[600px]">Get a free colour analysis</h1>
                    </div>
                    <p className="text-[22px] font-poppins text-white w-[600px]">Take a selfie in bright natural lighting to find out what colour palette best suits you. </p>
                    <button className="text-white bg-[#766A5F] mt-[6vw] w-[200px] rounded-[40px] p-3 hover:opacity-60">
                        <div className="flex items-center">
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 6H10.5L13.5 3H22.5L25.5 6H30C30.7956 6 31.5587 6.31607 32.1213 6.87868C32.6839 7.44129 33 8.20435 33 9V27C33 27.7956 32.6839 28.5587 32.1213 29.1213C31.5587 29.6839 30.7956 30 30 30H6C5.20435 30 4.44129 29.6839 3.87868 29.1213C3.31607 28.5587 3 27.7956 3 27V9C3 8.20435 3.31607 7.44129 3.87868 6.87868C4.44129 6.31607 5.20435 6 6 6ZM18 10.5C16.0109 10.5 14.1032 11.2902 12.6967 12.6967C11.2902 14.1032 10.5 16.0109 10.5 18C10.5 19.9891 11.2902 21.8968 12.6967 23.3033C14.1032 24.7098 16.0109 25.5 18 25.5C19.9891 25.5 21.8968 24.7098 23.3033 23.3033C24.7098 21.8968 25.5 19.9891 25.5 18C25.5 16.0109 24.7098 14.1032 23.3033 12.6967C21.8968 11.2902 19.9891 10.5 18 10.5ZM18 13.5C19.1935 13.5 20.3381 13.9741 21.182 14.818C22.0259 15.6619 22.5 16.8065 22.5 18C22.5 19.1935 22.0259 20.3381 21.182 21.182C20.3381 22.0259 19.1935 22.5 18 22.5C16.8065 22.5 15.6619 22.0259 14.818 21.182C13.9741 20.3381 13.5 19.1935 13.5 18C13.5 16.8065 13.9741 15.6619 14.818 14.818C15.6619 13.9741 16.8065 13.5 18 13.5Z" fill="white"/>
                            </svg>
                            <h1 className="ml-[1vw] pt-[-1px]">Take a Picture</h1>
                        </div>
                    </button>
                    <div className="flex flex-row mt-[8vw]">
                        <h1 className="text-[#766A5F] text-[25px] mt-[-0.3vw] mr-[1vw] font-poppins">Skip</h1>
                        <svg width="30" height="30" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.9034 5.50347C20.3535 5.05354 20.9638 4.80078 21.6002 4.80078C22.2366 4.80078 22.8469 5.05354 23.297 5.50347L34.097 16.3035C34.5469 16.7535 34.7997 17.3639 34.7997 18.0003C34.7997 18.6367 34.5469 19.247 34.097 19.6971L23.297 30.4971C22.8444 30.9342 22.2381 31.1762 21.6088 31.1707C20.9796 31.1652 20.3776 30.9128 19.9326 30.4678C19.4877 30.0229 19.2352 29.4209 19.2298 28.7916C19.2243 28.1624 19.4662 27.5561 19.9034 27.1035L26.4002 20.4003H3.6002C2.96368 20.4003 2.35323 20.1474 1.90314 19.6973C1.45305 19.2472 1.2002 18.6368 1.2002 18.0003C1.2002 17.3637 1.45305 16.7533 1.90314 16.3032C2.35323 15.8531 2.96368 15.6003 3.6002 15.6003H26.4002L19.9034 8.89707C19.4535 8.447 19.2007 7.83666 19.2007 7.20027C19.2007 6.56387 19.4535 5.95353 19.9034 5.50347Z" fill="#766A5F"/>
                        </svg>
                    </div>
                    </div>      
                </div>
                <div>
                    <h2 className="mt-[8vw] text-white leading-tight font-poppins text-[32px] w-[600px]">Winter (cool + dark)</h2>
                    <div className="grid grid-flow-col gap-2">
                        <div className="rounded-full w-[35px] h-[35px] bg-[#482679]"></div>
                        <div className="rounded-full w-[35px] h-[35px] bg-[#813386]"></div>
                        <div className="rounded-full w-[35px] h-[35px] bg-[#FF0DC3]"></div>
                        <div className="rounded-full w-[35px] h-[35px] bg-[#E61175]"></div>
                        <div className="rounded-full w-[35px] h-[35px] bg-[#A61266]"></div>
                        <div className="rounded-full w-[35px] h-[35px] bg-[#FE0002]"></div>
                        <div className="rounded-full w-[35px] h-[35px] bg-[#FAEC16]"></div>
                        <div className="rounded-full w-[35px] h-[35px] bg-[#FBF8C3]"></div>
                        <div className="rounded-full w-[35px] h-[35px] bg-[#15BE5B]"></div>
                        <div className="rounded-full w-[35px] h-[35px] bg-[#105040]"></div>
                        <div className="rounded-full w-[35px] h-[35px] bg-[#01037E]"></div>
                        <div className="rounded-full w-[35px] h-[35px] bg-[#3332BA]"></div>
                        <div className="rounded-full w-[35px] h-[35px] bg-[#63D4FF]"></div>
                        <div className="rounded-full w-[35px] h-[35px] bg-[#D6D5D3]"></div>
                        <div className="rounded-full w-[35px] h-[35px] bg-[#36444F]"></div>
                        <div className="rounded-full w-[35px] h-[35px] bg-[#010101]"></div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}