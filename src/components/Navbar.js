import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

import '../styles/navbarstyle.css';

function Navbar() {
    const location = useLocation(); 

    const [linksData, setLinksData] = useState([
        { path: "/", label: "Classifier", className: "nav-link" },
        { path: "/training", label: "Training", className: "nav-link" },
        { path: "/info", label: "Info", className: "nav-link" }
    ]);

    
    useEffect(() => {
        setLinksData(prevLinks => 
            prevLinks.map(link => ({
                ...link,
                className: link.path === location.pathname ? "selected-link" : "nav-link"
            }))
        );
    }, [location.pathname]); 

    return (
        <nav className="navbar">
                {linksData.map((link, index) => (
                    <Link key={index} to={link.path} className={link.className} draggable="false">
                        {link.label}
                    </Link>
                ))}
        </nav>
    );
}




export default Navbar;