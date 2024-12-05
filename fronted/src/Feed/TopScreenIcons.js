// JavaScript source code
import { PiMonitorPlay } from "react-icons/pi";
import { GrGroup } from "react-icons/gr";
import { IoGameControllerOutline } from "react-icons/io5";
import { LuStore } from "react-icons/lu";
import { FaHome } from "react-icons/fa";

function TopScreenIcons() {

    return (
        <div className="row">
            <div className="col mt-3 d-flex justify-content-center rounded" id='wannaShadow'>
                <FaHome style={{ fontSize: '2rem', color: '#0050a1' }} />
            </div>
            <div className="col mt-3 d-flex justify-content-center rounded" id='wannaShadow'>
                <PiMonitorPlay className="" style={{ fontSize: '2rem', color: 'gray' }} />
            </div>
            <div className="col mt-3 d-flex justify-content-center rounded" id='wannaShadow' >

                <LuStore style={{ fontSize: '2rem', color: 'gray' }} />
            </div>
            <div className="col mt-3 d-flex justify-content-center rounded" id='wannaShadow'>
                <GrGroup style={{ fontSize: '2rem', color: 'gray' }} />
            </div>
            <div className="col mt-3 d-flex justify-content-center rounded" id='wannaShadow'>
                <IoGameControllerOutline style={{ fontSize: '2rem', color: 'gray' }} />
            </div>
        </div>
    );
}
export default TopScreenIcons;