import { FiShare } from "react-icons/fi";
import { useLocation } from 'react-router-dom';

import Navbar from "../assets/navbar";
import Wardrobe from "../assets/wardrobe";
import MultiCamera from "../components/MultiCamera";
import SingleCamera from "../components/SingleCamera";
import CustomButton from "../components/CustomButton"
import CustomCamera from "../components/CustomCamera";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};
  
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
}

export default function Item() {

    const query = useQuery();
    const topId = query.get('top');
    const bottomId = query.get('bottom');
    const accessoryId = query.get('accessory');

    // console.log(topId, bottomId, accessoryId);

    // check only one of topId, bottomId, accessoryId is not null
    const single = (topId && !bottomId && !accessoryId) || (!topId && bottomId && !accessoryId) || (!topId && !bottomId && accessoryId);
    const custom = !topId && !bottomId && !accessoryId;

    // redirects to /items with no params
    function redirectToCustom() {
        window.location.href = "/items";
    }

    return (
        <div className="flex flex-col w-full h-screen bg-[#322C27]">
            <Navbar />      
            <div className="grid grid-cols-2 h-screen px-7">
                <div className="w-full h-full flex items-center justify-center">
                    <Wardrobe  />
                </div>

                <div className="flex flex-col w-full h-full justify-center items-center overflow-hidden">
                    <div className="w-full md:w-full h-5/6 rounded-3xl object-cover overflow-hidden">
                        {custom ? <CustomCamera  /> : single ? <SingleCamera /> : <MultiCamera />}
                    </div>
                    <div className="py-2" />


                    <div className="flex items-center">
                    
                    <CustomButton onSuccess={redirectToCustom} />

                    <div
                        className="flex px-5 py-2 bg-[#766a60] text-white rounded-full items-center hover:cursor-pointer"
                        onClick={() => {copyToClipboard(window.location.href); alert("Link copied to clipboard!")}}    
                    >
                        Share
                        <FiShare className="ml-2 text-lg" />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
