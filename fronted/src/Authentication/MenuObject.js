// JavaScript source code
import '../Feed/feed.css';

function MenuObject({ object, descripton, color }) {

    return (

        <li className="list-group-item w-100 m-2 rounded" id='wannaShad'>
            <span className="object m-2" style={{ color: color }}
            >{object}</span> {descripton}</li>

    );
}
export default MenuObject;