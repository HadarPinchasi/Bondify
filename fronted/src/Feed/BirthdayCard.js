// JavaScript source code
import './feed.css';

function BirthdayCard() {
    return (
        <div className="card-body w-100 m-2 rounded" id='wannaShadow' style={{ width: '11rem' }}>
            <h6 className="card-subtitle mb-2 text-body-secondary"> Birthdays</h6>
            <p className="card-text"><i className="bi bi-gift-fill m-2" style={{ color: '#dc3545' }}></i> Congrats! You have birthday today.</p>
            <hr className="card-divider" />
        </div>

    );
}
export default BirthdayCard;