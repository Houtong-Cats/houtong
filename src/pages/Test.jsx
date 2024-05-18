import { useLocation } from 'react-router-dom'
import Wardrobe from '../assets/wardrobe';
import Navbar from '../assets/navbar';
import Camera from '../assets/camera';
export default function test() {

    const itemId = useLocation().pathname.split("/")[2];
    console.log(itemId);

    return (
        <div>
            <Navbar></Navbar>
            <Wardrobe></Wardrobe>
            <Camera></Camera>
        </div>
    );
}