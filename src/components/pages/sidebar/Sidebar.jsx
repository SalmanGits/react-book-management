import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css"

const Sidebar = () => {
    const [isSubMenuOpen, setSubMenuOpen] = useState(false);

    const toggleSubMenu = () => {
        setSubMenuOpen(!isSubMenuOpen);
    };

    return (
        <div className="sidebar">
            <div className="sidebar_item">
                <Link to="/">Home</Link>
            </div>
            <div className="sidebar_item">
                <div onClick={toggleSubMenu} className="submenu_trigger">
                    Books
                </div>
                {isSubMenuOpen && (
                    <div className="submenu">
                        <Link to="/allbooks">All Books</Link>
                        <Link to="/userbooks">Our Books</Link>
                        <Link to="/search">Search Books</Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sidebar