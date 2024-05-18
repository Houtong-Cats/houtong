import { useLocation } from 'react-router-dom'

export default function Item() {

    const itemId = useLocation().pathname.split("/")[2];
    console.log(itemId);

    return (
        <div>
            <h1 className="text-4xl font-bold">{itemId}</h1>
            <p className="text-lg">Welcome to the item page.</p>
        </div>
    );
}