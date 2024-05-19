import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SpinningPreview from "../components/SpinningPreview";

import { tops, bottoms, accessories } from "../data/apparel.js";

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

function icon({url}) {
  return (
    <div className="w-full h-full aspect-square object-cover overflow-hidden p-5">
      <img src={url} alt="icon" />
    </div>
  )
}

export default function Wardrobe() {
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

  function selectBottom(newBottomId) {
    if (bottomId === newBottomId) {
      return;
    } else {
      navigate(`/items?top=${topId}&bottom=${newBottomId}&accessory=${accessoryId}`);
      window.location.reload();
    }
  }

  function selectAccessory(newAccessoryId) {
    if (accessoryId === newAccessoryId) {
      return;
    } else {
      navigate(`/items?top=${topId}&bottom=${bottomId}&accessory=${newAccessoryId}`);
      window.location.reload();
    }
  }

  return (
    <div className="font-poppins flex flex-row gap-[3vw] text-white w-[700px] h-[600px] rounded-xl object-center align-center justify-center">
      <div className="mt-[2vw]">
        <h2 className="text-[20px] font-bold mb-4 ">Tops</h2>
        <div className="overflow-y-auto w-[200px] h-[80%] mt-[3vw]">
          {tops.map((topItem, index) => (
            <div
              key={index}
              onClick={() => { setSelectedTopIndex(index); console.log(topItem.lenId); selectTop(topItem.lenId); }}
              className={`item mb-2 w-[150px] rounded-lg h-[150px] bg-white text-black ${selectedTopIndex === index ? "bg-blue-500" : ""}`}
            >
              {topItem.glbFile ? <SpinningPreview glbFile={topItem.glbFile} /> : icon({url: topItem.icon})}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[2vw]">
        <h2 className="text-xl font-bold mb-4">Bottoms</h2>
        <div className="overflow-y-auto w-[200px] h-[80%] mt-[3vw]">
          {bottoms.map((bottomItem, index) => (
            <div key={index} onClick={() => {setSelectedBottomIndex(index); console.log(bottomItem.lenId); selectBottom(bottomItem.lenId); }} className={`item mb-2 w-[150px] rounded-lg h-[150px] bg-white text-black ${selectedBottomIndex === index ? "bg-blue-500" : ""}`}>
              {bottomItem.glbFile ? <SpinningPreview glbFile={bottomItem.glbFile} /> : icon({url: bottomItem.icon})}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[2vw]">
        <h2 className="text-xl font-bold mb-4">Accessories</h2>
        <div className="overflow-y-auto h-[80%] w-[200px] mt-[3vw]">
          {accessories.map((accessoryItem, index) => (
            <div key={index} onClick={() => {setSelectedAccessoryIndex(index); console.log(accessoryItem.lenId); selectAccessory(accessoryItem.lenId); }} className={`item mb-2 w-[150px] rounded-lg h-[150px] bg-white text-black ${selectedAccessoryIndex === index ? "bg-blue-500" : ""}`}>
              {accessoryItem.glbFile ? <SpinningPreview glbFile={accessoryItem.glbFile} /> : icon({url: accessoryItem.icon})}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}