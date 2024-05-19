import React from "react";
import { useParams } from "react-router-dom";
import Winter from "../components/Winter";
import Spring from "../components/Spring";
import Summer from "../components/Summer";
import Autumn from "../components/Autumn";
import Navbar from "../assets/navbar";
import { Link } from "react-router-dom";
const componentMap = {
  winter: Winter,
  spring: Spring,
  summer: Summer,
  autumn: Autumn,
};

export default function Colors() {
  const { season } = useParams();
  const SeasonComponent = componentMap[season.toLowerCase()]; // Get the corresponding component

  if (!SeasonComponent) {
    return <div className="text-lg">Invalid season: {season}</div>;
  }

  return (
    <div className="bg-[#322C27] min-w-screen min-h-screen text-white">
        <Navbar></Navbar>
        <div className="pl-[3vw]">
            <h1 className="text-7xl font-abhaya mt-[10vw]">You are a {season.toUpperCase()} colour palette.</h1>
            <div className="flex flex-col">
                <p className="w-[100%] text-[32px] ">Based on your seasonal colour analysis results, we suggest wearing... </p>
                <div className="w-full mt-[3vw]">
                    <div className="w-2/3">
                        <SeasonComponent />
                    </div>
                    <h2 className="mt-[3vw] text-[25px] italic font-medium">How does it work?</h2>
                    <p>Your skin tone, hair colour, and eye colour will fall into one of four main seasonal categories: winter, spring, summer, and autumn. Seasonal colour analysis can help you discover what colours look best on you. However, it’s just a guide — feel free to expand it and develop your own unique colour palette!</p>
                </div>
                <Link to="/items">
                    <div className="flex flex-row mt-[8vw]">
                        <h1 className="text-[#766A5F] text-[25px] mt-[-0.3vw] mr-[1vw] font-poppins">Continue</h1>
                        <svg width="30" height="30" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.9034 5.50347C20.3535 5.05354 20.9638 4.80078 21.6002 4.80078C22.2366 4.80078 22.8469 5.05354 23.297 5.50347L34.097 16.3035C34.5469 16.7535 34.7997 17.3639 34.7997 18.0003C34.7997 18.6367 34.5469 19.247 34.097 19.6971L23.297 30.4971C22.8444 30.9342 22.2381 31.1762 21.6088 31.1707C20.9796 31.1652 20.3776 30.9128 19.9326 30.4678C19.4877 30.0229 19.2352 29.4209 19.2298 28.7916C19.2243 28.1624 19.4662 27.5561 19.9034 27.1035L26.4002 20.4003H3.6002C2.96368 20.4003 2.35323 20.1474 1.90314 19.6973C1.45305 19.2472 1.2002 18.6368 1.2002 18.0003C1.2002 17.3637 1.45305 16.7533 1.90314 16.3032C2.35323 15.8531 2.96368 15.6003 3.6002 15.6003H26.4002L19.9034 8.89707C19.4535 8.447 19.2007 7.83666 19.2007 7.20027C19.2007 6.56387 19.4535 5.95353 19.9034 5.50347Z" fill="#766A5F"/>
                        </svg>
                    </div>
                </Link>
            </div>
        </div>

    </div>
  );
}
