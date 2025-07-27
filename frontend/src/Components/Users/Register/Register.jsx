import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Providers/Users/UserContext";
import { ConfirmAlert } from "../../ConfirmAlert/ConfirmAlert";


export function Register({ setShowCreateModal }) {
    const [errors, setErrors] = useState([]);
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
        setRegisterUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleConfirmAccount = () => {
        setRegisterAlert(false);
        setShowCreateModal(false);
        login();
        navigate('/');
    };

    const sendData = async (e) => {
        e.preventDefault();
        try {
            const response = await createUser(registerUser);
            setUserLogin({
                email: registerUser.email,
                user_password: registerUser.user_password
            });
            setRegisterAlert(true);
        } catch (err) {
            setErrors(err.response.data.errors)
            console.error('Error al crear el usuario:', err);

        } finally {

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
        }
    };

    return (
        <section className="modal-overlay">
            <div className="edit-box">
                <h2 className="width-100 text-center">Crear cuenta</h2>
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
                        />
                        {errors.find(e => e.user_name) && (
                            <p className="bold text-alert-red">{errors.find(e => e.user_name).user_name}</p>
                        )}

                        <label className="size-2 bold" htmlFor="name">Nombre</label>
                        <input
                            className="concrete-input"
                            type="text"
                            name="name"
                            value={registerUser.name}
                            placeholder="Nombre"
                            onChange={handleChange}
                        />
                        {errors.find(e => e.name) && (
                            <p className="bold text-alert-red">{errors.find(e => e.name).name}</p>
                        )}

                        <label className="size-2 bold" htmlFor="last_name">Apellido</label>
                        <input
                            className="concrete-input"
                            type="text"
                            name="last_name"
                            value={registerUser.last_name}
                            placeholder="Apellido"
                            onChange={handleChange}
                        />
                        {errors.find(e => e.last_name) && (
                            <p className="bold text-alert-red">{errors.find(e => e.last_name).last_name}</p>
                        )}

                        <label className="size-2 bold" htmlFor="email">Email</label>
                        <input
                            className="concrete-input"
                            type="text"
                            name="email"
                            value={registerUser.email}
                            placeholder="Email"
                            onChange={handleChange}
                        />
                        {errors.find(e => e.email) && (
                            <p className="bold text-alert-red">{errors.find(e => e.email).email}</p>
                        )}

                        <label className="size-2 bold" htmlFor="user_password">Contraseña</label>
                        <input
                            className="concrete-input"
                            type="password"
                            name="user_password"
                            value={registerUser.user_password}
                            placeholder="Contraseña"
                            onChange={handleChange}
                        />
                        {errors.find(e => e.user_password) && (
                            <p className="bold text-alert-red">{errors.find(e => e.user_password).user_password}</p>
                        )}

                        <div className="flex gap-1 m-top-2">
                            <button className="street-blue-button width-content" type="submit">
                                Registrarse
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
            </div>
            {registerAlert && (
                <ConfirmAlert question={registerUser.user_name} infoMessage={'Tu cuenta ha sido creada con exito'} confirm={handleConfirmAccount} />
            )}
        </section>
    );
}
