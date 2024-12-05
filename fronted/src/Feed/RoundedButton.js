function RoundedButton({ onClick, children }) {
    return (
        <button
            onClick={onClick}
            className="rounded-circle border-0"
            style={{ width: '45px', height: '45px', fontSize: '8px', backgroundColor: 'lightgrey' }}
        >
            {children}
        </button>
    );
}

export default RoundedButton;