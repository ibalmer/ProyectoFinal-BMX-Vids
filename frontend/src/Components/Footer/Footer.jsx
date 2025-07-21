import { BsGearFill } from "react-icons/bs";

export function Footer() {
    return (
        <div className="width-100 height-150p flex flex-around align-center text-warning-yellow bg-coal-black">
            <BsGearFill size={40}/>
            <div className="flex flex-center align-center column text-warning-yellow bg-coal-black">
                <img src="/bmxVidsLogo.svg" alt="Logo BMX VIDS" className="width-100p" />
                <h5>Copyright © 2025 ibalmer</h5>
            </div>
            <BsGearFill size={40}/>
        </div>
    )
}