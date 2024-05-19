import { FiShare } from "react-icons/fi";
import { useLocation, useParams } from 'react-router-dom';

import Navbar from "../assets/navbar";
import Wardrobe from "../assets/wardrobe";
import MultiCamera from "../components/MultiCamera";
import SingleCamera from "../components/SingleCamera";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};
  

export default function Item() {

    const query = useQuery();
    const topId = query.get('top');
    const bottomId = query.get('bottom');
    const accessoryId = query.get('accessory');

    console.log(topId, bottomId, accessoryId);

    // check only one of topId, bottomId, accessoryId is not null
    const single = (topId && !bottomId && !accessoryId) || (!topId && bottomId && !accessoryId) || (!topId && !bottomId && accessoryId);

    return (
        <div className="flex flex-col w-full h-screen">
            <Navbar />      
            <div className="flex flex-col md:flex-row h-screen">
                <div className="w-1/2 h-full bg-white">
                    <Wardrobe />
                </div>
                <div className="flex flex-col w-1/2 h-full bg-black justify-center items-center overflow-hidden">
                    <div className="w-1/2 h-5/6 rounded-3xl object-cover overflow-hidden">
                        {single ? <SingleCamera /> : <MultiCamera />}
                    </div>
                    <div className="py-2" />
                    <div className="flex px-5 py-2 bg-[#766a60] text-white rounded-full items-center hover:cursor-pointer">
                        Share
                        <FiShare className="ml-2 text-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}
