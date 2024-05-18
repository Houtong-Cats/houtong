import React from 'react';

export default function Wardrobe() {
    const tops = Array.from({ length: 5 }, (_, index) => `Top ${index + 1}`);
    const bottoms = Array.from({ length: 5 }, (_, index) => `Bottom ${index + 1}`);
    const accessories = Array.from({ length: 5 }, (_, index) => `Accessory ${index + 1}`);

    return (
        <div className="flex flex-row gap-10 bg-[#DBD0C7] w-[750px] h-[600px] rounded-xl object-center align-center justify-center text-centerfont-poppins">
            <div>
                <h2 className="text-[20px] font-semibold mb-4 ">Tops</h2>
                <div class="border overflow-y-scroll border-black w-[200px] h-[80%] mt-[3vw] border-[#C5BBB2] border-r-1 border-l-0 border-b-0 border-t-0 p-4">
                    {tops.map((item, index) => (
                        <div key={index} className="mb-2 w-[150px] rounded-lg h-[150px] bg-black text-white">{item}</div>
                    ))}
                </div>
            </div>       
                <div>
                    <h2 className="text-xl font-semibold mb-4">Bottoms</h2>
                    <div class="border overflow-y-scroll border-black w-[200px] h-[80%] mt-[3vw] border-[#C5BBB2] border-r-1 border-l-0 border-b-0 border-t-0 p-4">

                    {bottoms.map((item, index) => (
                        <div key={index} className="mb-2 w-[150px] rounded-lg h-[150px] bg-black text-white">{item}</div>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">Accessories</h2>
                    <div class="border overflow-y-scroll border-black w-[200px] h-[80%] mt-[3vw] border-[#C5BBB2] border-r-1 border-l-0 border-b-0 border-t-0 p-4">

                    {accessories.map((item, index) => (
                        <div key={index} className="mb-2 w-[150px] rounded-lg h-[150px] bg-black text-white">{item}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

