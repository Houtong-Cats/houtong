import React from "react";
import SpinningPreview from "../components/SpinningPreview";

import { tops } from "../data/apparel.ts";

function useItemClick() {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);
  };

  return [selectedIndex, handleClick];
}

export default function Wardrobe() {
  //   const tops = Array.from({ length: 5 }, (_, index) => `Top ${index + 1}`);
  const bottoms = Array.from({ length: 5 }, (_, index) => `Bottom ${index + 1}`);
  const accessories = Array.from({ length: 5 }, (_, index) => `Accessory ${index + 1}`);

  const [selectedTopIndex, setSelectedTopIndex] = useItemClick();
  const [selectedBottomIndex, setSelectedBottomIndex] = useItemClick();
  const [selectedAccessoryIndex, setSelectedAccessoryIndex] = useItemClick();

  return (
    <div className="font-poppins flex flex-row gap-10 bg-[#E4E4E4] w-[750px] h-[600px] rounded-xl object-center align-center justify-center font-poppins">
      <div>
        <h2 className="text-[20px] font-medium mb-4 ">Tops</h2>
        <div className="overflow-y-scroll w-[200px] h-[80%] mt-[3vw]">
          {tops.map((topItem, index) => (
            <div key={index} onClick={() => setSelectedTopIndex(index)} className={`item mb-2 w-[150px] rounded-lg h-[150px] bg-white text-black overflow-hidden ${selectedTopIndex === index ? "bg-blue-500" : ""}`}>
              {/* {item} */}
              <SpinningPreview glbFile={topItem.glbFile} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-medium mb-4">Bottoms</h2>
        <div className="overflow-y-scroll w-[200px] h-[80%] mt-[3vw]">
          {bottoms.map((item, index) => (
            <div key={index} onClick={() => setSelectedBottomIndex(index)} className={`item mb-2 w-[150px] rounded-lg h-[150px] bg-white text-white ${selectedBottomIndex === index ? "bg-blue-500" : ""}`}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-medium mb-4">Accessories</h2>
        <div className="overflow-y-scroll h-[80%] w-[200px] mt-[3vw]">
          {accessories.map((item, index) => (
            <div key={index} onClick={() => setSelectedAccessoryIndex(index)} className={`item mb-2 w-[150px] rounded-lg h-[150px] bg-white text-white ${selectedAccessoryIndex === index ? "bg-blue-500" : ""}`}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
