export default function Navbar({ items, clearItems }) {
    return (
        <nav className="navbar bg-dark px-1 py-3 border-bottom">
            <div className="container-fluid d-flex px-5 text-center justify-content-between align-items-center">
                <h1 className="m-0">ToDo List</h1>
                {items.length > 0 && (
                    <button
                        className="btn btn-outline-success rounded-1 text-white"
                        onClick={() => clearItems()}>
                        Clear Items
                    </button>
                )}
            </div>
        </nav>
    );
}
