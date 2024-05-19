import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SpinningPreview from "../components/SpinningPreview";

import { tops, bottoms } from "../data/apparel.ts";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function useItemClick() {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  return [selectedIndex, handleClick];
}

export default function Wardrobe() {
  const accessories = Array.from({ length: 5 }, (_, index) => `Accessory ${index + 1}`);

  const [selectedTopIndex, setSelectedTopIndex] = useItemClick();
  const [selectedBottomIndex, setSelectedBottomIndex] = useItemClick();
  const [selectedAccessoryIndex, setSelectedAccessoryIndex] = useItemClick();

  const query = useQuery();
  const topId = query.get('top') ? query.get('top') : "";
  const bottomId = query.get('bottom') ? query.get('bottom') : "";
  const accessoryId = query.get('accessory') ? query.get('accessory') : "";

  const navigate = useNavigate();

  function selectTop(newTopId) {
    if (topId === newTopId) {
      return;
    } else {
      navigate(`/items?top=${newTopId}&bottom=${bottomId}&accessory=${accessoryId}`);
      window.location.reload();
    }
  }

  return (
    <div className="font-poppins flex flex-row border border-[#8B827B] border-[4px] gap-10 text-white bg-[#5B4F45] w-[700px] h-[600px] rounded-xl object-center align-center justify-center">
      <div className="mt-[2vw]">
        <h2 className="text-[20px] font-bold mb-4 ">Tops</h2>
        <div className="overflow-y-scroll w-[200px] h-[80%] mt-[3vw]">
          {tops.map((topItem, index) => (
            <div
              key={index}
              onClick={() => { setSelectedTopIndex(index); console.log(topItem.lenId); selectTop(topItem.lenId); }}
              className={`item mb-2 w-[150px] rounded-lg h-[150px] bg-white text-black ${selectedTopIndex === index ? "bg-blue-500" : ""}`}
            >
              {topItem.glbFile ? <SpinningPreview glbFile={topItem.glbFile} /> : topItem.lenId}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[2vw]">
        <h2 className="text-xl font-bold mb-4">Bottoms</h2>
        <div className="overflow-y-scroll w-[200px] h-[80%] mt-[3vw]">
          {bottoms.map((item, index) => (
            <div key={index} onClick={() => setSelectedBottomIndex(index)} className={`item mb-2 w-[150px] rounded-lg h-[150px] bg-white text-white ${selectedBottomIndex === index ? "bg-blue-500" : ""}`}>
              {/* {item} */}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[2vw]">
        <h2 className="text-xl font-bold mb-4">Accessories</h2>
        <div className="overflow-y-scroll h-[80%] w-[200px] mt-[3vw]">
          {accessories.map((item, index) => (
            <div key={index} onClick={() => setSelectedAccessoryIndex(index)} className={`item mb-2 w-[150px] rounded-lg h-[150px] bg-white text-white ${selectedAccessoryIndex === index ? "bg-blue-500" : ""}`}>
              {/* {item} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}