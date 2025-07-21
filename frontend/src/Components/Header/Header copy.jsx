import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { InputSearcher } from '../Posts/Searcher/InputSearcher/InputSearcher';
import { Login } from "../Users/Login/Login";
import { UserContext } from "../../Providers/Users/UserContext";
import { CreatePost } from "../Posts/CreatePost/CreatePost";
import { Register } from "../Users/Register/Register";
import { IoMenu } from "react-icons/io5";
import './header.css';

export function Header() {
    const { userAuthenticated } = useContext(UserContext);
    const location = useLocation();
    const isActive = (pathFragment) => location.pathname === pathFragment;
    const [showCreateModal, setShowCreateModal] = useState(false)

    const handleCreateClick = (modal) => {
            setShowCreateModal(modal)
    }

    return (
        <div className="bg-coal-black flex flex-center align-center column height-content width-100 p-block-2 m-bottom-3">
            <nav className="flex align-center flex-center width-100">
                <ul className="buttons-nav flex align-center flex-between width-100 gap-2 wrap">
                    <li>
                        <img src="/bmxVidsLogo.svg" alt="Logo BMX VIDS" className="text-warning-yellow" style={{ width: "100px" }} />
                    </li>
                    <div className="flex align-center flex-center gap-2">
                        <IoMenu />
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
                    <div className="flex align-end flex-center gap-2 column">
                        {userAuthenticated.user_type === 'admin' && (
                            <li>
                                <button
                                    onClick={() => handleCreateClick('post')}
                                    className='street-blue-button'>
                                    Crear Post
                                </button>
                                {showCreateModal === 'post' && (
                                    <CreatePost setShowCreateModal={setShowCreateModal} />
                                )}
                            </li>
                        )}
                        <div className="flex align-end flex-center gap-2 column">
                            {userAuthenticated.user_type === 'invitado' && (
                                <li>
                                    <button
                                        onClick={() => handleCreateClick('account')}
                                        className='street-blue-button'>
                                        Crear Cuenta
                                    </button>
                                    {showCreateModal === 'account' && (
                                        <Register setShowCreateModal={setShowCreateModal} />
                                    )}
                                </li>
                            )}

                            <li>
                                <Login />
                            </li>
                        </div>
                    </div>
                </ul>
            </nav>

            <div className="m-top-2 flex align-center flex-center width-100 height-100">
                <InputSearcher />
            </div>
        </div>
    );
}