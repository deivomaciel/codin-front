import { BsQrCode } from "react-icons/bs";
import './styles.css'

export default function Loading() {
    return (
        <div className="skeleton p-10">
            <BsQrCode size={230}/>
        </div>
    )
}