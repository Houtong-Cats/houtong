import { useLocation } from 'react-router-dom'
import Wardrobe from '../assets/wardrobe';
export default function test() {

    const itemId = useLocation().pathname.split("/")[2];
    console.log(itemId);

    return (
        <div>
            <Wardrobe></Wardrobe>
        </div>
    );
}