import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../../Providers/Users/UserContext";

export function Register() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [registerAlert, setRegisterAlert] = useState(false)
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
            setRegisterAlert(true)
        } catch (err) {
            console.error('Error al crear el usuario:', err);
            setError(err.response?.data?.errors || 'Error al crear el usuario');
        } finally {
            setLoading(false);
        }
    }

    const login = async () => {
        try {
            const response = await loginUser(userLogin);
            setUserLogin({
                email: '',
                user_password: ''
            });
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
        <div className="bg-earth">
            {userAuthenticated.user_type !== 'invitado' ? (
                <h2>Ya iniciaste sesión</h2>
            ) : (
                <div>
                    <form onSubmit={sendData}>
                        <input
                            type="text"
                            name="user_name"
                            value={registerUser.user_name}
                            placeholder="Nombre de usuario"
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        <input
                            type="text"
                            name="name"
                            value={registerUser.name}
                            placeholder="Nombre"
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        <input
                            type="text"
                            name="last_name"
                            value={registerUser.last_name}
                            placeholder="Apellido"
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={registerUser.email}
                            placeholder="Email"
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        <input
                            type="password"
                            name="user_password"
                            value={registerUser.user_password}
                            placeholder="Contraseña"
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />

                        {error && (
                            <div style={{ color: 'red', fontSize: '0.9rem' }}>
                                {error}
                            </div>
                        )}

                        <button type="submit" disabled={loading}>
                            {loading ? 'Registrando...' : 'Registrarse'}
                        </button>
                    </form>
                </div>
            )}
            {registerAlert ? (
                <div style={{
                    border: '2px solid black',
                    borderRadius: '20px',
                    padding: '0.5rem',
                    marginTop: '.5rem'
                }}>
                    <h3>{registerUser.user_name}</h3>
                    <h4>Tu cuenta ha sido creada</h4>
                    <button onClick={() => {
                        setRegisterAlert(false);
                        login();
                        navigate('/')
                    }}>
                        Aceptar
                    </button>
                </div>
            ) : (null)}
        </div>
    );
}