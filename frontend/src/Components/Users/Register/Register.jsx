import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Providers/Users/UserContext";


export function Register({ setShowCreateModal }) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [registerAlert, setRegisterAlert] = useState(false);
    const [registerUser, setRegisterUser] = useState({
        user_name: '',
        name: '',
        last_name: '',
        user_password: '',
        email: ''
    });
    const [userLogin, setUserLogin] = useState({
        email: '',
        user_password: ''
    });

    const { userAuthenticated, createUser, loginUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (error) setError('');
        setRegisterUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const sendData = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        setError('');

        try {
            const response = await createUser(registerUser);
            setUserLogin({
                email: registerUser.email,
                user_password: registerUser.user_password
            });
            setRegisterAlert(true);
        } catch (err) {
            console.error('Error al crear el usuario:', err);
            setError(err.response?.data?.errors || 'Error al crear el usuario');
        } finally {
            setLoading(false);
        }
    };

    const login = async () => {
        try {
            await loginUser(userLogin);
            setUserLogin({ email: '', user_password: '' });
            setRegisterUser({
                user_name: '',
                name: '',
                last_name: '',
                user_password: '',
                email: ''
            });
        } catch (err) {
            console.error('Error en login:', err);
            setError(err.response?.data?.errors || 'Error al iniciar sesión');
        }
    };

    return (
        <section className="modal-overlay">
            <div className="edit-box">
                <h2>Crear cuenta</h2>
                {userAuthenticated.user_type !== 'invitado' ? (
                    <h2 className="size-5 bold">Ya iniciaste sesión</h2>
                ) : (
                    <form className="flex column gap-1" onSubmit={sendData}>
                        <label className="size-2 bold" htmlFor="user_name">Nombre de usuario</label>
                        <input
                            className="concrete-input"
                            type="text"
                            name="user_name"
                            value={registerUser.user_name}
                            placeholder="Nombre de usuario"
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />

                        <label className="size-2 bold" htmlFor="name">Nombre</label>
                        <input
                            className="concrete-input"
                            type="text"
                            name="name"
                            value={registerUser.name}
                            placeholder="Nombre"
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />

                        <label className="size-2 bold" htmlFor="last_name">Apellido</label>
                        <input
                            className="concrete-input"
                            type="text"
                            name="last_name"
                            value={registerUser.last_name}
                            placeholder="Apellido"
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />

                        <label className="size-2 bold" htmlFor="email">Email</label>
                        <input
                            className="concrete-input"
                            type="email"
                            name="email"
                            value={registerUser.email}
                            placeholder="Email"
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />

                        <label className="size-2 bold" htmlFor="user_password">Contraseña</label>
                        <input
                            className="concrete-input"
                            type="password"
                            name="user_password"
                            value={registerUser.user_password}
                            placeholder="Contraseña"
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />

                        {error && (
                            <div className="text-danger size-3">
                                {error}
                            </div>
                        )}
                        <div className="flex gap-1 m-top-2">
                            <button className="street-blue-button width-content" type="submit" disabled={loading}>
                                {loading ? 'Registrando...' : 'Registrarse'}
                            </button>
                            <button
                                type="button"
                                className="rust-button width-content"
                                title="Cancelar"
                                onClick={() => setShowCreateModal(false)}
                            >
                                Cancelar
                            </button>
                        </div>

                    </form>
                )}

                {registerAlert && (
                    <div className="modal-overlay">
                        <div className="register-alert">
                            <h3 className="size-4 bold text-warning-yellow">{registerUser.user_name}</h3>
                            <p className="size-3 text-warning-yellow">Tu cuenta ha sido creada</p>
                            <button
                                className="rust-button m-top-2 width-content"
                                onClick={() => {
                                    setRegisterAlert(false);
                                    login();
                                    navigate('/');
                                }}
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}
