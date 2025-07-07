import { useContext, useState } from "react";
import { UserContext } from "../../../Providers/Users/UserContext";

export function Login() {
    const { loginUser, userAuthenticated, logoutUser } = useContext(UserContext);

    const [isOn, setIsOn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userLogin, setUserLogin] = useState({
        email: '',
        user_password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Limpiar error cuando el usuario empiece a escribir
        if (error) setError('');

        setUserLogin(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const sendData = async (e) => {
        e.preventDefault();

        // Prevenir envíos múltiples
        if (loading) return;

        setLoading(true);
        setError('');

        try {
            const response = await loginUser(userLogin);
            setIsOn(false)
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
        setIsOn(false);
        setError('');
        setUserLogin({
            email: '',
            user_password: ''
        });
    };

    return (
        <>
            {userAuthenticated.user_type === 'invitado' ? (
                <button onClick={() => setIsOn(true)}>
                    Ingresar
                </button>
            ) : (
                <div>
                    <button onClick={logoutUser}>
                        Cerrar sesión
                    </button>
                    <h4>{userAuthenticated.user_name}</h4>
                </div>
            )}
            {isOn && (
                <div style={{
                    border: '2px solid black',
                    borderRadius: '20px',
                    padding: '0.5rem',
                    marginTop: '.5rem'
                }}>
                    <h3>Ingresa Email y contraseña</h3>
                    <form onSubmit={sendData}>
                        <input
                            type="email"
                            name="email"
                            value={userLogin.email}
                            placeholder="Ingresa tu email"
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        <input
                            type="password"
                            name="user_password"
                            value={userLogin.user_password}
                            placeholder="Tu contraseña"
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
                            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                        </button>

                        <button type="button" onClick={handleClose} disabled={loading}>
                            X
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}