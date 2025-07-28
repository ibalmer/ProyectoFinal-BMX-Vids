import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { InputSearcher } from '../Posts/Searcher/InputSearcher/InputSearcher';
import { Login } from "../Users/Login/Login";
import { CreatePost } from "../Posts/CreatePost/CreatePost";
import { Register } from "../Users/Register/Register";
import { IoMenu, IoClose, IoSearchSharp } from "react-icons/io5";
import './header.css';

export function Header() {

    const [showCreateModal, setShowCreateModal] = useState(false);
    const location = useLocation();
    const isActive = (pathFragment) => location.pathname === pathFragment;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSearcher, setShowSearcher] = useState(false)

    useEffect(() => {
        setShowSearcher(false)
    }, [location])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    const toogleShowSearcher = () => {
        setShowSearcher(prev => !prev)
    }

    return (
        <div id="header" className="bg-coal-black flex flex-center align-center column height-content width-100 p-block-2 m-bottom-3">
            <nav className="flex align-center flex-center width-100">
                <ul className="buttons-nav flex align-center flex-between width-100">
                    <div className="flex-1">
                        <img src="/bmxVidsLogo.svg" alt="Logo BMX VIDS" className="width-100p m-right-4" />
                    </div>
                    <div className="desktop-nav align-center flex-center gap-2">
                        <Link className={`street-link ${isActive('/') ? 'active-street-link' : ''}`} to="/">
                            <h6>Inicio</h6>
                        </Link>
                        <Link className={`street-link ${isActive('/full%20videos') ? 'active-street-link' : ''}`} to="/full videos">
                            <h6>Full Videos</h6>
                        </Link>
                        <Link className={`street-link ${isActive('/web%20videos') ? 'active-street-link' : ''}`} to="/web videos">
                            <h6>Web Videos</h6>
                        </Link>
                        <Link className={`street-link ${isActive('/event%20videos') ? 'active-street-link' : ''}`} to="/event videos">
                            <h6>Event Videos</h6>
                        </Link>

                    </div>
                    <div className="flex  flex-center gap-2">
                        <button
                            onClick={toggleMenu}
                            className="hamburger-button flex align-center justify-center size-5"
                            aria-label="Abrir menú"
                        >
                            {isMenuOpen ? <IoClose size={46} /> : <IoMenu size={46} />}
                        </button>
                    </div>
                    <div className="flex flex-1 gap-2 align-end column">
                        <Login setShowCreateModal={setShowCreateModal}/>
                        <button
                            className="street-blue-button height-content"
                            type="button"
                            onClick={toogleShowSearcher}
                            title='Buscar'>
                            <IoSearchSharp size={18} className="flex flex-center align-center" />
                        </button>
                    </div>
                </ul>
                <div className={`hamburger-menu ${isMenuOpen ? 'hamburger-menu-open' : ''}`}>
                    <ul className="hamburger-menu-list">
                        <li className={`hamburger-menu-item ${isActive('/') ? 'active' : ''}`}>
                            <Link to="/" onClick={closeMenu}>
                                <h6>Inicio</h6>
                            </Link>
                        </li>
                        <li className={`hamburger-menu-item ${isActive('/full%20videos') ? 'active' : ''}`}>
                            <Link to="/full videos" onClick={closeMenu}>
                                <h6>Full Videos</h6>
                            </Link>
                        </li>
                        <li className={`hamburger-menu-item ${isActive('/web%20videos') ? 'active' : ''}`}>
                            <Link to="/web videos" onClick={closeMenu}>
                                <h6>Web Videos</h6>
                            </Link>
                        </li>
                        <li className={`hamburger-menu-item ${isActive('/event%20videos') ? 'active' : ''}`}>
                            <Link to="/event videos" onClick={closeMenu}>
                                <h6>Event Videos</h6>
                            </Link>
                        </li>
                    </ul>

                </div>
                {isMenuOpen && (
                    <div
                        className="hamburger-overlay"
                        onClick={closeMenu}
                        aria-hidden="true"
                    ></div>
                )}
            </nav>
            <div className={`m-top-2 align-center flex-center width-100 height-100 ${showSearcher ? 'show-searcher' : 'searcher-hidden'}`}>
                <InputSearcher />
            </div>
            {showCreateModal === 'post' && (
                <CreatePost setShowCreateModal={setShowCreateModal} />
            )}

            {showCreateModal === 'account' && (
                <Register setShowCreateModal={setShowCreateModal} />
            )}
        </div>
    );
}