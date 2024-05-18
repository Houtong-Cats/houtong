import Navbar from "../assets/navbar";
import Wardrobe from "../assets/wardrobe";
import Camera from "../components/Camera";

export default function Item() {
    return (
        <div className="flex flex-col w-full h-screen">
            <Navbar /> 
            <div className="flex flex-row h-screen">
                <div className="w-1/2 h-fill bg-white">
                    <Wardrobe />
                </div>
                <div className="flex w-1/2 h-fill bg-black justify-center items-center">
                    <div className="w-1/2 h-5/6 rounded-3xl bg-orange-300 object-cover">
                        <Camera />
                    </div>
                </div>
            </div>
        </div>
    );
}