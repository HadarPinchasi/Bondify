import './feed.css';
import MenuObject from '../Authentication/MenuObject';

function MenuFeed({ menuInfos }) {
    const optionsList = menuInfos.map((option, key) => {
        return <MenuObject {...option} key={key} />
    });
    return (
        <ul className="list-group vh-100">
            {optionsList}
            <hr className="list-group-divider" />
        </ul>
    );
}
export default MenuFeed;