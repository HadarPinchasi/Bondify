// JavaScript source code
import { FcClock } from "react-icons/fc";
import { GrGroup } from "react-icons/gr";
import { PiMonitorPlayFill } from "react-icons/pi";
import { FcCalendar } from "react-icons/fc";


const leftMenuInfos =
    [
        {
            object: <FcClock />,
            descripton: 'Memories',
            color: null
        },
        {
            object: <i className="bi bi-bookmark-fill"></i>,
            descripton: 'Saved',
            color: '#6f42c1'
        },
        {
            object: <GrGroup />,
            descripton: 'Groups',
            color: '#0d6efd'
        },
        {
            object: <PiMonitorPlayFill />,
            descripton: 'Video',
            color: '#0050a1'
        },
        {
            object: <i className="bi bi-shop"></i>,
            descripton: 'Markeplace',
            color: '#0050a1'
        },
        {
            object: <i className="bi bi-window-fullscreen"></i>,
            descripton: 'Feed',
            color: '#4d9ee6'
        },
        {
            object: <FcCalendar />,
            descripton: 'Events',
            color: null
        },


    ]
export default leftMenuInfos