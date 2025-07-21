import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { InputSearcher } from '../Posts/Searcher/InputSearcher/InputSearcher';
import { Login } from "../Users/Login/Login";
import { UserContext } from "../../Providers/Users/UserContext";
import { CreatePost } from "../Posts/CreatePost/CreatePost";
import { Register } from "../Users/Register/Register";
import { IoMenu, IoClose } from "react-icons/io5";
import './header.css';

export function Header() {
    const { userAuthenticated } = useContext(UserContext);
    const location = useLocation();
    const isActive = (pathFragment) => location.pathname === pathFragment;
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleCreateClick = (modal) => {
        setShowCreateModal(modal);
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    return (
        <div className="bg-coal-black flex flex-center align-center column height-content width-100 p-block-2 m-bottom-3">
            <nav className="flex align-center flex-center width-100">
                <ul className="buttons-nav flex align-center flex-between width-100 gap-2 wrap">
                    <li>
                        <img src="/bmxVidsLogo.svg" alt="Logo BMX VIDS" className="width-100p"/>
                    </li>
                    <div className="desktop-nav align-center flex-center gap-2">
                        <li className={`street-link ${isActive('/') ? 'active-street-link' : ''}`}>
                            <Link to="/">
                                <h6>Inicio</h6>
                            </Link>
                        </li>

                        <li className={`street-link ${isActive('/full%20videos') ? 'active-street-link' : ''}`}>
                            <Link to="/full videos">
                                <h6>Full Videos</h6>
                            </Link>
                        </li>

                        <li className={`street-link ${isActive('/web%20videos') ? 'active-street-link' : ''}`}>
                            <Link to="/web videos">
                                <h6>Web Videos</h6>
                            </Link>
                        </li>

                        <li className={`street-link ${isActive('/event%20videos') ? 'active-street-link' : ''}`}>
                            <Link to="/event videos">
                                <h6>Event Videos</h6>
                            </Link>
                        </li>
                    </div>

                    {/* Botón Hamburguesa - Solo visible en mobile */}
                    <button 
                        onClick={toggleMenu}
                        className="hamburger-button flex align-center justify-center size-5"
                        aria-label="Abrir menú"
                    >
                        {isMenuOpen ? <IoClose size={46} /> : <IoMenu size={46} />}
                    </button>

                    {/* Botones Usuario - Derecha */}
                    <div className="flex align-end flex-center gap-2 column">
                        {userAuthenticated.user_type === 'admin' && (
                            <li>
                                <button
                                    onClick={() => handleCreateClick('post')}
                                    className='street-blue-button'>
                                    Crear Post
                                </button>
                            </li>
                        )}
                        <div className="flex align-end flex-center gap-2 column">
                            {userAuthenticated.user_type === 'invitado' && (
                                <li>
                                    <button
                                        onClick={() => handleCreateClick('account')}
                                        className='street-blue-button'>
                                        Registrarse
                                    </button>
                                </li>
                            )}

                            <li>
                                <Login />
                            </li>
                        </div>
                    </div>
                </ul>

                {/* Menú Mobile - Solo visible cuando está abierto */}
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

                {/* Overlay para cerrar el menú */}
                {isMenuOpen && (
                    <div 
                        className="hamburger-overlay" 
                        onClick={closeMenu}
                        aria-hidden="true"
                    ></div>
                )}
            </nav>

            {/* Modales */}
            {showCreateModal === 'post' && (
                <CreatePost setShowCreateModal={setShowCreateModal} />
            )}
            
            {showCreateModal === 'account' && (
                <Register setShowCreateModal={setShowCreateModal} />
            )}

            {/* Buscador */}
            <div className="m-top-2 flex align-center flex-center width-100 height-100">
                <InputSearcher />
            </div>
        </div>
    );
}