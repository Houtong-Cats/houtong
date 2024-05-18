import Navbar from "../assets/navbar";
import Wardrobe from "../assets/wardrobe";
import Camera from "../components/Camera";

export default function Item() {
    return (
        <div className="flex flex-col bg-custom-gradient w-full min-h-screen">
            <Navbar />
            <div className="pl-[3vw] flex flex-row flex-grow">
                <div className="flex items-center justify-center w-1/2">
                    <Wardrobe />
                </div>
                <div className="flex items-center justify-center w-1/2 bg-black h-full">
                    <Camera />
                </div>
            </div>
        </div>
    );
}
