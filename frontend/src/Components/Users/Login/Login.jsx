import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Providers/Users/UserContext";
import { TbShieldLock } from "react-icons/tb";
import { LuLogIn, LuLogOut, LuUser, LuStar } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { BsGearWide } from "react-icons/bs";

import './Login.css'
import { Profile } from "../Profile/Profile";

export function Login() {
    const { loginUser, userAuthenticated, logOutUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [userLogin, setUserLogin] = useState({
        email: '',
        user_password: ''
    });
    const [showProfileModal, setShowProfileModal] = useState(false)


    const loginRef = useRef(null)

    const toggleComponent = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (loginRef.current && !loginRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (error) setError('');

        setUserLogin(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const sendData = async (e) => {
        e.preventDefault();

        if (loading) return;
        toggleComponent();
        setLoading(true);
        setError('');

        try {
            await loginUser(userLogin);
            console.log(userAuthenticated)
            setUserLogin({
                email: '',
                user_password: ''
            });
        } catch (err) {
            console.error('Error en login:', err);
            setError(err.response?.data?.errors || 'Error al iniciar sesión');

        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        toggleComponent();
        setError('');
        setUserLogin({
            email: '',
            user_password: ''
        });
    };

    /*     const handleLogout = async () => {
            await logOutUser();
            window.location.reload()
        }; */
    // En Login.js - Función handleLogout corregida
    const handleLogout = async () => {
        setLoading(true);
        try {
            const success = await logOutUser();

            if (success) {
                // Cerrar el dropdown
                setIsOpen(false);

                // Opcional: Navegar a home o recargar
                // navigate('/'); // O usar esto en lugar de reload
                window.location.reload();
            } else {
                console.warn("El logout no se completó correctamente");
                // Aún así recargar para limpiar el estado
                window.location.reload();
            }
        } catch (error) {
            console.error("Error durante el logout:", error);
            // En caso de error, forzar la limpieza del estado
            window.location.reload();
        } finally {
            setLoading(false);
        }
    };
    const handleShowProfile = () => {
        setShowProfileModal(true)
    };


    return (
        <div className="relative">
            {userAuthenticated.user_type === 'invitado' ? (
                <button className="rust-button" onClick={toggleComponent}>
                    Ingresar
                    <MdKeyboardDoubleArrowDown />
                </button>
            ) : (
                <div>
                    <button className="rust-button" onClick={toggleComponent}>
                        {userAuthenticated.user_name}
                        <MdKeyboardDoubleArrowDown />
                    </button>
                </div>
            )}
            {isOpen && (
                <div ref={loginRef} className="login-box flex column p-2 flex-center align-center gap-3 radius-2 width-content bg-dark-blue p-2 m-top-2 absolute">
                    {
                        userAuthenticated.user_type === 'invitado'
                            ? (
                                <>
                                    <TbShieldLock className="text-dirty-white size-max-3" />
                                    <form autoComplete="off" className="flex flex-center column gap-2" onSubmit={sendData} >
                                        <div className="flex flex-center align-center gap-2">
                                            <MdOutlineMail className="size-5 text-dirty-white" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={userLogin.email}
                                                placeholder="Ingresa tu email"
                                                onChange={handleChange}
                                                disabled={loading}
                                                autoComplete="chupadla"
                                                required
                                                className="concrete-input width-100 m-right-1"
                                                aria-label="Correo electrónico"
                                            />
                                        </div>
                                        <div className="flex flex-center align-center gap-2">
                                            <RiLockPasswordLine className="size-5 text-dirty-white" />
                                            <input
                                                type="password"
                                                name="user_password"
                                                value={userLogin.user_password}
                                                placeholder="Tu contraseña"
                                                onChange={handleChange}
                                                disabled={loading}
                                                required
                                                className="concrete-input width-100 m-right-1"
                                                aria-label="Contraseña"
                                            />
                                        </div>

                                        {error && (
                                            <div style={{ color: 'red', fontSize: '0.9rem' }}>
                                                {error}
                                            </div>
                                        )}
                                        <div className="flex flex-center gap-2 m-top-4">
                                            <button className="street-blue-button flex flex-center align-center gap-1" type="submit" disabled={loading}>
                                                {loading ? 'Iniciando sesión...' : <><LuLogIn />Iniciar sesion</>}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )
                            : (
                                <>
                                    <BsGearWide className="text-dirty-white size-max-3" />
                                    <form autoComplete="off" className="flex flex-center align-center column gap-2">
                                        <button className="concrete-gray-button flex flex-center align-center width-content" type="button" onClick={handleShowProfile} disabled={loading}>
                                            <LuUser />Perfil
                                        </button>
                                        <button className="concrete-gray-button flex flex-center align-center width-content" type="button" onClick={() => navigate('/favorites')} >
                                            <LuStar />Favoritos
                                        </button>
                                        <div className="flex flex-center gap-2 m-top-4">
                                            <button className="street-blue-button flex flex-center align-center gap-1" type="button" onClick={handleLogout} disabled={loading}>
                                                <LuLogOut />Cerrar sesion
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )
                    }
                </div>
            )}
            {showProfileModal && (
                <Profile setShowProfileModal={setShowProfileModal} user={userAuthenticated} />
            )}
        </div>
    );
}

